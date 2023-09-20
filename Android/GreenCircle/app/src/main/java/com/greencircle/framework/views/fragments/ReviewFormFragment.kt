package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.textfield.TextInputLayout
import com.greencircle.R
import com.greencircle.databinding.FragmentReviewFormBinding
import com.greencircle.domain.model.ReviewBase
import com.greencircle.framework.viewmodel.ReviewFormViewModel
import java.util.UUID

class ReviewFormFragment : Fragment() {
    private var _binding: FragmentReviewFormBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: ReviewFormViewModel

    private var rating: Float = 0.0f
    private var reviewTitle: String = ""
    private var review: String = ""

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[ReviewFormViewModel::class.java]

        _binding = FragmentReviewFormBinding.inflate(inflater, container, false)
        val root: View = binding.root

        initializeRatingBar()
        initializeRatingBarListener()
        initializePublishReviewButton()

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun initializeRatingBar() {
        rating = arguments?.getFloat("rating") ?: 0.0f
        binding.ratingBar.rating = rating
    }

    private fun initializeRatingBarListener() {
        binding.ratingBar.setOnRatingBarChangeListener { _, _, _ ->
            binding.ratingError.visibility = View.GONE
        }
    }

    private fun setTextInputError(textField: TextInputLayout, errorMessage: String) {
        textField.isErrorEnabled = true
        textField.error = errorMessage
        initializeTextWatchers()
    }

    private fun clearTextFieldsErrors() {
        binding.titleTextField.isErrorEnabled = false
        binding.reviewTextField.isErrorEnabled = false
    }

    private fun isReviewComplete(): Boolean {
        reviewTitle = binding.titleInput.text.toString()
        review = binding.reviewInput.text.toString()

        if (reviewTitle.isEmpty() && review.isNotEmpty()) {
            setTextInputError(
                binding.titleTextField,
                getString(R.string.no_title_form_review_error)
            )
            return false
        } else if (reviewTitle.isNotEmpty() && review.isEmpty()) {
            setTextInputError(
                binding.reviewTextField,
                getString(R.string.no_review_form_review_error)
            )
            return false
        }

        clearTextFieldsErrors()
        return true
    }

    private fun initializeTextWatchers() {
        binding.titleInput.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(titleInputEditable: Editable) {
                isReviewComplete()
            }

            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        })

        binding.reviewInput.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(reviewInputEditable: Editable) {
                isReviewComplete()
            }

            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        })
    }

    private fun navigateToCompanyReviewFragment() {
        val companyReviewFragment = CompanyReviewFragment()
        val fragmentManager = requireActivity().supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()

        fragmentTransaction.setCustomAnimations(
            R.anim.slide_in_right,
            R.anim.slide_out_left,
            R.anim.slide_in_left,
            R.anim.slide_out_right
        )

        fragmentTransaction.replace(R.id.frame_layout, companyReviewFragment)
        fragmentTransaction.commit()
    }

    private fun postReview(rating: Int) {
        val uuid : UUID = UUID.fromString(arguments?.getString("UUID")) ?: UUID.fromString("abcd-1234-efgh-5678")
        val companyId: UUID = UUID.fromString(arguments?.getString("companyId")) ?: UUID.fromString("abcd-1234-efgh-5678")
        val reviewBase = ReviewBase(reviewTitle, review, rating)

        viewModel.addReview(uuid, companyId, reviewBase)

        Toast.makeText(
            requireContext(),
            getString(R.string.review_submit_toast),
            Toast.LENGTH_SHORT
        ).show()

        navigateToCompanyReviewFragment()
    }

    private fun publishReview() {
        val rating = binding.ratingBar.rating.toInt()
        val isReviewComplete = isReviewComplete()

        if (rating == 0) {
            binding.ratingError.visibility = View.VISIBLE
        } else if (isReviewComplete) {
            postReview(rating)
        }
    }

    private fun initializePublishReviewButton() {
        val publishReviewButton = binding.publishReviewButton

        publishReviewButton.setOnClickListener { publishReview() }
    }
}