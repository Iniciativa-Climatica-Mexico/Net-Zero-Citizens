package com.greencircle.framework.adapters.viewholders

import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentEditProfileBinding
import com.greencircle.domain.model.User

class EditUserViewHolder(private var binding: FragmentEditProfileBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(item: User) {
        val name = item.firstName + " " + item.lastName
        binding.username.text = name
        // binding.profileImage.setImageResource(item.profilePicture)
    }
}