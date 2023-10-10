package com.greencircle.framework.views.fragments.company

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.common.api.ApiException
import com.google.android.material.textfield.TextInputLayout
import com.greencircle.databinding.FragmentRegisterCompanyBinding
import com.greencircle.domain.model.user.NewUser
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.auth.RegisterViewModel
import com.greencircle.framework.viewmodel.company.CreateCompanyViewModel
import com.greencircle.framework.views.activities.MainActivity
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.utils.AuthUtils
import com.greencircle.utils.GoogleSignInHelper

/**
 * Constructor de "RegisterCompanyFragment
 * @constructor Incializa y crea la vista del "RegisterCompanyFragment". Navega a "CreateCompanyFragment".
 */
class RegisterCompanyFragment : Fragment() {
    private var _binding: FragmentRegisterCompanyBinding? = null
    private lateinit var createCompanyViewModel: CreateCompanyViewModel
    private lateinit var registerViewModel: RegisterViewModel
    private lateinit var _arguments: Bundle
    private lateinit var authUtils: AuthUtils
    private lateinit var googleSignInHelper: GoogleSignInHelper
    private val binding get() = _binding!!

    /**
     * Una propiedad para manejar el resultado de una operación de inicio de sesión de Google
     * utilizando la API ActivityResult.
     *
     * Esta propiedad se inicializa con una lambda que procesa el resultado de la operación de inicio de sesión.
     * Si la operación es exitosa, navega a un formulario y le pasa los argumentos de la autentificación.
     * Si falla, muestra un mensaje emergente (toast).
     */
    private val googleSignInActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val data: Intent? = result.data
                if (data != null && result.resultCode == Activity.RESULT_OK) {
                    val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                    try {
                        val account = task.getResult(ApiException::class.java)
                        _arguments = authUtils.getDataFromGoogleAccount(account)
                        // Google Login
                        val token: String = _arguments.getString("idToken").toString()
                        if (token != null) {
                            createCompanyViewModel.googleLogin(token)
                        }
                    } catch (e: ApiException) {
                        Toast.makeText(
                            requireContext(), "Something went wrong", Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the operation
            }
        }

    /**
     * Inicializa el "CreateCompanyFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        createCompanyViewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), CreateCompanyViewModel::class.java)
        )[CreateCompanyViewModel::class.java]
        registerViewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), RegisterViewModel::class.java)
        )[RegisterViewModel::class.java]

        authUtils = AuthUtils(requireActivity())
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de registro de empresa.
     *
     * @param inflater El inflador de diseño que se utiliza para inflar la vista.
     * @param container El contenedor en el que se debe colocar la vista del fragmento.
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     * @return La vista inflada para el fragmento.
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflar el diseño de este fragmento
        _binding = FragmentRegisterCompanyBinding.inflate(inflater, container, false)

        // Google Login
        googleSignInHelper = GoogleSignInHelper(requireActivity(), googleSignInActivityResult)

        registerOnClickListener()

        return binding.root
    }

    /**
     * Método llamado cuando la vista del fragmento ha sido creada después de onCreateView.
     * Observa y maneja el Live Data proveniente del inicio de sesión de Google.
     *
     * @param view La vista raíz del fragmento "CreateCompanyFragment".
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        googleSignInHelper.setupGoogleLoginListener(binding.root)

        createCompanyViewModel.googleLoginResult.observe(viewLifecycleOwner) { result ->
            val data: Intent = Intent(requireContext(), RegisterCompanyActivity::class.java)
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)

            // Handle the result here
            if (result != null) {
                if (result.user.roles != "new_user") {
                    navigateToMain()
                } else {
                    navigateToTokenRegistro(_arguments)
                }
            } else {
                Log.d("CreateCompanyFragment", "Google login failed")
            }
        }
        registerViewModel.registerCredentialsResult.observe(viewLifecycleOwner) { result ->
            // Handle the result here
            if (result != null) {
                if (result.user.roles != "new_user") {
                    navigateToMain()
                } else {
                    _arguments = authUtils.getDataFromRegisterResponse(result.user)
                    navigateToTokenRegistro(_arguments)
                }
            } else {
                Log.d("CreateCompanyFragment", "Ocurrió un error al registrar el usuario")
            }
        }

        registerViewModel.registerError.observe(viewLifecycleOwner) { error ->
            if (error) {
                Toast.makeText(
                    requireContext(), "Ocurrió un error al registrar el usuario", Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    private fun registerOnClickListener() {
        binding.registerCredentials.setOnClickListener {
            onRegisterCredentials()
        }
    }

    private fun onRegisterCredentials() {
        val firstNameTextInputLayout: TextInputLayout = binding.userFirstName
        val lastNameTextInputLayout: TextInputLayout = binding.userLastName
        val secondLastNameTextInputLayout: TextInputLayout = binding.userSecondLastName
        val emailTextInputLayout: TextInputLayout = binding.userEmail
        val passwordTextInputLayout: TextInputLayout = binding.userPassword
        val confirmPasswordTextInputLayout: TextInputLayout = binding.userConfirmPassword

        val firstName: String = firstNameTextInputLayout.editText?.text.toString()
        val lastName: String = lastNameTextInputLayout.editText?.text.toString()
        val secondLastName: String = secondLastNameTextInputLayout.editText?.text.toString()
        val email: String = emailTextInputLayout.editText?.text.toString()
        val password: String = passwordTextInputLayout.editText?.text.toString()
        val confirmPassword: String = confirmPasswordTextInputLayout.editText?.text.toString()

        // Verify if the fields are empty
        if (firstName.isEmpty()) {
            firstNameTextInputLayout.error = "Campo requerido"
            firstNameTextInputLayout.requestFocus()
            return
        } else {
            if (firstName.length < 3) {
                firstNameTextInputLayout.error = "El nombre debe tener al menos 3 caracteres"
                firstNameTextInputLayout.requestFocus()
                return
            } else {
                firstNameTextInputLayout.error = null
            }
        }

        if (lastName.isEmpty()) {
            lastNameTextInputLayout.error = "Campo requerido"
            lastNameTextInputLayout.requestFocus()
            return
        } else {
            if (lastName.length < 3) {
                lastNameTextInputLayout.error = "El apellido debe tener al menos 3 caracteres"
                lastNameTextInputLayout.requestFocus()
                return
            } else {
                lastNameTextInputLayout.error = null
            }
        }

        if (secondLastName.isEmpty()) {
            secondLastNameTextInputLayout.error = "Campo requerido"
            secondLastNameTextInputLayout.requestFocus()
            return
        } else {
            if (secondLastName.length < 3) {
                secondLastNameTextInputLayout.error = "El apellido debe tener al menos 3 caracteres"
                secondLastNameTextInputLayout.requestFocus()
                return
            } else {
                secondLastNameTextInputLayout.error = null
            }
        }

        if (email.isEmpty()) {
            emailTextInputLayout.error = "Campo requerido"
            emailTextInputLayout.requestFocus()
            return
        } else {
            if (!isValidEmail(email)) {
                emailTextInputLayout.error = "Correo electrónico inválido"
                emailTextInputLayout.requestFocus()
                return
            } else {
                emailTextInputLayout.error = null
            }
        }

        if (password.isEmpty()) {
            passwordTextInputLayout.error = "Campo requerido"
            passwordTextInputLayout.requestFocus()
            return
        } else {
            if (password.length < 8) {
                passwordTextInputLayout.error = "La contraseña debe tener al menos 8 caracteres"
                passwordTextInputLayout.requestFocus()
                return
            } else {
                passwordTextInputLayout.error = null
            }
        }

        if (confirmPassword.isEmpty()) {
            confirmPasswordTextInputLayout.error = "Campo requerido"
            confirmPasswordTextInputLayout.requestFocus()
            return
        } else {
            confirmPasswordTextInputLayout.error = null
        }

        // Verify if the passwords match
        if (password != confirmPassword) {
            confirmPasswordTextInputLayout.error = "Las contraseñas no coinciden"
            confirmPasswordTextInputLayout.requestFocus()
            return
        } else {
            confirmPasswordTextInputLayout.error = null
        }
        val user = NewUser(
            email = email,
            password = password,
            firstName = firstName,
            lastName = lastName,
            secondLastName = secondLastName,
            roleId = "NEW_USER_ROLE_ID",
            phoneNumber = "",
            age = 0,
            gender = "no_answer",
            state = "",
            profilePicture = ""
        )
        registerViewModel.registerCredentials(user)
    }

    /**
     * Verifica si un correo electrónico es válido.
     */
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    private fun navigateToMain() {
        var intent: Intent = Intent(requireContext(), MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
    }

    private fun navigateToTokenRegistro(arguments: Bundle? = null) {
        val tokenRegistroFragment = TokenRegistroFragment()
        val activity = requireActivity() as RegisterCompanyActivity
        activity.replaceFragment(tokenRegistroFragment, arguments)
    }
}