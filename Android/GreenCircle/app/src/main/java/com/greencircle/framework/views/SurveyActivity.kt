package com.greencircle.framework.views

import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import com.greencircle.databinding.ActivitySurveyBinding
import com.greencircle.domain.model.Survey.Question
import com.greencircle.framework.ui.adapters.QuestionsAdapter
import com.greencircle.framework.ui.adapters.viewholders.QuestionsViewHolder
import com.greencircle.framework.viewmodel.SurveyViewModel

class SurveyActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySurveyBinding
    private val adapter: QuestionsAdapter = QuestionsAdapter()
    private lateinit var data: ArrayList<Question>
    private val viewModel: SurveyViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initializeBinding()
        initializeObservers()
        viewModel.getQuestionList()
    }

    private fun initializeObservers() {
        viewModel.surveyLiveData.observe(this) { survey ->
            binding.SurveyTitle.text = survey.title
            setUpRecyclerView(survey.questions)
        }
    }

    private fun initializeBinding() {
        binding = ActivitySurveyBinding.inflate(layoutInflater)
        binding.BtnSubmit.setOnClickListener { button ->
            var container = binding.RVQuestions
            var count = container.childCount
            val answers = ArrayList<String>()
            for (i in 0 until count) {
                val childView: View = binding.RVQuestions.getChildAt(i)
                val viewHolder: QuestionsViewHolder =
                    binding.RVQuestions.getChildViewHolder(childView) as QuestionsViewHolder
                answers.add(viewHolder.answer)
                // do something with your child element
            }
            // show answers in snakbar
            Snackbar.make(button, answers.toString(), Snackbar.LENGTH_LONG).show()
        }
        setContentView(binding.root)
    }

    private fun setUpRecyclerView(dataForList: ArrayList<Question>) {
        binding.RVQuestions.setHasFixedSize(true)
        val linearLayoutManager = LinearLayoutManager(
            this,
            LinearLayoutManager.VERTICAL,
            false,
        )
        binding.RVQuestions.layoutManager = linearLayoutManager
        adapter.QuestionsAdapter(dataForList, this)
        binding.RVQuestions.adapter = adapter
    }
}
