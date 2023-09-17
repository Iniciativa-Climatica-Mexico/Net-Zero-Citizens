package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import android.graphics.Color
import android.text.SpannableString
import android.text.TextWatcher
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.inputmethod.InputMethodManager
import android.widget.RadioButton
import android.widget.RadioGroup
import androidx.core.content.ContextCompat.getSystemService
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemMultipleChoiceAnswerFieldBinding
import com.greencircle.databinding.ItemMultipleChoiceAnswerOptionBinding
import com.greencircle.databinding.ItemOpenAnswerFieldBinding
import com.greencircle.databinding.ItemQuestionBinding
import com.greencircle.databinding.ItemScaleAnswerFieldBinding
import com.greencircle.domain.model.Survey.Question
import com.greencircle.domain.model.Survey.QuestionType

class QuestionsViewHolder(private val binding: ItemQuestionBinding, private val parent: ViewGroup) :
    RecyclerView.ViewHolder(binding.root) {
    var answer: String = ""
    fun bind(item: Question, context: Context) {
        // if is required make (*) red
        if (item.isRequired) {
            var requiredText = " *"
            var text = item.questionText + requiredText
            val span = SpannableString(text)
            span.setSpan(
                ForegroundColorSpan(Color.RED),
                text.length - requiredText.length,
                text.length,
                0,
            )
            binding.QuestionText.text = span
        } else {
            binding.QuestionText.text = item.questionText
        }
        var changeRadioGroupListener = { radioGroup: RadioGroup, checkedId: Int ->
            answer = radioGroup.findViewById<RadioButton>(checkedId).text.toString()
            // close keyboard and clear focus
            val view: View? = parent.findFocus()

            if (view != null) {
                // on below line we are creating a variable
                // for input manager and initializing it.
                // displaying toast message on below line.
                view?.clearFocus()
                val manager = getSystemService(context, InputMethodManager::class.java)!!
                manager.hideSoftInputFromWindow(view.windowToken, 0)
            }
            // close keyboard
        }

        when (item.questionType) {
            QuestionType.open -> {
                val answerFieldBinding =
                    ItemOpenAnswerFieldBinding.inflate(LayoutInflater.from(context))
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
                answerFieldBinding.AnswerField.addTextChangedListener(object : TextWatcher {
                    override fun beforeTextChanged(
                        s: CharSequence?,
                        start: Int,
                        count: Int,
                        after: Int,
                    ) {
                    }

                    override fun onTextChanged(
                        s: CharSequence?,
                        start: Int,
                        before: Int,
                        count: Int,
                    ) {
                        answer = s.toString()
                    }

                    override fun afterTextChanged(s: android.text.Editable?) {}
                })
            }

            QuestionType.scale -> {
                val answerFieldBinding =
                    ItemScaleAnswerFieldBinding.inflate(LayoutInflater.from(context))
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
                answerFieldBinding.AnswerField.setOnCheckedChangeListener(changeRadioGroupListener)
            }

            QuestionType.multiple_choice -> {
                val answerFieldBinding =
                    ItemMultipleChoiceAnswerFieldBinding.inflate(LayoutInflater.from(context))
                item.questionOptions.forEach { option ->
                    val optionBinding =
                        ItemMultipleChoiceAnswerOptionBinding.inflate(LayoutInflater.from(context))
                    optionBinding.root.id = View.generateViewId()
                    optionBinding.questionOption.text = option.textOption
                    answerFieldBinding.AnswerField.addView(optionBinding.root)
                    optionBinding.root.layoutParams.width = MATCH_PARENT
                    val divider = View(context)
                    answerFieldBinding.AnswerField.addView(divider)
                    divider.layoutParams.height =
                        (10.0 * context.resources.displayMetrics.density).toInt()
                }
                answerFieldBinding.AnswerField.setOnCheckedChangeListener(changeRadioGroupListener)
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
            }
        }
    }
}
