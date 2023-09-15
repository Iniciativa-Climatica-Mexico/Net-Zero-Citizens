package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentReviewFormBinding
import com.greencircle.framework.viewmodel.ReviewFormViewModel

class ReviewFormFragment : Fragment() {
    private var _binding: FragmentReviewFormBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: ReviewFormViewModel

    private var reviewTitle: String = ""
    private var review: String = ""
    private var allowedReview: Boolean = true

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[ReviewFormViewModel::class.java]

        _binding = FragmentReviewFormBinding.inflate(inflater, container, false)
        val root: View = binding.root

        addReview()
        initializeRatingBarListener()
        initializeReviewListener()

        return root
    }

    private fun initializeReviewListener() {
        reviewTitle = binding.titleInput.text.toString()
        review = binding.reviewInput.text.toString()

        if (reviewTitle.isEmpty() && review.isNotEmpty()) {
            binding.titleTextField.isErrorEnabled = true
            binding.titleTextField.error = "Ingresa un titulo para la reseña"
            allowedReview = false
        } else if (reviewTitle.isNotEmpty() && review.isEmpty()) {
            binding.reviewTextField.isErrorEnabled = true
            binding.reviewTextField.error = "Ingresa una reseña"
            allowedReview = false
        }
    }

    private fun initializeRatingBarListener() {
        binding.ratingBar.setOnRatingBarChangeListener { _, _, _ ->
            binding.ratingError.visibility = View.GONE
        }
    }

    private fun addReview() {
        binding.publishReviewButton.setOnClickListener {
            val UUID = "abcd-1234-efgh-5678"
            val companyId = "comp-1234-efgh-0000"
            val rating = binding.ratingBar.rating.toInt()

            if (rating == 0) {
                binding.ratingError.visibility = View.VISIBLE
            } else {
                if (allowedReview) {
//                    val reviewBase = ReviewBase(reviewTitle, review, rating)
//                    viewModel.addReview(UUID, companyId, reviewBase)
                    Toast.makeText(
                        requireContext(),
                        getString(R.string.review_submit_toast),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}