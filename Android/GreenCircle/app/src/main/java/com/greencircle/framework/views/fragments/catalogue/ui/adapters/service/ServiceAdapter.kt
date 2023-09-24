package com.greencircle.framework.views.fragments.catalogue.ui.adapters.service

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemServiceBinding
import com.greencircle.domain.model.service.ServiceItem
import com.greencircle.framework.views.fragments.catalogue.ui.viewholders.service.ServiceViewHolder

class ServiceAdapter : RecyclerView.Adapter<ServiceViewHolder>() {

    lateinit var context: Context
    var data: ArrayList<ServiceItem> = ArrayList()

    /*
    * Inicializa el adaptador con los datos que se le pasan por parámetro
     */
    fun initServiceAdapter(basicData: ArrayList<ServiceItem>, context: Context) {
        this.data = basicData
        this.context = context
    }

    /*
    * Se encarga de bindear los datos de cada item de la lista
     */
    override fun onBindViewHolder(holder: ServiceViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item, context)
    }

    /*
    * Se encarga de inflar el layout de cada item de la lista
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ServiceViewHolder {
        val binding = ItemServiceBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ServiceViewHolder(binding)
    }

    /*
    * Devuelve el número de items de la lista
     */
    override fun getItemCount(): Int {
        return data.size
    }
}