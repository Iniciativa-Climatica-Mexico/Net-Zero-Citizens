package com.greencircle.framework.views.fragments

import CompanyContactViewModel
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class CompanyContactFragment : Fragment() {

    private lateinit var viewModel: CompanyContactViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[CompanyContactViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_company_contact,
            container, false
        )

        val carousel =
            view.findViewById<org.imaginativeworld.whynotimagecarousel.ImageCarousel>(R.id.carousel)

        viewModel.carouselItems.observe(
            viewLifecycleOwner,
            Observer<List<CarouselItem>>
            { items ->
                carousel.addData(items)
            }
        )

        return view
    }

    //        val toggleButton =
//            root.findViewById<com.google.android.material.button.MaterialButtonToggleGroup>(
//                R.id.toggleButton
//            )
//
//        toggleButton.addOnButtonCheckedListener { _, checkedId, isChecked ->
//            if (isChecked) {
//                when (checkedId) {
//                    R.id.btnServices -> setFragment(companyServicesFragment)
//                    R.id.btnContactInfo -> setFragment(companyContactFragment)
//                }
//            }
//        }

//    private fun setFragment(fragment: Fragment) {
//        val fragmentManager = parentFragmentManager
//        val transaction = fragmentManager.beginTransaction()
//        transaction.replace(R.id.FCompanyServices, fragment)
//        transaction.addToBackStack(null)
//        transaction.commit()
//    }
}