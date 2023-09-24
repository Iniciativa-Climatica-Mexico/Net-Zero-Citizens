package com.greencircle.framework.views.fragments.catalogue.ui.viewholders.ecoinfo

import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R

/**
 * ViewHolder para el RecyclerView de EcoInfo
 * @constuctor Crea un ViewHolder para el RecyclerView de EcoInfo
 * @property imageView ImageView Imagen del post
 * @since 1.0.0
 */
class EcoInfoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    val imageView: ImageView = itemView.findViewById(R.id.postImageView)
    val descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
    val linkToPost: TextView = itemView.findViewById(R.id.linkToPost)
}