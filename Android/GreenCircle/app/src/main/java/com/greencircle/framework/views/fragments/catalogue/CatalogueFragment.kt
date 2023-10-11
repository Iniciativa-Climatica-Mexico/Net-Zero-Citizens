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

        viewModel.params.observe(viewLifecycleOwner) { params ->
            Log.d("Params to search: ", params.toString())
            search(params)
        }

        search()

        val searchText = binding.SearchBar.searchInput
        searchText.setOnKeyListener { v, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_ENTER && event.action == KeyEvent.ACTION_UP) {
                val newParams = viewModel.params.value
                if (newParams != null) {
                    newParams.name = searchText.text.toString()
                }
                viewModel.updateParams(newParams!!)
                true
            } else {
                false
            }
        }

        // Get the buttonOpenModal and setup onClickListener
        val buttonOpenModal = binding.SearchBar.buttonOpenModal
        buttonOpenModal.setOnClickListener {
            val modal = CatalogueFilterModal.newInstance(viewModel)
            modal.show(parentFragmentManager, "CatalogueFilterModal")
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

    private fun search(params: CompanyParams = viewModel.params.value!!) {
        val recyclerView = binding.newRecyclerView
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
    }
}