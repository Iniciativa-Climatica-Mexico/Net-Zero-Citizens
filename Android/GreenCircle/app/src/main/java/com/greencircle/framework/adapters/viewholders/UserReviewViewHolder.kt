package com.greencircle.framework.adapters.viewholders

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import android.widget.PopupMenu
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.UserReview
import com.greencircle.framework.viewmodel.DeleteUserReviewViewModel
import com.greencircle.framework.views.fragments.UpdateReviewFragment
import com.greencircle.framework.views.fragments.UserReviewFragment
import java.text.SimpleDateFormat
import java.util.Locale

class UserReviewViewHolder(
    private var binding: ItemUserReviewBinding,
) : RecyclerView.ViewHolder(binding.root) {

    private lateinit var reviewId: String
    private val viewModel: DeleteUserReviewViewModel = DeleteUserReviewViewModel()
    private val menuButton: ImageButton = binding.reviewCardOptionsButton

    init {
        menuButton.setOnClickListener {
            val popupMenu = PopupMenu(itemView.context, menuButton)
            popupMenu.inflate(R.menu.menu_user_review)

            popupMenu.setOnMenuItemClickListener { item ->
                when (item.itemId) {
                    R.id.update_review -> {
                        navigateToUpdateReviewFormFragment()
                        true
                    }

                    R.id.delete_review -> {
                        buildAlertDialog()
                        true
                    }

                    else -> false
                }
            }

            popupMenu.show()
        }
    }

    fun bind(item: UserReview, context: Context) {
        reviewId = item.reviewId
        binding.reviewCardTitle.text = item.reviewTitle
        binding.reviewCardContent.text = item.review
        binding.reviewCardDate.text = formatDateWithSlashes(item.updatedAt)
        binding.reviewCardRatingBar.rating = item.score.toFloat()
    }

    private fun navigateToUpdateReviewFormFragment() {
        val title: String = binding.reviewCardTitle.text.toString()
        val review: String = binding.reviewCardContent.text.toString()
        val score: Float = binding.reviewCardRatingBar.rating

        val bundle = Bundle()
        bundle.putString("title", title)
        bundle.putString("review", review)
        bundle.putFloat("score", score)

        val updateReviewFragment = UpdateReviewFragment()
        updateReviewFragment.arguments = bundle
        val fragmentManager = (itemView.context as? AppCompatActivity)?.supportFragmentManager

        val fragmentTransaction = fragmentManager?.beginTransaction()

        fragmentTransaction?.setCustomAnimations(
            R.anim.slide_in_right,
            R.anim.slide_out_left,
            R.anim.slide_in_left,
            R.anim.slide_out_right
        )

        fragmentTransaction?.replace(R.id.frame_layout, updateReviewFragment)
        fragmentTransaction?.addToBackStack("Review Form")
        fragmentTransaction?.commit()
    }

    private fun buildAlertDialog() {
        val alertDialogBuilder = AlertDialog.Builder(itemView.context)
        alertDialogBuilder.setTitle("Delete entry")
        alertDialogBuilder.setMessage("Are you sure you want to delete this entry?")

        alertDialogBuilder.setPositiveButton("yes") { dialog, which ->
            deleteReview(reviewId)
            Toast.makeText(itemView.context, reviewId, Toast.LENGTH_SHORT).show()
        }

        alertDialogBuilder.setNegativeButton("no", null)

        alertDialogBuilder.setIcon(android.R.drawable.ic_dialog_alert)

        val alertDialog = alertDialogBuilder.create()
        alertDialog.show()
    }

    private fun deleteReview(reviewId: String) {
        try {
            viewModel.deleteReview(reviewId)
            val userReviewFragment = UserReviewFragment()
            val fragmentManager = (itemView.context as? AppCompatActivity)?.supportFragmentManager

            val fragmentTransaction = fragmentManager?.beginTransaction()

            fragmentTransaction?.replace(R.id.frame_layout, userReviewFragment)
            fragmentTransaction?.commit()
        } catch (e: Exception) {
            Log.d("myError", "Error: ${e.message}")
        }
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