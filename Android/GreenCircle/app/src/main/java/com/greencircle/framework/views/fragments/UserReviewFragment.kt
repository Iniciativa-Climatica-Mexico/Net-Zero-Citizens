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
import com.greencircle.databinding.FragmentUserReviewBinding
import com.greencircle.domain.model.UserReview
import com.greencircle.framework.adapters.UserReviewAdapter
import com.greencircle.framework.viewmodel.UserReviewViewModel

class UserReviewFragment : Fragment() {

    private var _binding: FragmentUserReviewBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: UserReviewViewModel
    private lateinit var recyclerView: RecyclerView
    private val adapter: UserReviewAdapter = UserReviewAdapter()

    private lateinit var data: ArrayList<UserReview>
    private var userId: String = arguments?.getString("userId") ?: "abcd-1234-efgh-5678"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentUserReviewBinding.inflate(inflater, container, false)
        val root: View = binding.root
        data = ArrayList()

        viewModel = ViewModelProvider(this)[UserReviewViewModel::class.java]
        viewModel.setUUID(userId)
        viewModel.getUserReviewsList()

        initializeComponents(root)
        initializeObservers()

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun initializeComponents(root: View) {
        recyclerView = root.findViewById(R.id.RV_User_Review)
    }

    private fun initializeObservers() {
        viewModel.userReviewObjectLiveData.observe(viewLifecycleOwner) { userReviewObject ->
            setUpRecyclerView(userReviewObject.rows)
        }
    }

    private fun setUpRecyclerView(dataForList: ArrayList<UserReview>) {
        recyclerView.setHasFixedSize(true)
        val gridLayoutManager =
            GridLayoutManager(requireContext(), 1, GridLayoutManager.VERTICAL, false)
        recyclerView.layoutManager = gridLayoutManager
        if (dataForList.size > 0) {
            binding.RVUserReview.visibility = View.VISIBLE
            binding.emptyView.visibility = View.GONE
            adapter.UserReviewAdapter(dataForList, requireContext())
            recyclerView.adapter = adapter
        } else {
            binding.RVUserReview.visibility = View.GONE
            binding.emptyView.visibility = View.VISIBLE
        }
    }
}