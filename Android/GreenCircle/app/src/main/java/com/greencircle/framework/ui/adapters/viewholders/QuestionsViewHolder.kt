package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.inputmethod.InputMethodManager
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
    fun bind(item: Question, context: Context) {
        binding.QuestionText.text = item.questionText
        var clearFocusListener = { radioGroup: RadioGroup, checkedId: Int ->

            val view: View? = parent.findFocus()

            if (view != null) {
                // on below line we are creating a variable
                // for input manager and initializing it.
                val manager = getSystemService(context, InputMethodManager::class.java)!!
                manager.hideSoftInputFromWindow(view.windowToken, 0)

                // displaying toast message on below line.
                view.clearFocus()
            }
            // close keyboard
        }
        when (item.questionType) {
            QuestionType.open -> {
                val answerFieldBinding =
                    ItemOpenAnswerFieldBinding.inflate(LayoutInflater.from(context))
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
            }

            QuestionType.scale -> {
                val answerFieldBinding =
                    ItemScaleAnswerFieldBinding.inflate(LayoutInflater.from(context))
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
                answerFieldBinding.RadioContainer.setOnCheckedChangeListener(clearFocusListener)
            }

            QuestionType.multiple_choice -> {
                val answerFieldBinding =
                    ItemMultipleChoiceAnswerFieldBinding.inflate(LayoutInflater.from(context))
                item.questionOptions.forEach { option ->
                    val optionBinding =
                        ItemMultipleChoiceAnswerOptionBinding.inflate(LayoutInflater.from(context))
                    optionBinding.root.id = View.generateViewId()
                    optionBinding.questionOption.text = option.textOption
                    answerFieldBinding.RadioContainer.addView(optionBinding.root)
                    optionBinding.root.layoutParams.width = MATCH_PARENT
                    val divider = View(context)
                    answerFieldBinding.RadioContainer.addView(divider)
                    divider.layoutParams.height =
                        (10.0 * context.resources.displayMetrics.density).toInt()
                }
                answerFieldBinding.RadioContainer.setOnCheckedChangeListener(clearFocusListener)
                binding.AnswerFieldContainer.addView(answerFieldBinding.root)
            }
        }
    }
}
