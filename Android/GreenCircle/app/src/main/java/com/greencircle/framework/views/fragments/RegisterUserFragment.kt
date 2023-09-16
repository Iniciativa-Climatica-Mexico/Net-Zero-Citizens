package com.greencircle.framework.views.fragments

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.Fragment
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.common.api.ApiException
import com.greencircle.databinding.FragmentRegisterUserBinding
import com.greencircle.framework.views.activities.RegisterUserActivity
import com.greencircle.utils.AuthUtils

/**Constructor de "RegisterUserFragment"
 *
 * @constructor Incializa y crea la vista del "RegisterUserFragment". Navega a "CreateUserFragment".
 */
class RegisterUserFragment : Fragment() {
    private var _binding: FragmentRegisterUserBinding? = null
    private val binding get() = _binding!!
    private val authUtils = AuthUtils()

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
                        val arguments = authUtils.getDataFromGoogleAccount(account)
                        navigateToForm(arguments)
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
     * Método que se llama cuando se crea la vista del fragmento de registro de usuario.
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
        _binding = FragmentRegisterUserBinding.inflate(inflater, container, false)

        authUtils.googleLoginListener(binding, requireActivity(), googleSignInActivityResult)

        return binding.root
    }

    /**
     * Navega hacia el fragmento "CreateUserFragment" dentro de la "RegisterUserActivity".
     *
     * Esta función se encarga de hacer la transición al fragmento "CreateUserFragment" desde el fragmento
     * actual dentro de la "RegisterUserActivity". Opcionalmente, puede recibir un Bundle de argumentos
     * que se pueden pasar al fragmento de destino.
     *
     * @param arguments Un Bundle opcional de argumentos que contiene la información de la cuenta de Google.
     */
    private fun navigateToForm(arguments: Bundle? = null) {
        val createUserFragment = CreateUserFragment()
        val activity = requireActivity() as RegisterUserActivity
        activity.replaceFragment(createUserFragment, arguments)
    }
}
