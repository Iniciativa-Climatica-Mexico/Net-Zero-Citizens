package com.greencircle.framework.adapters.viewholders

import android.content.Context
import android.util.Log
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview
import java.text.SimpleDateFormat
import java.util.Locale

class CompanyReviewViewHolder(private var binding: ItemCompanyReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: CompanyReview, context: Context) {
        val name = item.user.firstName + " " + item.user.lastName
        val rating = item.rating.toString() + " de 5"
        val date = item.updatedAt.slice(0..9)
        binding.reviewCardName.text = name
        binding.reviewCardTitle.text = item.reviewTitle
        binding.reviewCardContent.text = item.review
        binding.reviewCardRating.text = rating
        binding.reviewCardDate.text = formatDateWithSlashes(item.updatedAt)
        binding.reviewCardRatingBar.rating = item.rating.toFloat()
    }
    private fun formatDateWithSlashes(dateString: String): String {
        try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
            val date = inputFormat.parse(dateString)

            val outputFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
            return outputFormat.format(date)
        } catch (e: Exception) {
            Log.e("DateError", "Error formatting date: ${e.message}")
            return dateString
        }
    }
}