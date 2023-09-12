package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyServicesBinding
import com.greencircle.domain.model.ServiceItem
import com.greencircle.framework.ui.adapters.ServiceAdapter
import com.greencircle.framework.viewmodel.CompanyServicesViewModel

class CompanyServicesFragment : Fragment() {

    private var _binding: FragmentCompanyServicesBinding? = null

    private val binding get() = _binding!!
    private val adapter = ServiceAdapter()
    private lateinit var viewModel: CompanyServicesViewModel
    private lateinit var recyclerView: RecyclerView

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewModel = ViewModelProvider(this)[CompanyServicesViewModel::class.java]

        _binding = FragmentCompanyServicesBinding.inflate(inflater, container, false)
        val root: View = binding.root

        // Inicializar fragmentos
        val companyServicesFragment = CompanyServicesFragment()

        initializeComponents(root)

        // TODO: viewModel.getServicesList()
        val data = viewModel.getMockServicesList()
        setUpRecyclerView(data.results)
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun initializeComponents(root: View) {
        recyclerView = root.findViewById(R.id.RVServices)
    }

    private fun setUpRecyclerView(dataForList: ArrayList<ServiceItem>) {
        adapter.ServiceAdapter(dataForList, requireContext())
        recyclerView.adapter = adapter
    }
}