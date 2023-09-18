package com.greencircle.framework.views.fragments

import CompanyContactViewModel
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyContactBinding

class CompanyContactFragment : Fragment() {

    private lateinit var viewModel: CompanyContactViewModel
    private var _binding: FragmentCompanyContactBinding? = null
    private val binding get() = _binding!!

    private val servicesFragment by lazy { CompanyServicesFragment() }
    private val contactInfoFragment by lazy { CompanyContactInfoFragment() }
    private val companyReviewsFragment by lazy { CompanyReviewFragment() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[CompanyContactViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCompanyContactBinding.inflate(inflater, container, false)

        viewModel.carouselItems.observe(viewLifecycleOwner) { items ->
            binding.carousel.addData(items)
        }

        childFragmentManager
            .beginTransaction()
            .add(R.id.fragmentContainer, servicesFragment)
            .add(R.id.fragmentContainer, contactInfoFragment)
            .add(R.id.fragmentContainer, companyReviewsFragment)
            .hide(contactInfoFragment)
            .hide(companyReviewsFragment)
            .commit()

        /*
        *Boton que cambia entre los fragmentos de servicios, informacion de contacto y reviews
        */
        binding.toggleButtonGroup.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.btnServices -> {
                        childFragmentManager
                            .beginTransaction()
                            .show(servicesFragment)
                            .hide(contactInfoFragment)
                            .hide(companyReviewsFragment)
                            .commit()
                    }

                    R.id.btnContactInfo -> {
                        childFragmentManager.beginTransaction()
                            .show(contactInfoFragment)
                            .hide(servicesFragment)
                            .hide(companyReviewsFragment)
                            .commit()
                    }

                    R.id.btnReviews -> {
                        childFragmentManager
                            .beginTransaction()
                            .show(companyReviewsFragment)
                            .hide(contactInfoFragment)
                            .hide(servicesFragment)
                            .commit()
                    }
                }
            }
        }

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
