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
import com.greencircle.framework.viewmodel.CreateCompanyViewModel

/**Constructor de "CreateCompanyFragment"
 *
 * @constructor Incializa y crea la vista del "CreateCompanyFragment"
 */
class CreateCompanyFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    private var arguments = Bundle()

    /**
     * Inicializa el "CreateCompanyFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]
        arguments = requireArguments()
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        viewModel.googleLogin(token)
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
        val view = inflater.inflate(
            R.layout.fragment_create_company, container, false
        )
        // Set texts
        setTexts(arguments, view)

        // Listeners
        onSubmitListener(view)

        return view
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
                Log.d("CreateCompanyFragment", "Google login success")
                Log.d("CreateCompanyFragment", result.toString())
            } else {
                Log.d("CreateCompanyFragment", "Google login failed")
            }
        }
    }

    /**
     * Configura un listener para el botón de envío.
     *
     * @param view La vista raíz del fragmento "CreateCompanyFragment".
     */
    private fun onSubmitListener(view: View) {
        val submitButton = view.findViewById<Button>(R.id.submit_create_company)
        submitButton.setOnClickListener {
            onSubmitHandler(view)
        }
    }

    /**
     * Maneja la lógica del envió de los datos introducidos en el formulario al backend.
     *
     * @param view La vista raíz del fragmento "CreateCompanyFragment".
     */
    private fun onSubmitHandler(view: View) {
        // Reference to all the fields
        val nameInputLayout: TextInputLayout = view.findViewById(R.id.companyNameTextField)
        val descriptionInputLayout: TextInputLayout =
            view.findViewById(R.id.companyDescriptionTextField)
        val emailInputLayout: TextInputLayout = view.findViewById(R.id.companyEmailTextField)
        val phoneInputLayout: TextInputLayout = view.findViewById(R.id.companyPhoneTextField)
        val websiteInputLayout: TextInputLayout = view.findViewById(R.id.companyWebsiteTextField)
        val streetInputLayout: TextInputLayout = view.findViewById(R.id.companyStreetTextField)
        val streetNumberInputLayout: TextInputLayout =
            view.findViewById(R.id.companyStreetNumberTextField)
        val cityInputLayout: TextInputLayout = view.findViewById(R.id.companyCityTextField)
        val stateInputLayout: TextInputLayout = view.findViewById(R.id.companyStateTextField)
        val zipCodeInputLayout: TextInputLayout = view.findViewById(R.id.companyZipCodeTextField)

        // Get the values
        val name = nameInputLayout.editText?.text.toString()
        val description = descriptionInputLayout.editText?.text.toString()
        val email = emailInputLayout.editText?.text.toString()
        val phone = phoneInputLayout.editText?.text.toString()
        val website = websiteInputLayout.editText?.text.toString()
        val street = streetInputLayout.editText?.text.toString()
        val streetNumber = streetNumberInputLayout.editText?.text.toString()
        val city = cityInputLayout.editText?.text.toString()
        val state = stateInputLayout.editText?.text.toString()
        val zipCode = zipCodeInputLayout.editText?.text.toString()

        // Send the data to the backend
        Log.d("CreateCompanyFragment", "Send data to backend")
        Log.d("CreateCompanyFragment", "Name: $name")
        Log.d("CreateCompanyFragment", "Description: $description")
        Log.d("CreateCompanyFragment", "Email: $email")
        Log.d("CreateCompanyFragment", "Phone: $phone")
        Log.d("CreateCompanyFragment", "Website: $website")
        Log.d("CreateCompanyFragment", "Street: $street")
        Log.d("CreateCompanyFragment", "Street Number: $streetNumber")
        Log.d("CreateCompanyFragment", "City: $city")
        Log.d("CreateCompanyFragment", "State: $state")
        Log.d("CreateCompanyFragment", "Zip Code: $zipCode")
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
    private fun setTexts(arguments: Bundle, view: View) {
        // Replace texts
        val userName = view.findViewById<TextView>(R.id.tvUserName)
        val userEmail = view.findViewById<TextView>(R.id.tvUserEmail)

        userName.text = arguments.getString("displayName")
        userEmail.text = arguments.getString("email")
    }
}
