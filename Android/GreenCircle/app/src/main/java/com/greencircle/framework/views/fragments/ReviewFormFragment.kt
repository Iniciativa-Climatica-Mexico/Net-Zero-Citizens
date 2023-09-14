package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.databinding.FragmentReviewFormBinding
import com.greencircle.framework.viewmodel.ReviewFormViewModel

class ReviewFormFragment : Fragment() {
    private var _binding: FragmentReviewFormBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: ReviewFormViewModel
    private var rating: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[ReviewFormViewModel::class.java]

        _binding = FragmentReviewFormBinding.inflate(inflater, container, false)
        val root: View = binding.root

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}