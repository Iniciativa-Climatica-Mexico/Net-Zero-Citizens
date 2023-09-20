package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.RatingBar
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview
import com.greencircle.framework.ui.adapters.CompanyReviewAdapter
import com.greencircle.framework.viewmodel.CompanyReviewViewModel
import java.util.UUID

class CompanyReviewFragment : Fragment() {
    private var _binding: FragmentCompanyReviewBinding? = null

    private val binding
        get() = _binding!!
    private lateinit var viewModel: CompanyReviewViewModel
    private lateinit var recyclerView: RecyclerView
    private val adapter: CompanyReviewAdapter = CompanyReviewAdapter()
    private lateinit var data: ArrayList<CompanyReview>
    private lateinit var reviewButton: Button
    private lateinit var ratingBar: RatingBar

    private var rating: Float = 0.0f
    private var reviewsCount: Int = 0
    private var companyId: UUID = UUID.fromString("comp-1234-efgh-0000")

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[CompanyReviewViewModel::class.java]
        _binding = FragmentCompanyReviewBinding.inflate(inflater, container, false)
        val root: View = binding.root
        data = ArrayList()

        companyId =
                UUID.fromString(arguments?.getString("CompanyId"))
                        ?: UUID.fromString("comp-1234-efgh-0000")
        viewModel.setCompanyId(companyId)
        viewModel.getReviewsList()

        initializeComponents(root)
        initializeObservers()
        initializeReviewFormButton()

        setRating()
        setCompanyReviewsData()

        return root
    }

    override fun onStop() {
        super.onStop()
        ratingBar.rating = 0.0f
    }

    override fun onResume() {
        super.onResume()
        viewModel.getReviewsList()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun navigateToReviewFormFragment() {
        val bundle = Bundle()
        bundle.putString("CompanyId", companyId)
        bundle.putFloat("RatingStars", rating)
        val reviewFormFragment = ReviewFormFragment()
        reviewFormFragment.arguments = bundle
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

    private fun initializeReviewFormButton() {
        reviewButton = binding.reviewButton

        reviewButton.setOnClickListener { navigateToReviewFormFragment() }
    }

    private fun setRating() {
        ratingBar = binding.ratingBar

        ratingBar.setOnRatingBarChangeListener { _, rating, _ ->
            this.rating = rating
            if (rating > 0.0f) navigateToReviewFormFragment()
        }
    }

    private fun initializeComponents(root: View) {
        recyclerView = root.findViewById(R.id.RV_Company_Review)
    }

    private fun setCompanyReviewsData() {
        val averageRating = arguments?.getFloat("AverageRating") ?: 0.0f
        val averageRatingString = averageRating.toString()

        binding.averageRating.text = averageRatingString
        binding.averageRatingStars.rating = averageRating
    }

    private fun setReviewsCount() {
        binding.countOpinions.text = getString(R.string.review_opinions_count, reviewsCount)
    }

    private fun initializeObservers() {
        viewModel.reviewObjectLiveData.observe(viewLifecycleOwner) { companyReviewObject ->
            if (companyReviewObject != null) {
                reviewsCount = companyReviewObject.rows.size
                setReviewsCount()
                setUpRecyclerView(companyReviewObject.rows)
            }
        }
    }

    private fun showReviews() {
        binding.RVCompanyReview.visibility = View.VISIBLE
        binding.emptyView.visibility = View.GONE
        binding.reviewInfoWrapper.visibility = View.VISIBLE
    }

    private fun showEmptyView() {
        binding.RVCompanyReview.visibility = View.GONE
        binding.reviewInfoWrapper.visibility = View.GONE
        binding.emptyView.visibility = View.VISIBLE
    }

    private fun setUpRecyclerView(dataForList: ArrayList<CompanyReview>) {
        recyclerView.setHasFixedSize(true)
        val gridLayoutManager =
                GridLayoutManager(requireContext(), 1, GridLayoutManager.VERTICAL, false)
        recyclerView.layoutManager = gridLayoutManager
        if (reviewsCount > 0) {
            showReviews()
            adapter.CompanyReviewAdapter(dataForList, requireContext())
            recyclerView.adapter = adapter
        } else {
            showEmptyView()
        }
    }
}
