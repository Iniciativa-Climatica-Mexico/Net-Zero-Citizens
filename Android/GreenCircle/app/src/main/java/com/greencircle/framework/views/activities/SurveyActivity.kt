package com.greencircle.framework.views.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.greencircle.R
import com.greencircle.databinding.ActivitySurveyBinding
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.survey.SurveyViewModel
import com.greencircle.framework.views.fragments.survey.QuestionFragment
import java.util.UUID

class SurveyActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySurveyBinding
    private lateinit var recoverUserSession: RecoverUserSessionRequirement
    private val viewModel: SurveyViewModel by viewModels {
        ViewModelFactory(applicationContext, SurveyViewModel::class.java)
    }
    private val fragmentManager = supportFragmentManager

    private var currentProgress = 0
    private var totalQuestions = 0
    lateinit var userId: UUID
    private val answeredQuestions = mutableSetOf<UUID>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initializeBinding()
        initializeObservers()

        recoverUserSession = RecoverUserSessionRequirement(this)
        val userSession = recoverUserSession()
        userId = userSession.uuid
        viewModel.getSurveyPending(userId)
        updateProgressBar()
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
                    MaterialAlertDialogBuilder(this).setTitle("Faltan preguntas")
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
            viewModel.submitAnswers(userId)
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
        totalQuestions = questions.size
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

    fun onQuestionAnswered(questionId: UUID, answer: String) {
        if (!answeredQuestions.contains(questionId)) {
            viewModel.onQuestionAnswered(questionId, answer)
            answeredQuestions.add(questionId)
            currentProgress++
            updateProgressBar()
        }
    }

    private fun goToMain() {
        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }

    private fun updateProgressBar() {
        val progress = (currentProgress.toFloat() / totalQuestions.toFloat() * 100).toInt()
        binding.progressBar.progress = progress
    }
}
