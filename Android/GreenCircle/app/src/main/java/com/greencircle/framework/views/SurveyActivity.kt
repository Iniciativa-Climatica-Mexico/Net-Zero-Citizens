package com.greencircle.framework.views

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.BaseTransientBottomBar.LENGTH_LONG
import com.google.android.material.snackbar.Snackbar
import com.greencircle.R
import com.greencircle.databinding.ActivitySurveyBinding
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.framework.viewmodel.SurveyViewModel
import com.greencircle.framework.views.fragments.survey.QuestionFragment

class SurveyActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySurveyBinding
    private lateinit var data: Map<String, Question>
    private val viewModel: SurveyViewModel by viewModels()
    private val fragmentManager = supportFragmentManager
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initializeBinding()
        initializeObservers()
        viewModel.getSurveyPending()
    }

    private fun initializeObservers() {
        viewModel.surveyLiveData.observe(this) { survey ->
            if (survey == null) {
                goToMain()
                return@observe
            }
            binding.SurveyTitle.text = survey.title
            loadQuestions(survey.questions)
        }
    }

    private fun initializeBinding() {
        binding = ActivitySurveyBinding.inflate(layoutInflater)
        binding.BtnSubmit.setOnClickListener {
            Snackbar.make(
                binding.root,
                getAnswers().map { ans ->
                    "ID:${ans.questionId}, ${ans.answerText ?: ans.scaleValue}"
                }.joinToString(separator = ";"),
                LENGTH_LONG,
            ).show()
        }

        binding.topAppBar.setOnClickListener {
            MaterialAlertDialogBuilder(this).setTitle("¿Quieres dejar de responder?")
                .setMessage("Los cambios realizados no se guardarán.")
                .setPositiveButton("Salir") { _, _ ->
                    goToMain()
                }.setNegativeButton("Sigue editando") { _, _ -> }.show()
        }
        setContentView(binding.root)
    }

    private fun loadQuestions(questions: ArrayList<Question>) {
        data = questions.associateBy { it.questionId }
        val fragmentTransaction = fragmentManager.beginTransaction()
        Log.i("SurveyActivity", data.toString())
        data.forEach { questionId, question ->
            val questionFragment = QuestionFragment()
            val args = Bundle()
            args.putSerializable("question", question)
            questionFragment.arguments = args
            fragmentTransaction.add(R.id.QuestionContainer, questionFragment)
        }
        fragmentTransaction.commit()
    }

    private fun getAnswers(): List<Answer> {
        return data.map { (_, question) ->
            question.answer ?: Answer(null, null, question.questionId)
        }
    }

    fun onQuestionAnswered(questionId: String, answer: String) {
        val question = data.get(questionId) ?: throw Error("Question not found")
        when (question.questionType) {
            QuestionType.scale -> {
                val scaleValue = answer.toInt()
                question.answer = Answer(scaleValue, null, questionId)
            }

            else -> {
                question.answer = Answer(null, answer, questionId)
            }
        }
    }

    private fun goToMain() {
        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
