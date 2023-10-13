package com.greencircle.framework.ui.viewholders.profile

import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentEditProfileBinding
import com.greencircle.domain.model.profile.Profile

class EditProfileViewHolder(private var binding: FragmentEditProfileBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(item: Profile) {
        val name = item.firstName + " " + item.lastName
        // binding.profileImage.setImageResource(item.profilePicture)
    }
}