package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentCompanyContactInfoBinding

class CompanyContactInfoFragment : Fragment() {

    private var _binding: FragmentCompanyContactInfoBinding? = null

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCompanyContactInfoBinding.inflate(
            inflater, container, false
        )

        bindCompanyContactInfo()

        return binding.root
    }

    override fun onStart() {
        super.onStart()
        arguments?.toString()?.let { Log.d("ArgumentsCheck:OnStart", it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    fun bindCompanyContactInfo() {
        binding.TVWPValue.text = arguments?.getString("WebPage")
        binding.TVEmailValue.text = arguments?.getString("Email")
        binding.TVPhoneValue.text = arguments?.getString("Phone")
        binding.TVAddressValue.text = arguments?.getString("Direction")
    }
}