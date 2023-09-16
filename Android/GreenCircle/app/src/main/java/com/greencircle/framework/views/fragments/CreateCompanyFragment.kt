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

class CreateCompanyFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    private var arguments = Bundle()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]
        arguments = requireArguments()
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        viewModel.googleLogin(token)
    }

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

    private fun onSubmitListener(view: View) {
        val submitButton = view.findViewById<Button>(R.id.submit_create_company)
        submitButton.setOnClickListener {
            onSubmitHandler(view)
        }
    }

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

    private fun setTexts(arguments: Bundle, view: View) {
        // Replace texts
        val userName = view.findViewById<TextView>(R.id.tvUserName)
        val userEmail = view.findViewById<TextView>(R.id.tvUserEmail)

        userName.text = arguments.getString("displayName")
        userEmail.text = arguments.getString("email")
    }
}
