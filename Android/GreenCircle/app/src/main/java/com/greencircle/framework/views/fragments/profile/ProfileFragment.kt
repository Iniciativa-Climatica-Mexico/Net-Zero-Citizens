package com.greencircle.framework.views.fragments.profile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.DeleteTokensRequirement
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.profile.ProfileViewModel
import com.greencircle.framework.views.activities.LoginActivity
import com.greencircle.framework.views.fragments.reviews.UserReviewFragment
import com.greencircle.utils.GoogleSignInClientProvider

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ProfileViewModel
    private lateinit var recoverUserSession: RecoverUserSessionRequirement
    private lateinit var deleteTokens: DeleteTokensRequirement
    private lateinit var deleteUserSession: DeleteUserSessionRequirement
    private lateinit var profile: Profile
    private var reviewsCount: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), ProfileViewModel::class.java)
        )[ProfileViewModel::class.java]
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root

        // Inicializar variables
        recoverUserSession = RecoverUserSessionRequirement(requireContext())
        deleteTokens = DeleteTokensRequirement(requireContext())
        deleteUserSession = DeleteUserSessionRequirement(requireContext())

        // Obtener la sesión del usuario
        val userSession = recoverUserSession()

        // Inicializar ViewModel
        viewModel.setUserId(userSession.uuid)
        viewModel.getUserProfile()

        // Inicializar Observers
        initializeObservers()
        initializeEditarPerfilButton()
        logoutOnClickListener()
        displayUserReviewFragment()

        binding.resenasCountTextView.text = "$reviewsCount"
        return root
    }

    private fun displayUserReviewFragment() {
        val userReviewFragment = UserReviewFragment()

        val fragmentManager: FragmentManager = requireActivity().supportFragmentManager
        fragmentManager.setFragmentResultListener(
            "reviewsCountKey",
            viewLifecycleOwner
        ) { _, bundle ->
            reviewsCount = bundle.getInt("bundleReviewsCount")
            binding.resenasCountTextView.text = "$reviewsCount"
        }
        val transaction: FragmentTransaction = fragmentManager.beginTransaction()
        transaction.add(R.id.userReviewFragment, userReviewFragment, "User Review")
        transaction.commit()
    }

    private fun initializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner) {
            profile = it
            setUserData()
        }
    }

    private fun initializeEditarPerfilButton() {
        binding.editarPerfilButton.setOnClickListener {
            val transaction = requireActivity().supportFragmentManager.beginTransaction()
            transaction.replace(R.id.frame_layout, EditProfileFragment())
            transaction.addToBackStack("editProfileFragment")
            transaction.commit()
        }
    }

    private fun navigateToLogin() {
        // Navigate to LoginActivity
        val intent: Intent = Intent(requireContext(), LoginActivity::class.java)
        startActivity(intent)
        requireActivity().finish()
    }

    private fun setUserData() {
        if (profile != null) {
            val name = profile.firstName + " " + profile.lastName
            binding.username.text = name
            // binding.profileImage.setImageResource(user.profilePicture)
        }
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

        GoogleSignInClientProvider.getClient(requireActivity()).signOut()
        navigateToLogin()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}