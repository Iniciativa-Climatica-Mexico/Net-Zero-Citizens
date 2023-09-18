package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.User
import com.greencircle.framework.viewmodel.UserViewModel

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: UserViewModel
    private lateinit var user: User
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[UserViewModel::class.java]
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root
        viewModel.setUserId("abcd-1234-efgh-5678")
        viewModel.getUser()
        InitializeObservers()
        return root
    }
    private fun InitializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner, {
            user = it
            setUserData()
        })
    }

    private fun setUserData() {
        if (user != null) {
            val name = user.firstName + " " + user.lastName
            binding.username.text = name
            //binding.profileImage.setImageResource(user.profilePicture)
        }
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}