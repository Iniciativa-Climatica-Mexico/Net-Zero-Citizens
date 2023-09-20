package com.greencircle.framework.ui.adapters.ViewHolder

import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.databinding.CatalogueCardLayoutBinding
import com.greencircle.domain.model.CompanySummary

/**
 * Esta clase se utiliza para almacenar los datos de resumen
 * de la empresa y crear la vista de la tarjeta del
 * catálogo de la empresa
 * @property binding: Objeto CatalogueCardLayoutBinding
 * @constructor CatalogueViewHolder
 */

class CatalogueViewHolder(private val binding: CatalogueCardLayoutBinding) : RecyclerView
.ViewHolder(binding.root) {

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
        Glide.with(binding.root.context)
            .load(companySummary.profilePicture).placeholder(R.drawable.ic_launcher_background)
            .into(binding.companyProfilePic)
    }
}