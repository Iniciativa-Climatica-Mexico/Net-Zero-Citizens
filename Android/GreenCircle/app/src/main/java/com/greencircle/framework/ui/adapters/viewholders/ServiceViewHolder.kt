package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.databinding.ItemServiceBinding
import com.greencircle.domain.model.ServiceItem

class ServiceViewHolder(private val binding: ItemServiceBinding) :

    RecyclerView.ViewHolder(binding.root) {

    /*
    * Se encarga de bindear los datos de cada item de la lista
     */
    fun bind(item: ServiceItem, context: Context) {
        binding.TVSName.text = item.name
        binding.TVSDescription.text = item.description
        Glide.with(context).load(item.imgUrl).placeholder(R.drawable.ic_launcher_background)
            .error(R.drawable.ic_launcher_background).into(binding.IVSImage)
    }
}
