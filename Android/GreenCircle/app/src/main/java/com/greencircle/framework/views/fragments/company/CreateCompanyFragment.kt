package com.greencircle.framework.views.fragments.company

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.materialswitch.MaterialSwitch
import com.google.android.material.textfield.TextInputLayout
import com.greencircle.R
import com.greencircle.data.remote.company.CompanyAPIService
import com.greencircle.domain.model.company.Company
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.CreateCompanyViewModel
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.framework.views.fragments.TermsAndConditionsCompany.TermsAndConditionsCompany
import com.greencircle.framework.views.fragments.services.ServicesFragment
import java.util.UUID

/**Constructor de "CreateCompanyFragment"
 *
 * @constructor Incializa y crea la vista del "CreateCompanyFragment"
 */
class CreateCompanyFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    private var arguments = Bundle()
    private lateinit var authToken: String
    private lateinit var uuid: UUID
    private lateinit var nameInputLayout: TextInputLayout
    private lateinit var descriptionInputLayout: TextInputLayout
    private lateinit var emailInputLayout: TextInputLayout
    private lateinit var phoneInputLayout: TextInputLayout
    private lateinit var websiteInputLayout: TextInputLayout
    private lateinit var streetInputLayout: TextInputLayout
    private lateinit var streetNumberInputLayout: TextInputLayout
    private lateinit var cityInputLayout: TextInputLayout
    private lateinit var stateInputLayout: TextInputLayout
    private lateinit var zipCodeInputLayout: TextInputLayout

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
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        Log.d("token", token)
        if (token != null) {
            viewModel.googleLogin(token)
        }
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

        nameInputLayout = view.findViewById(R.id.companyNameTextField)
        descriptionInputLayout = view.findViewById(R.id.companyDescriptionTextField)
        emailInputLayout = view.findViewById(R.id.companyEmailTextField)
        phoneInputLayout = view.findViewById(R.id.companyPhoneTextField)
        websiteInputLayout = view.findViewById(R.id.companyWebsiteTextField)
        streetInputLayout = view.findViewById(R.id.companyStreetTextField)
        streetNumberInputLayout = view.findViewById(R.id.companyStreetNumberTextField)
        cityInputLayout = view.findViewById(R.id.companyCityTextField)
        stateInputLayout = view.findViewById(R.id.companyStateTextField)
        zipCodeInputLayout = view.findViewById(R.id.companyZipCodeTextField)

        val name = CreateCompanyViewModel.name
        val description = CreateCompanyViewModel.description
        val email = CreateCompanyViewModel.email
        val phone = CreateCompanyViewModel.phone
        val website = CreateCompanyViewModel.website
        val street = CreateCompanyViewModel.street
        val streetNumber = CreateCompanyViewModel.streetNumber
        val city = CreateCompanyViewModel.city
        val state = CreateCompanyViewModel.state
        val zipCode = CreateCompanyViewModel.zipCode

        nameInputLayout.editText?.setText(name)
        descriptionInputLayout.editText?.setText(description)
        emailInputLayout.editText?.setText(email)
        phoneInputLayout.editText?.setText(phone)
        websiteInputLayout.editText?.setText(website)
        streetInputLayout.editText?.setText(street)
        streetNumberInputLayout.editText?.setText(streetNumber)
        cityInputLayout.editText?.setText(city)
        stateInputLayout.editText?.setText(state)
        zipCodeInputLayout.editText?.setText(zipCode)

        val button = view.findViewById<Button>(R.id.login_register)
        button.setOnClickListener {

            CreateCompanyViewModel.name = nameInputLayout.editText?.text.toString()
            CreateCompanyViewModel.description = descriptionInputLayout.editText?.text.toString()
            CreateCompanyViewModel.email = emailInputLayout.editText?.text.toString()
            CreateCompanyViewModel.phone = phoneInputLayout.editText?.text.toString()
            CreateCompanyViewModel.website = websiteInputLayout.editText?.text.toString()
            CreateCompanyViewModel.street = streetInputLayout.editText?.text.toString()
            CreateCompanyViewModel.streetNumber = streetNumberInputLayout.editText?.text.toString()
            CreateCompanyViewModel.city = cityInputLayout.editText?.text.toString()
            CreateCompanyViewModel.state = stateInputLayout.editText?.text.toString()
            CreateCompanyViewModel.zipCode = zipCodeInputLayout.editText?.text.toString()

            val termsAndConditionsCompanyFragment = TermsAndConditionsCompany()
            val activity = requireActivity() as RegisterCompanyActivity

            activity.replaceFragment(termsAndConditionsCompanyFragment)
        }

        if (arguments.getString("uuid") != null) {
            uuid = arguments.getString("uuid")?.let { UUID.fromString(it) }!!
        }

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
            if (result != null && result.tokens != null) {
                authToken = result.tokens.authToken
                uuid = result.user.uuid
            } else {
                Log.d("CreateCompanyFragment", "Google login failed")
            }
        }
        viewModel.error.observe(viewLifecycleOwner) { error ->
            try {
                if (error) {
                    Toast.makeText(
                        requireContext(), "Error al crear nueva empresa", Toast.LENGTH_SHORT
                    ).show()
                } else {
                    Toast.makeText(
                        requireContext(), "Empresa creada correctamente", Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    requireContext(), "Error al crear nueva empresa", Toast.LENGTH_SHORT
                ).show()
            }
        }
        setSwitch(view.findViewById(R.id.avisoPrivacidad))
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
        val companyData: Company = Company(
            uuid,
            name,
            description,
            email,
            phone,
            website,
            street,
            streetNumber,
            city,
            state,
            zipCode,
            "test1",
            "test2",
            "test3",
            "test4"
        )

        val createCompanyRequest = CompanyAPIService.CreateCompanyRequest(companyData)

        val validation: Boolean = validateForm(view)
        if (validation) {
            viewModel.createCompany(createCompanyRequest)
            nextFragment()
        }
    }

    /**
     * Valida los campos de un formulario.
     *
     * @param view La vista que contiene los campos del formulario.
     * @return `true` si todos los campos son válidos, `false` en caso contrario.
     */
    private fun validateForm(view: View): Boolean {
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
        val switchError: TextView = view.findViewById(R.id.switchError)

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
        val terms = view.findViewById<MaterialSwitch>(R.id.avisoPrivacidad).isChecked

        var isValid = true

        // Validar el nombre
        if (name.isEmpty()) {
            nameInputLayout.error = "El nombre es requerido"
            isValid = false
        } else {
            if (name.length > 50) {
                nameInputLayout.error = "El nombre no puede ser mayor a 50 caracteres"
                isValid = false
            } else {
                nameInputLayout.error = null
            }
            nameInputLayout.error = null
        }

        // Validar la descripción
        if (description.isEmpty()) {
            descriptionInputLayout.error = "La descripción es requerida"
            isValid = false
        } else {
            if (description.length > 500) {
                descriptionInputLayout.error = "La descripción no puede ser mayor a 200 caracteres"
                isValid = false
            } else {
                descriptionInputLayout.error = null
            }
        }
        // Validar el email
        if (!isValidEmail(email)) {
            emailInputLayout.error = "Email inválido"
            isValid = false
        } else {
            emailInputLayout.error = null
        }

        // Validar el teléfono
        if (!isValidPhoneNumber(phone)) {
            phoneInputLayout.error = "Teléfono inválido"
            isValid = false
        } else {
            if (phone.length != 10) {
                phoneInputLayout.error = "El teléfono debe tener 10 dígitos"
                isValid = false
            } else {
                phoneInputLayout.error = null
            }
        }

        // Validar la calle
        if (street.isEmpty()) {
            streetInputLayout.error = "La calle es requerida"
            isValid = false
        } else {
            streetInputLayout.error = null
        }

        // Validar el número de calle
        if (streetNumber.isEmpty()) {
            streetNumberInputLayout.error = "El número de calle es requerido"
            isValid = false
        } else {
            streetNumberInputLayout.error = null
        }

        // Validar la ciudad
        if (city.isEmpty()) {
            cityInputLayout.error = "La ciudad es requerida"
            isValid = false
        } else {
            cityInputLayout.error = null
        }

        // Validar el estado
        if (state.isEmpty()) {
            stateInputLayout.error = "El estado es requerido"
            isValid = false
        } else {
            stateInputLayout.error = null
        }

        // Validar el código postal
        if (zipCode.isEmpty()) {
            zipCodeInputLayout.error = "El código postal es requerido"
            isValid = false
        } else {
            zipCodeInputLayout.error = null
        }

        // Validar terminos y condiciones
        if (!terms) {
            isValid = false
            switchError.visibility = View.VISIBLE
        }

        return isValid
    }

    /**
     * Verifica si un correo electrónico es válido.
     */
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    /**
     * Verifica si un número de teléfono es válido.
     */
    private fun isValidPhoneNumber(phone: String): Boolean {
        return android.util.Patterns.PHONE.matcher(phone).matches()
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

    /**
     * Navega hacia el fragmento "UnverifiedCompanyFragment" dentro de la "RegisterCompanyActivity".
     *
     * Esta función se encarga de hacer la transición al fragmento "UnverifiedCompanyFragment" desde el fragmento
     * actual dentro de la "RegisterCompanyActivity". Opcionalmente, puede recibir un Bundle de argumentos
     * que se pueden pasar al fragmento de destino.
     *
     * @param arguments Un Bundle opcional de argumentos que contiene la información de la cuenta de Google.
     */
    private fun nextFragment(arguments: Bundle? = null) {
        val companyServices = ServicesFragment()
        val activity = requireActivity() as RegisterCompanyActivity
        activity.replaceFragment(companyServices, arguments)
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