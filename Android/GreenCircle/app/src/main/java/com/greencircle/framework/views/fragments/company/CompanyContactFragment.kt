package com.greencircle.framework.views.fragments.company

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyContactBinding
import com.greencircle.domain.model.company.files.CompanyFile
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.CompanyContactViewModel
import com.greencircle.framework.views.fragments.reviews.CompanyReviewFragment
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class CompanyContactFragment : Fragment() {

    private lateinit var viewModel: CompanyContactViewModel
    private var _binding: FragmentCompanyContactBinding? = null
    private val binding get() = _binding!!

    private val servicesFragment by lazy { CompanyServicesFragment() }
    private val contactInfoFragment by lazy { CompanyContactInfoFragment() }
    private val companyReviewsFragment by lazy { CompanyReviewFragment() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(
            this, ViewModelFactory(requireContext(), CompanyContactViewModel::class.java)
        )[CompanyContactViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCompanyContactBinding.inflate(inflater, container, false)

        viewModel.companyData.observe(viewLifecycleOwner) { companyData ->

            if (companyData == null) return@observe

            Log.d("CompanyContactFragment", companyData.toString())

            initCarousel(companyData.files)
            binding.TVCompanyName.text = companyData.name

            // bundle para pasar los datos de contacto a CompanyContactInfoFragment
            val bundle = Bundle()
            bundle.putString("CompanyId", companyData.companyId.toString())
            bundle.putFloat("AverageRating", companyData.rating ?: 0.0f)

            companyReviewsFragment.arguments = bundle

            bundle.putString("WebPage", companyData.webPage)
            bundle.putString("Email", companyData.email)
            bundle.putString("Phone", companyData.phone)

            var direction: String = ""
            var fullStreet: String = "${companyData.street} ${companyData.streetNumber}"
            fullStreet = fullStreet.trim()
            if (fullStreet.isNotEmpty()) {
                direction += "$fullStreet, "
            }

            direction += companyData.zipCode.toString() +
                ", " + companyData.state +
                ", " + companyData.city

            bundle.putString("Direction", direction)
            contactInfoFragment.arguments = bundle

            // bundle para pasar los servicios a CompanyServicesFragment
            val bundleServices = Bundle()
            bundleServices.putSerializable("Services", companyData.products)
            servicesFragment.arguments = bundleServices

            childFragmentManager.beginTransaction().add(R.id.fragmentContainer, servicesFragment)
                .add(R.id.fragmentContainer, contactInfoFragment)
                .add(R.id.fragmentContainer, companyReviewsFragment).hide(contactInfoFragment)
                .hide(companyReviewsFragment).commit()
        }

        val companyId = arguments?.getString("id")
        viewModel.getCompanyData(companyId!!)

        /*
        *Boton que cambia entre los fragmentos de servicios, informacion de contacto y reviews
        */
        binding.toggleButtonGroup.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.btnServices -> {
                        childFragmentManager.beginTransaction().show(servicesFragment)
                            .hide(contactInfoFragment).hide(companyReviewsFragment).commit()
                    }

                    R.id.btnContactInfo -> {
                        childFragmentManager.beginTransaction().show(contactInfoFragment)
                            .hide(servicesFragment).hide(companyReviewsFragment).commit()
                    }

                    R.id.btnReviews -> {
                        childFragmentManager.beginTransaction().show(companyReviewsFragment)
                            .hide(contactInfoFragment).hide(servicesFragment).commit()
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

    fun initCarousel(files: List<CompanyFile>?) {
        val carousel = binding.carousel
        val images = files?.filter { file -> file.fileDescription == FileDescription.IMAGEN }
        if (images.isNullOrEmpty()) {
            carousel.addData(CarouselItem(R.drawable.main_logo_bg))
        }
        images?.forEach { image ->
            carousel.addData(CarouselItem(image.fileURL))
        }
    }
}