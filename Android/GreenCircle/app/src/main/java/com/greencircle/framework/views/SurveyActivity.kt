package com.greencircle.framework.views

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.greencircle.databinding.ActivitySurveyBinding
import com.greencircle.domain.model.Survey.Question
import com.greencircle.framework.ui.adapters.QuestionsAdapter
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
        this
    }

    private fun initializeObservers() {
        viewModel.surveyLiveData.observe(this) { survey ->
            setUpRecyclerView(survey.questions)
        }
    }

    private fun initializeBinding() {
        binding = ActivitySurveyBinding.inflate(layoutInflater)
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
