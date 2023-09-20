package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.greencircle.databinding.FragmentCompanyCatalogueBinding
import com.greencircle.framework.ui.adapters.CatalogueAdapter
import com.greencircle.framework.viewmodel.CatalogueViewModel

class CatalogueFragment : Fragment() {
    private lateinit var binding: FragmentCompanyCatalogueBinding
    private val adapter = CatalogueAdapter()
    private val viewModel: CatalogueViewModel by viewModels()
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = FragmentCompanyCatalogueBinding.inflate(layoutInflater, container, false)

        val recyclerView = binding.newRecyclerView

        viewModel.catalogueLiveData.observe(viewLifecycleOwner) { list ->
            adapter.initCustomAdapter(list, binding.root.context)

            recyclerView.layoutManager = LinearLayoutManager(binding.root.context)
            recyclerView.adapter = adapter
        }

        viewModel.getCompanySummaryList()
        return binding.root
    }
}