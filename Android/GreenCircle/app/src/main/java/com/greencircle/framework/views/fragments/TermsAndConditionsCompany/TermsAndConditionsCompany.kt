package com.greencircle.framework.views.fragments.TermsAndConditionsCompany

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import com.greencircle.R

class TermsAndConditionsCompany : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_terms_and_conditions_company,
            container,
            false
        )

        val dismissButton = view.findViewById<Button>(R.id.dismiss_button)
        dismissButton.setOnClickListener {
            // go back one fragment
            requireActivity().onBackPressedDispatcher.onBackPressed()
        }
        return view
    }
}