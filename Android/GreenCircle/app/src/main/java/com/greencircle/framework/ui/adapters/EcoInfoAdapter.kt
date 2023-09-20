package com.greencircle.framework.ui.adapters

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.greencircle.R
import com.greencircle.domain.model.EcoInfo
import com.greencircle.framework.ui.adapters.ViewHolder.EcoInfoViewHolder

/**
 * Adaptador para la lista de EcoInfo
 * @constructor Crea un adaptador para la lista de EcoInfo
 * @property ecoInfoList Lista de EcoInfo
 * @since 1.0.0
 */
class EcoInfoAdapter(private val ecoInfoList: List<EcoInfo>) :
    RecyclerView.Adapter<EcoInfoViewHolder>() {

    /**
     * Obtiene el número de elementos de la lista
     * @return Número de elementos de la lista
     * @since 1.0.0
     */
    override fun getItemCount() = ecoInfoList.size

    /**
     * Se encarga de asignar los valores de cada EcoInfo a cada elemento de la lista
     * @param holder ViewHolder que contiene los elementos de la lista
     * @param position Posición del elemento en la lista
     * @return EcoInfoViewHolder con los valores asignados
     * @since 1.0.0
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EcoInfoViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(
            R.layout.card_layout_ecoinfo, parent, false
        )

        return EcoInfoViewHolder(itemView)
    }

    /**
     * Se encarga de asignar los valores de cada EcoInfo a cada elemento de la lista
     * @param holder ViewHolder que contiene los elementos de la lista
     * @param position Posición del elemento en la lista
     * @return EcoInfoViewHolder con los valores asignados
     * @since 1.0.0
     */
    override fun onBindViewHolder(holder: EcoInfoViewHolder, position: Int) {
        val currentItem = ecoInfoList[position]

        Glide.with(holder.itemView.context).load(currentItem.coverImageUrl).into(holder.imageView)

        holder.descriptionTextView.text = currentItem.description

        holder.linkToPost.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)

            intent.data = Uri.parse(currentItem.postUrl)
            holder.itemView.context.startActivities(arrayOf(intent))
        }
    }
}