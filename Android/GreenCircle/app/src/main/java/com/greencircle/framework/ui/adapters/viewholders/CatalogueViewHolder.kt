package com.greencircle.framework.ui.adapters.viewholders

import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.databinding.CatalogueCardLayoutBinding
import com.greencircle.domain.model.CompanySummary

/**
 * This class is used to store the company summary data
 * @property binding: Binding object for the catalogue card layout
 * @constructor CatalogueViewHolder
 */

class CatalogueViewHolder(private val binding: CatalogueCardLayoutBinding) : RecyclerView
.ViewHolder(binding.root) {

/**
     * This function is used to bind the company summary data to the view
     * @param companySummary: CompanySummary object to store the company summary data
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