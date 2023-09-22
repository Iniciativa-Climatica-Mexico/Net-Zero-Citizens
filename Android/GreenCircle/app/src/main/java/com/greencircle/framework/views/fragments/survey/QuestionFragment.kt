package com.greencircle.framework.views.fragments.survey

import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.text.SpannableStringBuilder
import android.text.TextWatcher
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import android.widget.RadioButton
import androidx.core.content.ContextCompat.getSystemService
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentQuestionBinding
import com.greencircle.databinding.ItemMultipleChoiceAnswerFieldBinding
import com.greencircle.databinding.ItemMultipleChoiceAnswerOptionBinding
import com.greencircle.databinding.ItemOpenAnswerFieldBinding
import com.greencircle.databinding.ItemScaleAnswerFieldBinding
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.framework.views.activities.SurveyActivity

class QuestionFragment : Fragment() {
    lateinit var question: Question
    private lateinit var answerField: AnswerField
    lateinit var binding: FragmentQuestionBinding
    lateinit var activity: SurveyActivity
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            val question = it.getSerializable("question") as Question
            this.question = question
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentQuestionBinding.inflate(inflater, container, false)
        // add red * at the end of title if question is required
        if (question.isRequired) {
            val span = SpannableStringBuilder(question.questionText + " *")
            span.setSpan(
                ForegroundColorSpan(Color.RED),
                span.length - 1,
                span.length,
                0
            )
            binding.QuestionText.text = span
        } else {
            binding.QuestionText.text = question.questionText
        }

        val callback = { answer: String ->
            this.activity.onQuestionAnswered(question.questionId, answer)
        }

        answerField = when (question.questionType) {
            QuestionType.OPEN -> OpenAnswerField(this, callback)
            QuestionType.SCALE -> ScaleAnswerField(this, callback)
            QuestionType.MULTIPLE_CHOISE -> MultipleChoiceAnswerField(this, callback)
        }
        return binding.root
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        if (context is SurveyActivity) {
            activity = context
        }
    }
}

abstract class AnswerField(parent: QuestionFragment, callback: (String) -> Unit) :
    View(parent.context) {
    abstract fun getAnswer(): String
}

class OpenAnswerField(parent: QuestionFragment, callback: (String) -> Unit) :
    AnswerField(parent, callback) {

    var binding: ItemOpenAnswerFieldBinding

    init {
        binding = ItemOpenAnswerFieldBinding.inflate(
            LayoutInflater.from(context),
            parent.binding.AnswerFieldContainer,
            true
        )
        binding.AnswerField.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(
                s: CharSequence?,
                start: Int,
                count: Int,
                after: Int
            ) {
            }

            override fun onTextChanged(
                s: CharSequence?,
                start: Int,
                before: Int,
                count: Int
            ) {
                callback(s.toString())
            }

            override fun afterTextChanged(s: android.text.Editable?) {}
        })
    }

    override fun getAnswer(): String {
        return binding.AnswerField.text.toString()
    }
}

class ScaleAnswerField(parent: QuestionFragment, callback: (String) -> Unit) :
    AnswerField(parent, callback) {
    var binding: ItemScaleAnswerFieldBinding

    init {
        binding = ItemScaleAnswerFieldBinding.inflate(
            LayoutInflater.from(context),
            parent.binding.AnswerFieldContainer,
            true
        )
        binding.AnswerField.setOnCheckedChangeListener { radioGroup, checkedId ->
            callback(
                radioGroup.findViewById<RadioButton>(checkedId).text.toString()
            )
            // close keyboard and clear focus
            val view: View? = parent.view?.rootView?.findFocus()
            if (view != null) {
                view.clearFocus()
                val manager = getSystemService(context, InputMethodManager::class.java)!!
                manager.hideSoftInputFromWindow(view.windowToken, 0)
            }
        }
    }

    override fun getAnswer(): String {
        val radioGroup = binding.AnswerField
        val checkedId = radioGroup.checkedRadioButtonId
        if (checkedId == -1) {
            return ""
        }
        return radioGroup.findViewById<RadioButton>(checkedId).text.toString()
    }
}

class MultipleChoiceAnswerField(parent: QuestionFragment, callback: (String) -> Unit) :
    AnswerField(parent, callback) {
    var binding: ItemMultipleChoiceAnswerFieldBinding

    init {
        binding = ItemMultipleChoiceAnswerFieldBinding.inflate(
            LayoutInflater.from(context),
            parent.binding.AnswerFieldContainer,
            true
        )
        parent.question.questionOptions.forEach { option ->
            ItemMultipleChoiceAnswerOptionBinding.inflate(
                LayoutInflater.from(context),
                binding.AnswerField,
                true
            ).apply {
                this.root.id = generateViewId()
                this.questionOption.text = option.textOption
            }
            val divider = View(context)
            binding.AnswerField.addView(divider)
            divider.layoutParams.height = (10.0 * context.resources.displayMetrics.density).toInt()
        }
        binding.AnswerField.setOnCheckedChangeListener { radioGroup, checkedId ->
            callback(
                radioGroup.findViewById<RadioButton>(checkedId).text.toString()
            )
            // close keyboard and clear focus
            val view: View? = parent.view?.rootView?.findFocus()
            if (view != null) {
                view.clearFocus()
                val manager = getSystemService(context, InputMethodManager::class.java)!!
                manager.hideSoftInputFromWindow(view.windowToken, 0)
            }
        }
    }

    override fun getAnswer(): String {
        val radioGroup = binding.AnswerField
        val checkedId = radioGroup.checkedRadioButtonId
        if (checkedId == -1) {
            return ""
        }
        return radioGroup.findViewById<RadioButton>(checkedId).text.toString()
    }
}
