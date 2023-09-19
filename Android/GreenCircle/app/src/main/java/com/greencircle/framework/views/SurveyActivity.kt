package com.greencircle.framework.views

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.greencircle.R
import com.greencircle.databinding.ActivitySurveyBinding
import com.greencircle.domain.model.survey.Question
import com.greencircle.framework.viewmodel.SurveyViewModel
import com.greencircle.framework.views.fragments.survey.QuestionFragment

class SurveyActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySurveyBinding
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
            Log.i("Salida", survey.toString())
            binding.SurveyTitle.text = survey.title
            loadQuestions(survey.questions)
        }
        viewModel.submitStatusLiveData.observe(this) { status ->
            when (status) {
                SurveyViewModel.SubmitStatus.success -> {
                    MaterialAlertDialogBuilder(this).setTitle("¡Gracias por responder!")
                        .setMessage("Tus respuestas han sido enviadas.").setCancelable(false)
                        .setPositiveButton("Aceptar") { _, _ -> goToMain() }.show()
                }

                SurveyViewModel.SubmitStatus.validationError -> {
                    MaterialAlertDialogBuilder(this)
                        .setTitle("Faltan preguntas")
                        .setMessage(
                            "No puedes enviar sin antes haber " +
                                "termiandode llenar todas las preguntas obligatorias.",
                        ).setCancelable(false).setPositiveButton("Seguir") { _, _ -> }.show()
                }

                SurveyViewModel.SubmitStatus.error -> {
                    MaterialAlertDialogBuilder(this).setTitle("Error")
                        .setMessage("No se pudieron enviar tus respuestas. Inténtalo más tarde.")
                        .setCancelable(false).setPositiveButton("Aceptar") { _, _ -> goToMain() }
                        .show()
                }
            }
        }
    }

    private fun initializeBinding() {
        binding = ActivitySurveyBinding.inflate(layoutInflater)
        binding.BtnSubmit.setOnClickListener {
            Log.i("Salida", viewModel.surveyLiveData.value.toString())
            viewModel.submitAnswers()
        }
        binding.topAppBar.setOnClickListener {
            MaterialAlertDialogBuilder(this).setTitle("¿Quieres dejar de responder?")
                .setMessage("Los cambios realizados no se guardarán.").setCancelable(false)
                .setPositiveButton("Salir") { _, _ ->
                    goToMain()
                }.setNegativeButton("Sigue editando") { _, _ -> }.show()
        }
        setContentView(binding.root)
    }

    private fun loadQuestions(questions: ArrayList<Question>) {
        val fragmentTransaction = fragmentManager.beginTransaction()
        questions.forEach { question ->
            val questionFragment = QuestionFragment()
            val args = Bundle()
            args.putSerializable("question", question)
            questionFragment.arguments = args
            fragmentTransaction.add(R.id.QuestionContainer, questionFragment)
        }
        fragmentTransaction.commit()
    }

    fun onQuestionAnswered(questionId: String, answer: String) {
        viewModel.onQuestionAnswered(questionId, answer)
    }

    private fun goToMain() {
        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
