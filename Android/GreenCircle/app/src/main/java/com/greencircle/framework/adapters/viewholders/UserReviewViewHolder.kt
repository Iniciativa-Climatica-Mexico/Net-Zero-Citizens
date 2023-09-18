package com.greencircle.framework.adapters.viewholders

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.PopupMenu
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.UserReview

class UserReviewViewHolder(private var binding: ItemUserReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    private val menuButton: ImageButton = binding.reviewCardOptionsButton

    init {
        menuButton.setOnClickListener {
            val popupMenu = PopupMenu(itemView.context, menuButton)
            popupMenu.inflate(R.menu.menu_user_review)

            popupMenu.setOnMenuItemClickListener { item ->
                when (item.itemId) {
                    R.id.menu_item1 -> {
                        // Handle menu item 1 click
                        true
                    }

                    R.id.menu_item2 -> {
                        // Handle menu item 2 click
                        true
                    }

                    else -> false
                }
            }

            popupMenu.show()
        }
    }
    fun bind(item: UserReview, context: Context) {
        binding.reviewCardTitle.text = item.reviewTitle
        binding.reviewCardContent.text = item.review
        binding.reviewCardRating.text = item.score.toString() + " de 5"
        binding.reviewCardDate.text = item.updatedAt.slice(0..9)
        binding.reviewCardRatingBar.rating = item.score.toFloat()
    }
}