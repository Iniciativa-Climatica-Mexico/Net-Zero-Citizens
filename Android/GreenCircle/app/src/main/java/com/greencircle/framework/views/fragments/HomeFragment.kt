package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.framework.ui.adapters.EcoInfoAdapter
import com.greencircle.framework.viewmodel.EcoInfoViewModel

class HomeFragment : Fragment() {
    private lateinit var viewModel: EcoInfoViewModel
    private lateinit var recyclerView: RecyclerView

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater
            .inflate(R.layout.fragment_home, container, false)

        viewModel = ViewModelProvider(this)[EcoInfoViewModel::class.java]

        recyclerView = view.findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(context)

        viewModel.ecoInfos.observe(viewLifecycleOwner, { ecoInfoList ->
            recyclerView.adapter = EcoInfoAdapter(ecoInfoList)
        })

        viewModel.fetchEcoInfos()
        return view
    }
}