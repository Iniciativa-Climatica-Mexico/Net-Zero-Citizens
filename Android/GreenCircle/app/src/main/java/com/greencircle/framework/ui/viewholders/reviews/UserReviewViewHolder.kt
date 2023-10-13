package com.greencircle.framework.ui.viewholders.reviews

import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import android.widget.PopupMenu
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.reviews.UserReview
import com.greencircle.framework.viewmodel.reviews.DeleteUserReviewViewModel
import com.greencircle.framework.views.fragments.profile.ProfileFragment
import com.greencircle.framework.views.fragments.reviews.UpdateReviewFragment
import java.util.UUID

class UserReviewViewHolder(
    private var binding: ItemUserReviewBinding,
    private var context: Context,
) : RecyclerView.ViewHolder(binding.root) {

    private lateinit var reviewId: UUID
    private val viewModel: DeleteUserReviewViewModel = DeleteUserReviewViewModel(context)
    private val menuButton: ImageButton = binding.reviewCardOptionsButton

    init {
        menuButton.setOnClickListener {
            val popupMenu = PopupMenu(itemView.context, menuButton)
            popupMenu.inflate(R.menu.menu_user_review)

            popupMenu.setOnMenuItemClickListener { item ->
                when (item.itemId) {
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
        binding.reviewCardRating.text = item.score.toString() + " de 5"
        binding.reviewCardDate.text = item.updatedAt.toString().slice(0..9)
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
        bundle.putString("reviewId", reviewId.toString())

        val updateReviewFragment = UpdateReviewFragment()
        updateReviewFragment.arguments = bundle
        val fragmentManager = (itemView.context as? AppCompatActivity)?.supportFragmentManager

        val fragmentTransaction = fragmentManager?.beginTransaction()

        fragmentTransaction?.setCustomAnimations(
            R.animator.slide_in_right,
            R.animator.slide_out_left,
            R.animator.slide_in_left,
            R.animator.slide_out_right
        )

        fragmentTransaction?.replace(R.id.frame_layout, updateReviewFragment)
        fragmentTransaction?.addToBackStack("Review Form")
        fragmentTransaction?.commit()
    }

    private fun buildAlertDialog() {
        val alertDialogBuilder = AlertDialog.Builder(itemView.context)
        alertDialogBuilder.setTitle("Borrar Reseña")
        alertDialogBuilder.setMessage("¿Estás seguro de que quieres borrar esta reseña?")

        alertDialogBuilder.setPositiveButton("Si") { dialog, _ ->
            try {
                deleteReview(reviewId)
                Toast.makeText(
                    itemView.context,
                    "Reseña eliminada",
                    Toast.LENGTH_SHORT
                ).show()
            } catch (e: Exception) {
                Toast.makeText(itemView.context, "Error al eliminar reseña", Toast.LENGTH_SHORT)
                    .show()
            }
        }

        alertDialogBuilder.setNegativeButton("No") { dialog, _ ->
            dialog.dismiss()
        }

        alertDialogBuilder.setIcon(android.R.drawable.ic_dialog_alert)

        val alertDialog = alertDialogBuilder.create()
        alertDialog.show()
    }

    private fun deleteReview(reviewId: UUID) {
        try {
            viewModel.deleteReview(reviewId)
            val profileFragment = ProfileFragment()
            val fragmentManager = (itemView.context as? AppCompatActivity)?.supportFragmentManager

            val fragmentTransaction = fragmentManager?.beginTransaction()

            fragmentTransaction?.replace(R.id.frame_layout, profileFragment)
            fragmentTransaction?.commit()
        } catch (e: Exception) {
            Log.d("myError", "Error: ${e.message}")
        }
    }
}