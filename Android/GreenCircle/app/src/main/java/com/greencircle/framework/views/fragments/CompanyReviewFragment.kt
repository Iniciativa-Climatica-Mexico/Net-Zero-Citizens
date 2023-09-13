package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview
import com.greencircle.framework.adapters.CompanyReviewAdapter
import com.greencircle.framework.viewmodel.CompanyReviewViewModel

class CompanyReviewFragment : Fragment() {
    private var _binding: FragmentCompanyReviewBinding? = null

    private val binding get() = _binding!!
    private lateinit var viewModel: CompanyReviewViewModel
    private lateinit var recyclerView: RecyclerView
    private val adapter: CompanyReviewAdapter = CompanyReviewAdapter()
    private lateinit var data: ArrayList<CompanyReview>

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel = ViewModelProvider(this)[CompanyReviewViewModel::class.java]
        _binding = FragmentCompanyReviewBinding.inflate(inflater, container, false)
        val root: View = binding.root
        data = ArrayList()
        initializeComponents(root)
        initializeObservers()
        viewModel.setCompanyId("comp-1234-efgh-0000")
        viewModel.getReviewsList()
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
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
        adapter.CompanyReviewAdapter(dataForList, requireContext())
        recyclerView.adapter = adapter
    }
}