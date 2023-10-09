package com.greencircle.framework.views.fragments.catalogue

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.greencircle.databinding.FragmentCompanyCatalogueBinding
import com.greencircle.databinding.FragmentErrorBinding
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.framework.ui.adapters.catalogue.CatalogueAdapter
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.catalogue.CatalogueViewModel
import kotlinx.coroutines.launch

class CatalogueFragment : Fragment() {
    private lateinit var binding: FragmentCompanyCatalogueBinding
    private val adapter = CatalogueAdapter()
    private lateinit var viewModel: CatalogueViewModel
    private var params = CompanyParams(
        ordering = "",
        name = "",
        state = "",
        productName = "",
        latitude = 0.0,
        longitude = 0.0
    )

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
            if (list == null) {
                val errorView = FragmentErrorBinding.inflate(layoutInflater)
                binding.root.removeView(recyclerView)
                binding.LLContainer.addView(errorView.root)
                errorView.root.layoutParams.height = ViewGroup.LayoutParams.MATCH_PARENT
                removeSkeleton()
            } else {
                removeSkeleton()
                adapter.initCustomAdapter(list, binding.root.context)
                recyclerView.adapter = adapter
            }
        }

        lifecycleScope.launch {
            try {
                viewModel.fetchAllCompanies(params)
            } catch (e: Exception) {
                val errorView = FragmentErrorBinding.inflate(layoutInflater)
                binding.root.removeView(recyclerView)
                binding.LLContainer.addView(errorView.root)
                errorView.root.layoutParams.height = ViewGroup.LayoutParams.MATCH_PARENT
                removeSkeleton()
                Log.e("Salida", e.message.toString())
            }
        }

        val searchText = binding.SearchBar.searchInput
        searchText.setOnKeyListener { v, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_ENTER && event.action == KeyEvent.ACTION_UP) {
                params.name = searchText.text.toString()
                lifecycleScope.launch {
                    try {
                        viewModel.fetchAllCompanies(params)
                        hideKeyboard(binding.root.context)
                    } catch (e: Exception) {
                        val errorView = FragmentErrorBinding.inflate(layoutInflater)
                        binding.root.removeView(recyclerView)
                        binding.LLContainer.addView(errorView.root)
                        errorView.root.layoutParams.height = ViewGroup.LayoutParams.MATCH_PARENT
                        removeSkeleton()
                        Log.e("Salida", e.message.toString())
                    }
                }
                true
            } else {
                false
            }
        }
        return binding.root
    }

    /**
     * Cierra el teclado
     */
    fun hideKeyboard(context: Context) {
        val inputManager =
            context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        val v = (context as Activity).currentFocus ?: return
        inputManager.hideSoftInputFromWindow(v.windowToken, 0)
    }

    /**
     * Configura el ViewModel
     */
    private fun setUpViewModel() {
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), CatalogueViewModel::class.java)
        )[CatalogueViewModel::class.java]
    }

    private fun removeSkeleton() {
        try {
            val skeleton = binding.fragmentCompanyCatalogueSkeleton.root
            binding.root.removeView(skeleton)
        } catch (e: Exception) {
            Log.e("HomeFragment", "Error al eliminar el skeleton")
            Log.e("HomeFragment", e.message.toString())
        }
    }
}