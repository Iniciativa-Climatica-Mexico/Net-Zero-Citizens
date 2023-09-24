package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.data.remote.ecoinfo.EcoInfoRetrofit
import com.greencircle.data.repository.EcoInfoRepository
import com.greencircle.framework.ui.adapters.EcoInfoAdapter
import com.greencircle.framework.viewmodel.EcoInfoViewModel
import com.greencircle.framework.viewmodel.EcoInfoViewModelFactory
import kotlinx.coroutines.launch

/**
 * Fragmento para la pantalla principal
 */
class HomeFragment : Fragment() {
    private lateinit var viewModel: EcoInfoViewModel
    private lateinit var recyclerView: RecyclerView

    /**
     * Infla el layout del fragmento y configura el RecyclerView
     * @param inflater LayoutInflater
     * @param container ViewGroup?
     * @param savedInstanceState Bundle?
     * @return View? Vista del fragmento
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val view = inflateView(inflater, container)

        setUpViewModel()
        setUpRecyclerView(view!!)
        fetchData()
        observeData()

        return view
    }

    /**
     * Infla el layout del fragmento
     * @param inflater LayoutInflater
     * @param container ViewGroup?
     * @return View? Vista del fragmento
     */
    private fun inflateView(inflater: LayoutInflater, container: ViewGroup?): View? {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    /**
     * Configura el ViewModel
     */
    private fun setUpViewModel() {
        val repository = EcoInfoRepository(EcoInfoRetrofit.api)
        val viewModelFactory = EcoInfoViewModelFactory(repository)

        viewModel = ViewModelProvider(this, viewModelFactory)[EcoInfoViewModel::class.java]
    }

    /**
     * Configura el RecyclerView
     * @param view View
     */
    private fun setUpRecyclerView(view: View) {
        recyclerView = view.findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(context)
    }

    private fun fetchData() {
        lifecycleScope.launch {
            try {
                viewModel.fetchEcoInfos()
            } catch (e: Exception) {
                Log.e("HomeFragment", e.message.toString())
            }
        }
    }

    /**
     * Observa los datos del ViewModel
     */
    private fun observeData() {
        viewModel.ecoInfos.observe(viewLifecycleOwner) { ecoInfos ->
            recyclerView.adapter = EcoInfoAdapter(ecoInfos)
        }
    }
}
