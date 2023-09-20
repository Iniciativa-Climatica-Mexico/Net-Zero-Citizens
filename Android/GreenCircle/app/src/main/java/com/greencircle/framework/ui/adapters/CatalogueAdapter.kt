package com.greencircle.framework.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.CatalogueCardLayoutBinding
import com.greencircle.domain.model.CompanySummary
import com.greencircle.framework.ui.adapters.viewholders.CatalogueViewHolder

/**
 * This class is used to manage the company summary data
 */

class CatalogueAdapter : RecyclerView.Adapter<CatalogueViewHolder>() {
    private var data: ArrayList<CompanySummary> = ArrayList()
    lateinit var context: Context

    /**
     * This function is used to initialize the custom adapter
     * @param data: ArrayList of CompanySummary objects
     * @param context: Context of the application
     * */
    fun initCustomAdapter(data: ArrayList<CompanySummary>, context: Context) {
        this.data = data
        this.context = context
    }

    /**
     * This function is used to create the view holder
     * @param viewGroup: ViewGroup object
     * @param i: Integer value
     */

    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): CatalogueViewHolder {
        val v = CatalogueCardLayoutBinding.inflate(
            LayoutInflater.from(viewGroup.context),
            viewGroup,
            false
        )
        return CatalogueViewHolder(v)
    }

    /**
     * This function is used to bind the view holder
     * @param viewHolder: ViewHolder for the catalogue card layout
     * @param position: Integer value
     */
    override fun onBindViewHolder(viewHolder: CatalogueViewHolder, position: Int) {
        val item = data[position]
        viewHolder.bind(item)
    }

    /**
     * This function is used to get the item count
     * @return Integer value
     */
    override fun getItemCount(): Int {
        return data.size
    }
}
