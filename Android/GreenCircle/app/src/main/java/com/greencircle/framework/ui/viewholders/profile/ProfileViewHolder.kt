package com.greencircle.framework.ui.viewholders.profile

import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.profile.Profile

class ProfileViewHolder(private var binding: FragmentProfileBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(item: Profile) {
        val name = item.firstName + " " + item.lastName
        binding.username.text = name
        // binding.profileImage.setImageResource(item.profilePicture)
    }
}