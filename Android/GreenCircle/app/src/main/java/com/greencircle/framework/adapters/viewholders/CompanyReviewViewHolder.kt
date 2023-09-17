package com.greencircle.framework.adapters.viewholders

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview

class CompanyReviewViewHolder(private var binding: ItemCompanyReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: CompanyReview, context: Context) {
        val name = item.user.firstName + " " + item.user.lastName
        val rating = item.rating.toString() + "de 5"
        val date = item.updatedAt.slice(0..9)
        binding.reviewCardName.text = name
        binding.reviewCardTitle.text = item.reviewTitle
        binding.reviewCardContent.text = item.review
        binding.reviewCardRating.text = rating
        binding.reviewCardDate.text = date
        binding.reviewCardRatingBar.rating = item.rating.toFloat()
    }
}