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
import com.greencircle.domain.model.survey.Survey
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.survey.SurveyViewModel
import com.greencircle.framework.views.fragments.survey.QuestionFragment
import java.util.UUID
import org.json.JSONObject

class SurveyActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySurveyBinding
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

        try {
            val sharedPreferences = getSharedPreferences("my_preferences", MODE_PRIVATE)
            val userJson = sharedPreferences?.getString("user_session", null)
            val userJSON = JSONObject(userJson!!)
            userId = UUID.fromString(userJSON.getString("uuid"))

            val survey = intent.getBundleExtra("survey")?.getSerializable("survey") as Survey
            Log.i("SURVEY", "Survey OBTENIDO: $survey")
            Log.i("Salida", survey.toString())
            binding.SurveyTitle.text = survey.title
            loadQuestions(survey.questions)

            updateProgressBar()
        } catch (e: Exception) {
            Log.e("SURVEY", e.toString())
            goToMain()
        }
    }

    private fun initializeObservers() {
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
        intent.putExtra("fromSurvey", true)
        startActivity(intent)
        finish()
    }

    private fun updateProgressBar() {
        val progress = (currentProgress.toFloat() / totalQuestions.toFloat() * 100).toInt()
        binding.progressBar.progress = progress
    }
}
