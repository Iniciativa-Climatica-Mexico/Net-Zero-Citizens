package com.greencircle.framework.views.fragments.profile

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import androidx.fragment.app.setFragmentResultListener
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.profile.Profile
import com.greencircle.framework.viewmodel.profile.ProfileViewModel
import com.greencircle.framework.views.fragments.reviews.UserReviewFragment
import java.util.UUID
import org.json.JSONObject

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ProfileViewModel
    private lateinit var userId: UUID
    private lateinit var profile: Profile
    private var reviewsCount: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        viewModel = ViewModelProvider(this)[ProfileViewModel::class.java]
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root

        val sharedPreferences =
            context?.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
        val userJson = sharedPreferences?.getString("user_session", null)
        val userJSON = JSONObject(userJson!!)
        Log.d("SalidaUserJson", userJSON.getString("uuid"))
        userId = UUID.fromString(userJSON.getString("uuid"))
        viewModel.setUserId(userId)
        viewModel.getUserProfile()

        InitializeObservers()
        InitializeEditarPerfilButton()
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

    private fun InitializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner) {
            profile = it
            setUserData()
        }
    }

    private fun InitializeEditarPerfilButton() {
        binding.editarPerfilButton.setOnClickListener {
            val transaction = requireActivity().supportFragmentManager.beginTransaction()
            transaction.replace(R.id.frame_layout, EditProfileFragment())
            transaction.addToBackStack("editProfileFragment")
            transaction.commit()
        }
    }

    private fun setUserData() {
        if (profile != null) {
            val name = profile.firstName + " " + profile.lastName
            binding.username.text = name
            // binding.profileImage.setImageResource(user.profilePicture)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}