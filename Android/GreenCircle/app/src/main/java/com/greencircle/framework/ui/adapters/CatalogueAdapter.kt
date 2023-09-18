package com.greencircle.framework.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.CardLayoutBinding
import com.greencircle.domain.model.CompanySummary
import com.greencircle.framework.ui.adapters.viewholders.CatalogueViewHolder

class CatalogueAdapter : RecyclerView.Adapter<CatalogueViewHolder>() {
    private var data: ArrayList<CompanySummary> = ArrayList()
    lateinit var context: Context

    fun initCustomAdapter(data: ArrayList<CompanySummary>, context: Context) {
        this.data = data
        this.context = context
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): CatalogueViewHolder {
        val v = CardLayoutBinding.inflate(
            LayoutInflater.from(viewGroup.context),
            viewGroup,
            false
        )
        return CatalogueViewHolder(v)
    }

    override fun onBindViewHolder(viewHolder: CatalogueViewHolder, position: Int) {
        val item = data[position]
        viewHolder.bind(item)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}
