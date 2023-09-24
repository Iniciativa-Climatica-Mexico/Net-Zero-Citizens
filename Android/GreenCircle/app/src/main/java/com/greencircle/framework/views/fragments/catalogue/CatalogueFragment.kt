package com.greencircle.framework.views.fragments.catalogue

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.greencircle.databinding.FragmentCompanyCatalogueBinding
import com.greencircle.framework.ui.adapters.CatalogueAdapter
import com.greencircle.framework.viewmodel.CatalogueViewModel
import kotlinx.coroutines.launch

class CatalogueFragment : Fragment() {
    private lateinit var binding: FragmentCompanyCatalogueBinding
    private val adapter = CatalogueAdapter()
    private lateinit var viewModel: CatalogueViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setUpViewModel()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = FragmentCompanyCatalogueBinding
            .inflate(layoutInflater, container, false)

        val recyclerView = binding.newRecyclerView
        recyclerView.layoutManager = LinearLayoutManager(binding.root.context)

        viewModel.catalogueLiveData.observe(viewLifecycleOwner) { list ->
            if (list != null) {
                adapter.initCustomAdapter(list, binding.root.context)
            }
            recyclerView.adapter = adapter
        }

        lifecycleScope.launch {
            try {
                viewModel.fetchAllCompanies()
            } catch (e: Exception) {
                Log.e("Salida", e.message.toString())
            }
        }

        return binding.root
    }

    /**
     * Configura el ViewModel
     */
    private fun setUpViewModel() {
        viewModel = ViewModelProvider(this)[CatalogueViewModel::class.java]
    }
}