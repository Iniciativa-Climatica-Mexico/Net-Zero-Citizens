package com.greencircle.framework.views.fragments.profile

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
import com.greencircle.framework.viewmodel.profile.ProfileViewModel
import com.greencircle.framework.views.fragments.reviews.UserReviewFragment
import java.util.UUID

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ProfileViewModel
    private lateinit var userId: UUID
    private lateinit var user: Profile

    private var reviewsCount: Int = 100

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        viewModel = ViewModelProvider(this)[ProfileViewModel::class.java]
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root

        if (arguments?.getString("userId") == null) {
            userId = UUID.fromString("8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
        } else {
            userId = UUID.fromString(arguments?.getString("userId"))
        }

        viewModel.setUserId(userId)
        viewModel.getUserProfile()

        InitializeObservers()
        InitializeEditarPerfilButton()
        displayUserReviewFragment()

        binding.resenasCountTextView.text = "$reviewsCount"

        return root
    }

    private fun displayUserReviewFragment() {
        val bundle = Bundle()
        bundle.putInt("ReviewsCount", reviewsCount)

        val userReviewFragment = UserReviewFragment()
        val fragmentManager: FragmentManager = requireActivity().supportFragmentManager
        userReviewFragment.arguments = bundle
        val transaction: FragmentTransaction = fragmentManager.beginTransaction()
        transaction.add(R.id.userReviewFragment, userReviewFragment, "child_fragment_tag")
        transaction.commit()
    }

    private fun InitializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner) {
            user = it
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
        if (user != null) {
            val name = user.firstName + " " + user.lastName
            binding.username.text = name
            // binding.profileImage.setImageResource(user.profilePicture)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}