package com.greencircle.framework.views.fragments.TermsAndConditions

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import com.greencircle.R

class TermsAndConditions: Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_terms_and_conditions,
            container,
            false
        )

        val dismissButton = view.findViewById<Button>(R.id.dismiss_button)
        dismissButton.setOnClickListener() {
            activity?.finish()
        }
        return view
    }
}