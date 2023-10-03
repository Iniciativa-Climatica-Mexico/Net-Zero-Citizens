package com.greencircle.framework.views.fragments.company

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.databinding.FragmentTokenRegistroBinding
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.CreateCompanyViewModel
import com.greencircle.framework.views.activities.MainActivity
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import java.util.UUID

class TokenRegistroFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    private var arguments = Bundle()
    private lateinit var authToken: String
    private lateinit var uuid: UUID
    private lateinit var binding: FragmentTokenRegistroBinding

    /**
     * Inicializa el "CreateCompanyFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), CreateCompanyViewModel::class.java)
        )[CreateCompanyViewModel::class.java]
        arguments = requireArguments()
        Log.d("TokenRegistroFragment", "onCreate: $arguments")
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de crear empresa.
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
        binding = FragmentTokenRegistroBinding.inflate(inflater, container, false)
        setTexts(arguments)

        binding.btnContinueNoToken.setOnClickListener {
            navigateToForm(arguments)
        }
        val authToken = arguments.getString("idToken")
        if (authToken != null) {
            viewModel.googleLogin(authToken)
        }

        if (arguments.getString("uuid") != null) {
            uuid = arguments.getString("uuid")?.let { UUID.fromString(it) }!!
        }

        binding.btnRegisterToken.setOnClickListener {
            val token = binding.registerTokenTextField.editText?.text.toString()
            try {
                val companyId = UUID.fromString(token)
                viewModel.assignCompany(uuid, companyId)
            } catch (e: java.lang.Exception) {
                binding.registerTokenTextField.error = "Token inválido"
            }
        }

        viewModel.assignCompanyResult.observe(viewLifecycleOwner) { result ->
            if (result != null) {
                Log.d("TokenRegistroFragment", result)
                navigateToHome()
            } else {
                Log.d("TokenRegistroFragment", "Assign company failed")
                binding.registerTokenTextField.error = "Token inválido"
            }
        }

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
            if (result != null && result.tokens != null) {
                authToken = result.tokens.authToken
                uuid = result.user.uuid
            } else {
                Log.d("CreateCompanyFragment", "Google login failed")
            }
        }
    }

    /**
     * Establece los textos en la vista con datos proporcionados en los argumentos.
     *
     * Esta función se encarga de obtener referencias a las vistas TextView dentro de la vista proporcionada y
     * establecer los textos con los valores obtenidos de los argumentos.
     *
     * @param arguments Un Bundle  que contiene la información de la cuenta de Google.
     * @param view La vista del "CreateCompanyFragment"
     */
    private fun setTexts(arguments: Bundle) {
        // Replace texts
        binding.tvUserName.text = arguments.getString("displayName")
        binding.tvUserEmail.text = arguments.getString("email")
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