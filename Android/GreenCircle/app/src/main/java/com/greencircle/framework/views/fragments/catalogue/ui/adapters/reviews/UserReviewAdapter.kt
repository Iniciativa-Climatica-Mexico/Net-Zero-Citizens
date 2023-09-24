package com.greencircle.framework.views.fragments.catalogue.ui.adapters.reviews

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemUserReviewBinding
import com.greencircle.domain.model.reviews.UserReview
import com.greencircle.framework.views.fragments.catalogue.ui.viewholders.reviews.UserReviewViewHolder

class UserReviewAdapter : RecyclerView.Adapter<UserReviewViewHolder>() {
    var data: ArrayList<UserReview> = ArrayList()
    lateinit var context: Context

    fun UserReviewAdapter(basicData: ArrayList<UserReview>, context: Context) {
        this.data = basicData
        this.context = context
    }

    override fun onBindViewHolder(holder: UserReviewViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item, context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserReviewViewHolder {
        val binding =
            ItemUserReviewBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UserReviewViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}