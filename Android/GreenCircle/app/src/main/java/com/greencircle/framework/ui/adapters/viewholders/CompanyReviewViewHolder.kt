package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview

class CompanyReviewViewHolder(private var binding: ItemCompanyReviewBinding) :
        RecyclerView.ViewHolder(binding.root) {

    fun bind(item: CompanyReview, context: Context) {
        val reviewTitle = item.reviewTitle
        if (reviewTitle == "") {
            binding.reviewCard.visibility = View.GONE
            return
        }
        val name = item.user.firstName + " " + item.user.lastName
        val rating = "${item.rating} de 5"
        val date = item.updatedAt.slice(0..9)
        val review = item.review
        val ratingFloat = item.rating.toFloat()
        binding.reviewCardName.text = name
        binding.reviewCardTitle.text = reviewTitle
        binding.reviewCardContent.text = review
        binding.reviewCardRating.text = rating
        binding.reviewCardDate.text = date
        binding.reviewCardRatingBar.rating = ratingFloat
    }
}
