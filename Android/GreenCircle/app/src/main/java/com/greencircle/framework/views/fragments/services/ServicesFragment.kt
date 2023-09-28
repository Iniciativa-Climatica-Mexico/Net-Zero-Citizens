package com.greencircle.framework.views.fragments.services

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.google.android.material.materialswitch.MaterialSwitch
import com.greencircle.R

class ServicesFragment : Fragment() {
    private lateinit var fotoVoltaicSwitch: MaterialSwitch
    private lateinit var solarHeaterSwitch: MaterialSwitch

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_product_selection_layout, container, false
        )

        fotoVoltaicSwitch = view.findViewById(R.id.fotovoltaics)
        solarHeaterSwitch = view.findViewById(R.id.solarHeaters)

        val nextBtn = view.findViewById<Button>(R.id.nextFragment)

        nextBtn.setOnClickListener {
            if (!fotoVoltaicSwitch.isChecked && !solarHeaterSwitch.isChecked) {
                val errorText = view.findViewById<TextView>(R.id.errorMsg)
                errorText.visibility = View.VISIBLE
            } else {
                nextFragment()
            }
        }

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setSwitch(fotoVoltaicSwitch)
        setSwitch(solarHeaterSwitch)
    }

    /**
     * Sets the switch to be checked or not. If the switch is checked,
     * it changes the color to green and shows the check icon.
     * @param mSwitch SwitchMaterial
     */
    private fun setSwitch(mSwitch: MaterialSwitch) {
        mSwitch.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                mSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                mSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )

                mSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )
            } else {
                // Colors when the switch is OFF
                mSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                mSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.gray_500
                )

                mSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
            }
        }
    }

    /**
     * Sends the selected services to the next fragment.
     */
    private fun nextFragment() {
        val bundle = Bundle()
        bundle.putBoolean("fotovoltaics", fotoVoltaicSwitch.isChecked)
        bundle.putBoolean("solarHeaters", solarHeaterSwitch.isChecked)

        // Change to the next view
        // val fragment = ServicesFragment()
    }
}