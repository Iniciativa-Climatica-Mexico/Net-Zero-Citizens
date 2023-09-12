package com.greencircle.framework.adapters.viewholders

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview

class CompanyReviewViewHolder(private var binding: ItemCompanyReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: CompanyReview, context: Context) {
        binding.reviewCardName.text = item.UUID
        binding.reviewCardContent.text = item.review
    }
}