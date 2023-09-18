package com.greencircle.framework.adapters.viewholders

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.UserReview

class UserReviewViewHolder(private var binding: ItemUserReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: UserReview, context: Context) {
        binding.reviewCardTitle.text = item.reviewTitle
        binding.reviewCardContent.text = item.review
        binding.reviewCardRating.text = item.score.toString() + " de 5"
        binding.reviewCardDate.text = item.updatedAt.slice(0..9)
        binding.reviewCardRatingBar.rating = item.score.toFloat()
    }
}