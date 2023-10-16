package com.greencircle.framework.views.fragments.services

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.materialswitch.MaterialSwitch
import com.greencircle.R
import com.greencircle.domain.usecase.auth.DeleteTokensRequirement
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.CreateCompanyViewModel
import com.greencircle.framework.views.activities.LoginActivity
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.framework.views.fragments.company.upload_documents.UploadIdFragment

class ServicesFragment : Fragment() {
    private lateinit var fotoVoltaicSwitch: MaterialSwitch
    private lateinit var solarHeaterSwitch: MaterialSwitch
    private var arguments = Bundle()
    private var companyId: String? = null
    private lateinit var context: Context
    private lateinit var viewModel: CreateCompanyViewModel
    private lateinit var deleteTokens: DeleteTokensRequirement
    private lateinit var deleteUserSession: DeleteUserSessionRequirement
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), CreateCompanyViewModel::class.java)
        )[CreateCompanyViewModel::class.java]
        arguments = requireArguments()
        companyId = arguments.getString("companyId")
        context = requireContext()
    }

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
                val products = ArrayList<String>()
                if (fotoVoltaicSwitch.isChecked) {
                    products.add("Paneles Solares")
                }
                if (solarHeaterSwitch.isChecked) {
                    products.add("Calentadores Solares")
                }
                viewModel.assignCompanyProducts(
                    companyId.toString(),
                    products
                )
            }
        }

        viewModel.assignCompanyProductsResult.observe(viewLifecycleOwner) {
            if (it) {
                nextFragment()
            } else {
                // toast error and go to main
                Toast.makeText(
                    context,
                    "Error al asignar los productos",
                    Toast.LENGTH_SHORT
                ).show()
                deleteTokens()
                deleteUserSession()
                navigateToLogin()
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
        arguments.putBoolean("photovoltaics", fotoVoltaicSwitch.isChecked)
        arguments.putBoolean("solarHeaters", solarHeaterSwitch.isChecked)

        val uploadIdFragment = UploadIdFragment()
        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadIdFragment, arguments)
    }

    private fun navigateToLogin() {
        // Navigate to LoginActivity
        val intent: Intent = Intent(requireContext(), LoginActivity::class.java)
        startActivity(intent)
        requireActivity().finish()
    }
}