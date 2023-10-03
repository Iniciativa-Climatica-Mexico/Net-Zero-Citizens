package com.greencircle.framework.views.fragments.favourites

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.FragmentFavouriteProfileBinding
import com.greencircle.domain.model.company.CompanySummary
import com.greencircle.domain.usecase.auth.DeleteTokensRequirement
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.framework.ui.adapters.catalogue.CatalogueAdapter
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.favourites.FavouritesViewModel
import com.greencircle.framework.views.activities.LoginActivity

class FavouriteFragment : Fragment() {
    private var _binding: FragmentFavouriteProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: FavouritesViewModel
    private lateinit var recoverUserSession: RecoverUserSessionRequirement
    private lateinit var deleteTokens: DeleteTokensRequirement
    private lateinit var deleteUserSession: DeleteUserSessionRequirement
    private var favouritesCount: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), FavouritesViewModel::class.java)
        )[FavouritesViewModel::class.java]
        _binding = FragmentFavouriteProfileBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val recyclerView: RecyclerView = binding.newRecyclerView
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        // Observe changes in favouritesLiveData
        viewModel.favouritesLiveData.observe(viewLifecycleOwner) { companies ->
            if (companies != null) {
                // Initialize and set the adapter for RecyclerView
                val adapter = CatalogueAdapter()
                adapter.initCustomAdapter(companies as ArrayList<CompanySummary>, requireContext())
                recyclerView.adapter = adapter
            }
        }

        // Inicializar variables
        recoverUserSession = RecoverUserSessionRequirement(requireContext())
        deleteTokens = DeleteTokensRequirement(requireContext())
        deleteUserSession = DeleteUserSessionRequirement(requireContext())

        // Obtener la sesión del usuario
        val userSession = recoverUserSession()

        // Inicializar ViewModel
        viewModel.setUserId(userSession.uuid)
        viewModel.getFavouritesByUser()

        // Inicializar Observers
        initializeObservers()
        logoutOnClickListener()

        binding.favouritesCountTextView.text = "$favouritesCount"
        return root
    }

    private fun initializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner) { user ->
            val userName = "${user.firstName} ${user.lastName}"
            binding.username.text = userName
        }
    }

    private fun navigateToLogin() {
        // Navigate to LoginActivity
        val intent: Intent = Intent(requireContext(), LoginActivity::class.java)
        startActivity(intent)
        requireActivity().finish()
    }

    private fun logoutOnClickListener() {
        val logoutButton = binding.root.findViewById<View>(R.id.logout)
        logoutButton.setOnClickListener {
            logout()
        }
    }

    private fun logout() {
        deleteTokens()
        deleteUserSession()
        navigateToLogin()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
