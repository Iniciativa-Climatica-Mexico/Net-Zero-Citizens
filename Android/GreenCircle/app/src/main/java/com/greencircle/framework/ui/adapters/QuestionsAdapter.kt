package com.greencircle.framework.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemQuestionBinding
import com.greencircle.domain.model.Survey.Question
import com.greencircle.framework.ui.adapters.viewholders.QuestionsViewHolder

class QuestionsAdapter : RecyclerView.Adapter<QuestionsViewHolder>() {
    var data: ArrayList<Question> = ArrayList()
    lateinit var context: Context

    @SuppressLint("NotConstructor")
    fun QuestionsAdapter(basicData: ArrayList<Question>, context: Context) {
        this.data = basicData
        this.context = context
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): QuestionsViewHolder {
        val binding =
            ItemQuestionBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return QuestionsViewHolder(binding, parent)
    }

    override fun getItemCount(): Int {
        return data.size
    }

    override fun onBindViewHolder(holder: QuestionsViewHolder, position: Int) {
        val item = data[position]
        holder.bind(item, context)
    }
}
