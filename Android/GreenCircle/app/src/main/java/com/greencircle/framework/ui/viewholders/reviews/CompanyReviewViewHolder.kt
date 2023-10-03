package com.greencircle.framework.ui.viewholders.reviews

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.reviews.CompanyReview

class CompanyReviewViewHolder(private var binding: ItemCompanyReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: CompanyReview, context: Context) {
        val reviewTitle = item.reviewTitle
        val review = item.review
        if (reviewTitle.isNullOrBlank() && review.isNullOrBlank()) {
            binding.reviewCard.layoutParams.height = 0
            binding.reviewCard.layoutParams.width = 0
            return
        }

        val name = item.user.firstName
        val rating = "${item.score} de 5"
        val date = item.updatedAt
        val ratingFloat = item.score.toFloat()
        binding.reviewCardName.text = name
        binding.reviewCardTitle.text = reviewTitle
        binding.reviewCardContent.text = review
        binding.reviewCardRating.text = rating
        binding.reviewCardDate.text = date.toString().slice(0..9)
        binding.reviewCardRatingBar.rating = ratingFloat
    }
}