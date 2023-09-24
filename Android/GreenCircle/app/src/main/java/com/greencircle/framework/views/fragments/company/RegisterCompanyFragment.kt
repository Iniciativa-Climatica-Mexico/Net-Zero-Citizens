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
import com.greencircle.databinding.FragmentRegisterCompanyBinding
import com.greencircle.framework.viewmodel.CreateCompanyViewModel
import com.greencircle.framework.views.activities.MainActivity
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.utils.AuthUtils

/**Constructor de "RegisterCompanyFragment"
 *
 * @constructor Incializa y crea la vista del "RegisterCompanyFragment". Navega a "CreateCompanyFragment".
 */
class RegisterCompanyFragment : Fragment() {
    private var _binding: FragmentRegisterCompanyBinding? = null
    private lateinit var viewModel: CreateCompanyViewModel
    private lateinit var _arguments: Bundle
    private val authUtils = AuthUtils()
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
                        viewModel.googleLogin(token)
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
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]
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
    ): View? {
        // Inflar el diseño de este fragmento
        _binding = FragmentRegisterCompanyBinding.inflate(inflater, container, false)
        // Google Login
        authUtils.googleLoginListener(binding, requireActivity(), googleSignInActivityResult)

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
        viewModel.googleLoginResult.observe(viewLifecycleOwner) { result ->
            // Handle the result here
            if (result != null) {
                if (result.user.roles != "new_user") {
                    navigateToHome()
                } else {
                    navigateToForm(_arguments)
                }
            } else {
                Log.d("CreateCompanyFragment", "Google login failed")
            }
        }
    }

    /**
     * Navega hacia el fragmento "CreateCompanyFragment" dentro de la "RegisterCompanyActivity".
     *
     * Esta función se encarga de hacer la transición al fragmento "CreateCompanyFragment" desde el fragmento
     * actual dentro de la "RegisterCompanyActivity". Opcionalmente, puede recibir un Bundle de argumentos
     * que se pueden pasar al fragmento de destino.
     *
     * @param arguments Un Bundle opcional de argumentos que contiene la información de la cuenta de Google.
     */
    private fun navigateToForm(arguments: Bundle? = null) {
        val createCompanyFragment = CreateCompanyFragment()
        val activity = requireActivity() as RegisterCompanyActivity
        activity.replaceFragment(createCompanyFragment, arguments)
    }

    private fun navigateToHome() {
        var intent: Intent = Intent(requireContext(), MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
    }
}