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
import com.greencircle.domain.model.CompanyImages
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
        viewModel = ViewModelProvider(this)[CompanyContactViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCompanyContactBinding.inflate(inflater, container, false)

        viewModel.companyData.observe(viewLifecycleOwner) { companyData ->
            initCarousel(companyData?.companyImages)
            binding.TVCompanyName.text = companyData?.name

            // bundle para pasar los datos de contacto a CompanyContactInfoFragment
            val bundle = Bundle()
            bundle.putString("WebPage", companyData?.webPage)
            bundle.putString("Email", companyData?.email)
            bundle.putString("Phone", companyData?.phone)

            val direction: String =
                (
                    companyData?.street + " " + companyData?.streetNumber + ", " +
                        companyData?.zipCode + ", " + companyData?.state + ", " +
                        companyData?.city
                    ).toString()

            bundle.putString("Direction", direction)
            contactInfoFragment.arguments = bundle

            // bundle para pasar los servicios a CompanyServicesFragment
            val bundleServices = Bundle()
            bundleServices.putSerializable("Services", companyData?.products)
            servicesFragment.arguments = bundleServices

            childFragmentManager.beginTransaction().add(R.id.fragmentContainer, servicesFragment)
                .add(R.id.fragmentContainer, contactInfoFragment)
                .add(R.id.fragmentContainer, companyReviewsFragment).hide(contactInfoFragment)
                .hide(companyReviewsFragment).commit()
        }

        //Descomentar para obtener el id de la empresa
//        val companyId = arguments?.getString("CompanyId")
        // Obtiene los datos de la empresa
        viewModel.getCompanyData("c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e")

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

    fun initCarousel(images: List<CompanyImages>?) {
        val carousel = binding.carousel

        images?.forEach { image ->
            carousel.addData(CarouselItem(image.imageUrl))
        }
    }
}