package com.greencircle.framework.ui.adapters.viewholders

import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.databinding.CardLayoutBinding
import com.greencircle.domain.model.CompanySummary

class CatalogueViewHolder(private val binding: CardLayoutBinding) : RecyclerView
.ViewHolder(binding.root) {
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