package com.greencircle.framework.ui.adapters.ViewHolder

import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R

class EcoInfoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    val imageView: ImageView = itemView.findViewById(R.id.postImageView)
    val descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
    val linkToPost: TextView = itemView.findViewById(R.id.linkToPost)
}