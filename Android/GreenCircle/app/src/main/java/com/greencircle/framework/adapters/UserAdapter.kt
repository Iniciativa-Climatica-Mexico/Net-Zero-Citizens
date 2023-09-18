package com.greencircle.framework.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.FragmentProfileBinding
import com.greencircle.domain.model.User
import com.greencircle.framework.adapters.viewholders.UserViewHolder

class UserAdapter : RecyclerView.Adapter<UserViewHolder>() {
    var data: ArrayList<User> = ArrayList()

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding =
            FragmentProfileBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UserViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}