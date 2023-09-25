package com.greencircle.framework.ui.adapters.profile

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.profile.Profile
import com.greencircle.framework.ui.viewholders.profile.ProfileViewHolder

class ProfileAdapter : RecyclerView.Adapter<ProfileViewHolder>() {
    var data: ArrayList<Profile> = ArrayList()

    override fun onBindViewHolder(holder: ProfileViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProfileViewHolder {
        val binding =
            FragmentProfileBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ProfileViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}