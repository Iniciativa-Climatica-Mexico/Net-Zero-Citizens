package com.greencircle.framework.views.fragments
import CompanyContactViewModel
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.button.MaterialButtonToggleGroup
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyContactBinding
import org.imaginativeworld.whynotimagecarousel.ImageCarousel

class CompanyContactFragment : Fragment() {

    private lateinit var viewModel: CompanyContactViewModel
    private var _binding: FragmentCompanyContactBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this).get(CompanyContactViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCompanyContactBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val carousel = root.findViewById<ImageCarousel>(R.id.carousel)

        viewModel.carouselItems.observe(
            viewLifecycleOwner,
            Observer { items ->
                // Add new data to the carousel
                carousel.addData(items)
            }
        )

        val toggleButtonGroup = root.findViewById<MaterialButtonToggleGroup>(
            R.id.toggleButtonGroup
        )

        toggleButtonGroup.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.btnServices -> {
                        // Replace the current fragment with CompanyServicesFragment
                        val fragment = CompanyServicesFragment()
                        childFragmentManager.beginTransaction()
                            .replace(R.id.FCompanyServices, fragment)
                            .commit()
                    }

                    R.id.btnContactInfo -> {
                        // Replace the current fragment with ContactInfoFragment
                        val fragment = CompanyContactInfoFragment()
                        childFragmentManager.beginTransaction()
                            .replace(R.id.FCompanyServices, fragment)
                            .commit()
                    }
                }
            }
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
