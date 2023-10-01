package com.greencircle.framework.views.fragments.profile

import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentCompanyCatalogueBinding
import com.greencircle.framework.ui.adapters.catalogue.CatalogueAdapter
import com.greencircle.framework.viewmodel.catalogue.CatalogueViewModel

class FavouriteFragment: Fragment() {
    private lateinit var binding: FragmentCompanyCatalogueBinding
    private val adapter = CatalogueAdapter()
    private lateinit var viewModel: CatalogueViewModel

}