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
import com.greencircle.databinding.FragmentRegisterCompanyBinding
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.utils.AuthUtils

class RegisterCompanyFragment : Fragment() {
    private var _binding: FragmentRegisterCompanyBinding? = null
    private val authUtils = AuthUtils()
    private val binding get() = _binding!!

    // Activity Result Contracts
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

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRegisterCompanyBinding.inflate(inflater, container, false)

        // Google Login
        authUtils.googleLoginListener(binding, requireActivity(), googleSignInActivityResult)

        // Inflate the layout for this fragment
        return binding.root
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
}