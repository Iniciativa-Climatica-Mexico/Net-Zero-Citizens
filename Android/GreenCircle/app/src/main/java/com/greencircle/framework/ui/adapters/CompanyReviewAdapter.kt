package com.greencircle.framework.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemCompanyReviewBinding
import com.greencircle.domain.model.CompanyReview
import com.greencircle.framework.ui.adapters.viewholders.CompanyReviewViewHolder

class CompanyReviewAdapter : RecyclerView.Adapter<CompanyReviewViewHolder>() {
    var data: ArrayList<CompanyReview> = ArrayList()
    lateinit var context: Context

    fun CompanyReviewAdapter(basicData: ArrayList<CompanyReview>, context: Context) {
        this.data = basicData
        this.context = context
    }

    override fun onBindViewHolder(holder: CompanyReviewViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item, context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CompanyReviewViewHolder {
        val binding =
            ItemCompanyReviewBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CompanyReviewViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }
}