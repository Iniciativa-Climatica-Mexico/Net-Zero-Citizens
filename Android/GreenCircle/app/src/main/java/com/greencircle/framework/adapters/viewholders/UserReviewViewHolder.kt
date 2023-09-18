package com.greencircle.framework.adapters.viewholders

import android.content.Context
import android.os.Bundle
import android.widget.ImageButton
import android.widget.PopupMenu
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.UserReview
import com.greencircle.framework.views.fragments.UpdateReviewFragment

class UserReviewViewHolder(private var binding: ItemUserReviewBinding) :
    RecyclerView.ViewHolder(binding.root) {

    private val menuButton: ImageButton = binding.reviewCardOptionsButton

    init {
        menuButton.setOnClickListener {
            val popupMenu = PopupMenu(itemView.context, menuButton)
            popupMenu.inflate(R.menu.menu_user_review)

            popupMenu.setOnMenuItemClickListener { item ->
                when (item.itemId) {
                    R.id.update_review -> {
                        // Handle menu item 1 click
                        true
                    }

                    R.id.delete_review -> {
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

    private fun navigateToUpdateReviewFormFragment() {
        var title: String = binding.reviewCardTitle.text.toString()
        var review: String = binding.reviewCardContent.text.toString()
        var score: Float = binding.reviewCardRatingBar.rating

        val bundle = Bundle()
        bundle.putString("title", title)
        bundle.putString("review", review)
        bundle.putFloat("score", score)

        val updateReviewFormFragment = UpdateReviewFragment()
        updateReviewFormFragment.arguments = bundle
        val fragmentManager = requireActivity().supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()

        fragmentTransaction.setCustomAnimations(
            R.anim.slide_in_right,
            R.anim.slide_out_left,
            R.anim.slide_in_left,
            R.anim.slide_out_right
        )

        fragmentTransaction.replace(R.id.frame_layout, reviewFormFragment)
        fragmentTransaction.addToBackStack("Review Form")
        fragmentTransaction.commit()
    }
}