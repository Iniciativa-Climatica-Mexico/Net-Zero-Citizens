package com.greencircle.framework.views.fragments.user

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.materialswitch.MaterialSwitch
import com.google.android.material.textfield.TextInputLayout
import com.greencircle.R
import com.greencircle.data.remote.user.UserAPIService
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.auth.LoginViewModel
import com.greencircle.framework.viewmodel.user.CreateUserViewModel
import com.greencircle.framework.views.activities.RegisterUserActivity
import com.greencircle.framework.views.activities.SurveyActivity
import com.greencircle.framework.views.fragments.TermsAndConditions.TermsAndConditions
import java.util.UUID

/**Constructor de "CreateUserFragment"
 *
 * @constructor Incializa y crea la vista del "CreateUserFragment"
 */
class CreateUserFragment : Fragment() {
    private lateinit var createUserViewModel: CreateUserViewModel
    private lateinit var loginViewModel: LoginViewModel
    private var arguments = Bundle()
    private lateinit var authToken: String
    private lateinit var uuid: UUID

    /**
     * Inicializa el "CreateUserFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Get ViewModel
        loginViewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), LoginViewModel::class.java)
        )[LoginViewModel::class.java]
        createUserViewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), CreateUserViewModel::class.java)
        )[CreateUserViewModel::class.java]
        // Get arguments
        arguments = requireArguments()
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        loginViewModel.googleLogin(token)
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de crear usuario.
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
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(
            R.layout.fragment_create_user, container, false
        )

        val button = view.findViewById<Button>(R.id.login_register)
        button.setOnClickListener {
            val termsAndConditionsFragment = TermsAndConditions()
            val activity = requireActivity() as RegisterUserActivity

            activity.replaceFragment(termsAndConditionsFragment)
        }

        setTexts(arguments, view)
        onSubmitListener(view)

        return view
    }

    /**
     * Método llamado cuando la vista del fragmento ha sido creada después de onCreateView.
     * Observa y maneja el Live Data proveniente del inicio de sesión de Google.
     *
     * @param view La vista raíz del fragmento "CreateUserFragment".
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        loginViewModel.googleLoginResult.observe(viewLifecycleOwner) { result ->
            // Handle the result here
            if (result != null) {
                authToken = result.tokens.authToken
                uuid = result.user.uuid
            } else {
                Log.d("CreateUserFragment", "Google login failed")
            }
        }

        setSwitch(view.findViewById(R.id.avisoPrivacidad))
    }

    /**
     * Configura un listener para el botón de envío.
     *
     * @param view La vista raíz del fragmento "CreateUserFragment".
     */
    private fun onSubmitListener(view: View) {
        val submitButton = view.findViewById<Button>(R.id.submit_create_user)
        submitButton.setOnClickListener {
            onSubmitHandler(view)
        }
    }

    /**
     * Maneja la lógica del envió de los datos introducidos en el formulario al backend.
     *
     * @param view La vista raíz del fragmento "CreateUserFragment".
     */
    private fun onSubmitHandler(view: View) {
        val phoneInputLayout: TextInputLayout = view.findViewById(R.id.userPhoneTextField)
        val ageInputLayout: TextInputLayout = view.findViewById(R.id.userAgeTextFIeld)
        val stateInputLayout: TextInputLayout = view.findViewById(R.id.userStateTextField)
        val genderInputLayout: TextInputLayout = view.findViewById(R.id.userGenderTextField)

        val phone = phoneInputLayout.editText?.text.toString()
        val age = ageInputLayout.editText?.text.toString()
        val state = stateInputLayout.editText?.text.toString()
        val gender = genderInputLayout.editText?.text.toString()
        val roleId = "CUSTOMER_ROLE_ID"

        val validation = validateForm(view)

        if (validation) {
            val userInfo: UserAPIService.UpdateUserRequest = UserAPIService.UpdateUserRequest(
                phone,
                age,
                state,
                gender,
                roleId,
            )

            createUserViewModel.updateUser(uuid, userInfo, authToken)
            navigateToHome()
        } else {
            hideKeyboard()
        }
    }

