package com.greencircle.framework.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemServiceBinding
import com.greencircle.domain.model.ServiceItem
import com.greencircle.framework.ui.adapters.viewholders.ServiceViewHolder

class ServiceAdapter : RecyclerView.Adapter<ServiceViewHolder>() {

    lateinit var context: Context
    var data: ArrayList<ServiceItem> = ArrayList()

    @SuppressLint("NotConstructor")
    fun ServiceAdapter(basicData: ArrayList<ServiceItem>, context: Context) {
        this.data = basicData
        this.context = context
    }

    override fun onBindViewHolder(holder: ServiceViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item, context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ServiceViewHolder {
        val binding = ItemServiceBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ServiceViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}