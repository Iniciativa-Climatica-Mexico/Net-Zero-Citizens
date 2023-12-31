package com.greencircle.framework.views.fragments.company

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentCompanyContactInfoBinding

/**
 * Fragmento que se encarga de mostrar la información de contacto de la empresa
 * @constructor Crea un fragmento de company contact info
 * @since 1.0.0
 */
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

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    /*
     * Se encarga de bindear los datos de contacto de la empresa.
     * Si no hay datos de la página web, se oculta el título y el valor de la página web
     */
    private fun bindCompanyContactInfo() {
        if (arguments?.getString("WebPage").isNullOrEmpty()) {
            binding.LLWP.visibility = View.GONE
        }

        binding.TVEmailValue.text = arguments?.getString("Email")
        binding.TVPhoneValue.text = arguments?.getString("Phone")
        binding.TVAddressValue.text = arguments?.getString("Direction")
    }
}