    /**
     * Valida los campos de un formulario.
     *
     * @param view La vista que contiene los campos del formulario.
     * @return `true` si todos los campos son válidos, `false` en caso contrario.
     */
    private fun validateForm(view: View): Boolean {
        val phoneInputLayout: TextInputLayout = view.findViewById(R.id.userPhoneTextField)
        val ageInputLayout: TextInputLayout = view.findViewById(R.id.userAgeTextFIeld)
        val stateInputLayout: TextInputLayout = view.findViewById(R.id.userStateTextField)
        val genderInputLayout: TextInputLayout = view.findViewById(R.id.userGenderTextField)
        val switchError: TextView = view.findViewById(R.id.switchError)

        val phone = phoneInputLayout.editText?.text.toString()
        val age = ageInputLayout.editText?.text.toString()
        val state = stateInputLayout.editText?.text.toString()
        val gender = genderInputLayout.editText?.text.toString()
        val terms = view.findViewById<MaterialSwitch>(R.id.avisoPrivacidad).isChecked

        var isValid = true

        // Validar el teléfono
        if (!isValidPhoneNumber(phone)) {
            phoneInputLayout.error = "Teléfono inválido"
            isValid = false
        } else {
            phoneInputLayout.error = null
        }

        // Validar la edad
        val ageValue = age.toIntOrNull()
        if (ageValue == null || ageValue < 18 || ageValue > 90) {
            if (ageValue == null || ageValue < 0 || ageValue > 90) {
                ageInputLayout.error = "Ingresa una edad válida"
            } else if (ageValue >= 0 && ageValue <= 17) {
                ageInputLayout.error = "Debes ser mayor de edad"
            }
            isValid = false
        } else {
            ageInputLayout.error = null
        }

        // Validar los dropdown
        if (state.isEmpty()) {
            stateInputLayout.error = "Este campo no puede estar vacío"
            isValid = false
        } else {
            stateInputLayout.error = null
        }

        if (gender.isEmpty()) {
            genderInputLayout.error = "Este campo no puede estar vacío"
            isValid = false
        } else {
            genderInputLayout.error = null
        }

        if (!terms) {
            isValid = false
            switchError.visibility = View.VISIBLE
        }

        return isValid
    }

    /**
     * Oculta el teclado del teléfono.
     */
    private fun hideKeyboard() {
        val imm = requireContext()
            .getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        val view = requireView()
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    /**
     * Verifica si un número de teléfono es válido.
     *
     * @param phone El número de teléfono a verificar.
     * @return `true` si el número de teléfono es válido, `false` en caso contrario.
     */
    private fun isValidPhoneNumber(phone: String): Boolean {
        return phone.length == 10 && phone.all { it.isDigit() }
    }

    /**
     * Establece los textos en la vista con datos proporcionados en los argumentos.
     *
     * Esta función se encarga de obtener referencias a las vistas TextView dentro de la vista
     * proporcionada y establecer los textos con los valores obtenidos de los argumentos.
     *
     * @param arguments Un Bundle  que contiene la información de la cuenta de Google.
     * @param view La vista del "CreateUserFragment"
     */
    private fun setTexts(arguments: Bundle, view: View) {
        val userName = view.findViewById<TextView>(R.id.tvUserName)
        val userEmail = view.findViewById<TextView>(R.id.tvUserEmail)

        userName.text = arguments.getString("displayName")
        userEmail.text = arguments.getString("email")
    }

    /**
     * Navega a la pantalla de inicio de la aplicación.
     *
     * Esta función se encarga de crear un intent para abrir la actividad principal de la aplicación
     * (`MainActivity`) y luego inicia la actividad para mostrar la pantalla de inicio.
     */
    private fun navigateToHome() {
        var intent: Intent = Intent(requireContext(), SurveyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
    }

    private fun setSwitch(mSwitch: MaterialSwitch) {
        mSwitch.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                mSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.white
                )
                mSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.green
                )

                mSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.green
                )
            } else {
                // Colors when the switch is OFF
                mSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.white
                )
                mSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.gray_500
                )

                mSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(),
                    R.color.white
                )
            }
        }
    }
}
