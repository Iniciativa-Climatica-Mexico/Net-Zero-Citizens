package com.greencircle.framework.views.fragments.company

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyContactBinding
import com.greencircle.domain.model.company.files.CompanyFile
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.CompanyContactViewModel
import com.greencircle.framework.views.fragments.catalogue.CatalogueFragment
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
        onBackPress()
        _binding = FragmentCompanyContactBinding.inflate(inflater, container, false)

        viewModel.companyData.observe(viewLifecycleOwner) { companyData ->

            if (companyData == null) return@observe

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

            // Revisa si ya hay fragmentos en el contenedor
            if (childFragmentManager.fragments.size > 0) {
                FragmentActivity().supportFragmentManager.popBackStack()
                childFragmentManager.beginTransaction().remove(servicesFragment)
                    .remove(contactInfoFragment).remove(companyReviewsFragment).commit()
            } else {
                childFragmentManager.beginTransaction()
                    .add(R.id.fragmentContainer, servicesFragment)
                    .add(R.id.fragmentContainer, contactInfoFragment)
                    .add(R.id.fragmentContainer, companyReviewsFragment).hide(contactInfoFragment)
                    .hide(companyReviewsFragment).commit()
            }
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

    private fun initCarousel(files: List<CompanyFile>?) {
        val carousel = binding.carousel
        val images = files?.filter { it.fileDescription == FileDescription.IMAGEN }

        if(images.isNullOrEmpty()){
            carousel.addData(CarouselItem(R.drawable.carousel1))
            carousel.addData(CarouselItem(R.drawable.carousel2))
            carousel.addData(CarouselItem(R.drawable.carousel3))
            return
        }

        images.forEach { image ->
            carousel.addData(CarouselItem(image.fileURL))
        }
    }

    /**
     * Función que se encarga de cambiar el fragmento actual por el fragmento de catálogo
     * cuando se presiona el botón de retroceso
     */
    private fun onBackPress() {
        // Override the back button behavior
        val onBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val fragmentManager = requireActivity().supportFragmentManager
                val fragmentTransaction = fragmentManager.beginTransaction()
                val catalogue = CatalogueFragment()

                // replace the current fragment with the catalogue fragment
                fragmentTransaction.replace(R.id.frame_layout, catalogue)
                fragmentTransaction.commit()
            }
        }
        requireActivity().onBackPressedDispatcher.addCallback(
            viewLifecycleOwner, onBackPressedCallback
        )
    }
}