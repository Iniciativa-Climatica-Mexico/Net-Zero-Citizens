package com.greencircle.framework.views.fragments.company

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentUnverifiedCompanyBinding
import com.greencircle.domain.usecase.auth.DeleteTokensRequirement
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.framework.views.activities.LoginActivity
import com.greencircle.utils.GoogleSignInClientProvider

class UnverifiedCompanyFragment : Fragment() {
    private lateinit var deleteTokens: DeleteTokensRequirement
    private lateinit var deleteUserSession: DeleteUserSessionRequirement
    private lateinit var binding: FragmentUnverifiedCompanyBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        onBackPress()
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
        deleteTokens = DeleteTokensRequirement(requireContext())
        deleteUserSession = DeleteUserSessionRequirement(requireContext())
        binding = FragmentUnverifiedCompanyBinding.inflate(
            inflater,
            container,
            false
        )
        binding.btnCloseSession.setOnClickListener {
            logout()
        }
        return binding.root
    }

    /**
     * Método que controla el "back button" para evitar regresar al fragment anterior.
     */
    fun onBackPress() {
        // Override the back button behavior
        val onBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                // Do nothing to prevent going back
            }
        }
        requireActivity().onBackPressedDispatcher.addCallback(
            this, onBackPressedCallback
        )
    }

    private fun logout() {
        deleteTokens()
        deleteUserSession()

        GoogleSignInClientProvider.getClient(requireActivity()).signOut()
        navigateToLogin()
    }

    private fun navigateToLogin() {
        // Navigate to LoginActivity
        val intent = Intent(requireContext(), LoginActivity::class.java)
        startActivity(intent)
        requireActivity().finish()
    }
}