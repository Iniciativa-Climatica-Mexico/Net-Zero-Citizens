package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.textfield.TextInputLayout
import com.greencircle.R
import com.greencircle.framework.viewmodel.CreateUserViewModel

/**Constructor de "CreateUserFragment"
 *
 * @constructor Incializa y crea la vista del "CreateUserFragment"
 */
class CreateUserFragment : Fragment() {
    private lateinit var viewModel: CreateUserViewModel
    private var arguments = Bundle()

    /**
     * Inicializa el "CreateUserFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[CreateUserViewModel::class.java]
        arguments = requireArguments()
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        viewModel.googleLogin(token)
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

        setTexts(arguments, view)

        onSubmitListener(view)
        onSubmitHandler(view)

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
        viewModel.googleLoginResult.observe(viewLifecycleOwner) { result ->
            // Handle the result here
            if (result != null) {
                Log.d("CreateUserFragment", "Google login success")
                Log.d("CreateUserFragment", result.toString())
            } else {
                Log.d("CreateUserFragment", "Google login failed")
            }
        }
    }

    /**
     * Configura un listener para el botón de envío.
     *
     * @param view La vista raíz del fragmento "CreateUserFragment".
     */
    private fun onSubmitListener(view: View) {
        val submitButton = view.findViewById<Button>(R.id.submit_create_user)
        submitButton.setOnClickListener {
            Log.d("CreateUserFragment", "Send data to backend")
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

        Log.d("CreateUserFragment", "Send data to backend")
        Log.d("CreateUserFragment", "Phone: $phone")
        Log.d("CreateUserFragment", "Age: $age")
        Log.d("CreateUserFragment", "State: $state")
        Log.d("CreateUserFragment", "Gender: $gender")
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
}
