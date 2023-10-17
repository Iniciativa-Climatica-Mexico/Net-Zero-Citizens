package com.greencircle.framework.ui.viewholders.catalogue

import android.os.Bundle
import android.widget.CheckBox
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.databinding.CatalogueCardLayoutBinding
import com.greencircle.domain.model.company.CompanySummary
import com.greencircle.domain.model.favourites.FavouriteRequest
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.framework.viewmodel.catalogue.CatalogueViewModel
import com.greencircle.framework.views.activities.MainActivity
import com.greencircle.framework.views.fragments.company.CompanyContactFragment

/**
 * Esta clase se utiliza para almacenar los datos de resumen
 * de la empresa y crear la vista de la tarjeta del
 * catálogo de la empresa
 * @property binding: Objeto CatalogueCardLayoutBinding
 * @constructor CatalogueViewHolder
 */

class CatalogueViewHolder(private val binding: CatalogueCardLayoutBinding) :
    RecyclerView.ViewHolder(binding.root) {
    private lateinit var recoverSession: RecoverUserSessionRequirement

    /**
     * Esta función se utiliza para vincular los datos de resumen de la empresa
     * con la vista de la tarjeta del catálogo de la empresa
     * @param companySummary: Objeto CompanySummary
     */
    fun bind(companySummary: CompanySummary) {
        binding.companyName.text = companySummary.name
        binding.companyLocation.text = companySummary.city + ", " + companySummary.state
        binding.companyRatingText.text = companySummary.rating.toString()
        binding.companyRatingBar.rating = companySummary.rating

        Glide.with(binding.root.context).load(companySummary.profilePicture)
            .placeholder(R.drawable.main_logo).into(binding.companyProfilePic)

        recoverSession = RecoverUserSessionRequirement(binding.root.context)

        // set checkbox
        val checkBox = binding.root.findViewById<CheckBox>(R.id.mark_as_favourite)
        checkBox.isChecked = companySummary.isFavourite

        // set on check listener
        checkBox.setOnClickListener {
            val userId = recoverSession().uuid

            if (checkBox.isChecked) {
                companySummary.isFavourite = true

                val params = FavouriteRequest(
                    userId.toString(),
                    companySummary.companyId.toString(),
                )

                val viewModel = CatalogueViewModel(binding.root.context)
                viewModel.markAsFavourite(params)
            } else {
                companySummary.isFavourite = false
            }
        }

        // set onclick listener
        binding.root.setOnClickListener {
            val bundle = Bundle()

            bundle.putString("id", companySummary.companyId.toString())
            passViewGoToCompanyDetail(bundle)
        }
    }

    /**
     * Esta función se utiliza para pasar a la vista de detalle de la empresa
     * @param bundle: Objeto Bundle
     */
    private fun passViewGoToCompanyDetail(bundle: Bundle) {
        val companyContactFragment = CompanyContactFragment()
        companyContactFragment.arguments = bundle

        replaceFragment(companyContactFragment, "CompanyContactFragment")
    }

    /**
     * Esta función se utiliza para reemplazar el fragmento actual con el fragmento
     * de contacto de la empresa
     * @param fragment: Objeto Fragment
     * @param tag: Objeto String
     */
    private fun replaceFragment(fragment: Fragment, tag: String) {
        val activity = binding.root.context as MainActivity
        val CompanyContactFragment = CompanyContactFragment()

        activity.replaceFragment(fragment, tag)
    }
}