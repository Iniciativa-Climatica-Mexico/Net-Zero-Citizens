package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RatingBar
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview
import com.greencircle.framework.adapters.CompanyReviewAdapter
import com.greencircle.framework.viewmodel.CompanyReviewViewModel
import com.greencircle.framework.viewmodel.ReviewFormViewModel

class CompanyReviewFragment : Fragment() {
    private var _binding: FragmentCompanyReviewBinding? = null

    private val binding get() = _binding!!
    private lateinit var viewModel: CompanyReviewViewModel
    private lateinit var recyclerView: RecyclerView
    private val adapter: CompanyReviewAdapter = CompanyReviewAdapter()
    private lateinit var data: ArrayList<CompanyReview>
    private lateinit var reviewButton: View
    private lateinit var ratingBar: RatingBar
    private lateinit var reviewFormViewModel: ReviewFormViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[CompanyReviewViewModel::class.java]
        reviewFormViewModel = ViewModelProvider(this)[ReviewFormViewModel::class.java]
        _binding = FragmentCompanyReviewBinding.inflate(inflater, container, false)
        val root: View = binding.root
        data = ArrayList()
        initializeComponents(root)
        initializeObservers()
        navigateToReviewFormFragment()
        setRating()
        viewModel.setCompanyId("comp-1234-efgh-0000")
        viewModel.getReviewsList()
        return root
    }

    private fun setRating() {
        ratingBar = binding.ratingBar

        ratingBar.setOnRatingBarChangeListener { _, rating, _ ->
            reviewFormViewModel.setRating(rating)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun navigateToReviewFormFragment() {
        reviewButton = binding.reviewButton

        reviewButton.setOnClickListener {
            val reviewFormFragment = ReviewFormFragment()
            val fragmentManager = requireActivity().supportFragmentManager
            val fragmentTransaction = fragmentManager.beginTransaction()
            fragmentTransaction.replace(R.id.frame_layout, reviewFormFragment)
            fragmentTransaction.commit()
        }
    }

    private fun initializeComponents(root: View) {
        recyclerView = root.findViewById(R.id.RV_Company_Review)
    }

    private fun initializeObservers() {
        viewModel.reviewObjectLiveData.observe(viewLifecycleOwner) { companyReviewObject ->
            setUpRecyclerView(companyReviewObject.rows)
        }
    }

    private fun setUpRecyclerView(dataForList: ArrayList<CompanyReview>) {
        recyclerView.setHasFixedSize(true)
        val gridLayoutManager =
            GridLayoutManager(requireContext(), 1, GridLayoutManager.VERTICAL, false)
        recyclerView.layoutManager = gridLayoutManager
        if (dataForList.size > 0) {
            binding.RVCompanyReview.visibility = View.VISIBLE
            binding.emptyView.visibility = View.GONE
            adapter.CompanyReviewAdapter(dataForList, requireContext())
            recyclerView.adapter = adapter
        } else {
            binding.RVCompanyReview.visibility = View.GONE
            binding.emptyView.visibility = View.VISIBLE
        }
    }
}