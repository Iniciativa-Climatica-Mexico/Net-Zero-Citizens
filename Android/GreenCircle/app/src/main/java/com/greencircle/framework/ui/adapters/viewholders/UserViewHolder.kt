package com.greencircle.framework.adapters.viewholders

import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.User

class UserViewHolder(private var binding: FragmentProfileBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(item: User) {
        val name = item.firstName + " " + item.lastName
        binding.username.text = name
        // binding.profileImage.setImageResource(item.profilePicture)
    }
}