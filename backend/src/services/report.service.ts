import { unwrap } from '../../test/utils'
import Answer from '../models/answer.model'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'
import Survey from '../models/survey.model'

export type SurveyReport = {
  surveyId: string
  title: string
  description: string
  startDate: Date
  endDate: Date | null
  questions: QuestionReport[]
}

export type QuestionReport = {
  questionText: string
  questionType: string
  answers: tabulatedAns[]
}

export type tabulatedAns = { label: string; count: number }

export const getSurveyReport = async (
  surveyId: string
): Promise<SurveyReport | null> => {
  const s = await Survey.findByPk(surveyId, {
    plain: true,
    include: [
      {
        model: Question,
        attributes: ['questionText', 'questionType'],
        include: [
          {
            model: QuestionOption,
            attributes: ['textOption'],
          },
          {
            model: Answer,
            attributes: ['answerText', 'scaleValue'],
          },
        ],
      },
    ],
  })

  if (!s) return s
  const ans: SurveyReport = {
    surveyId: s.surveyId,
    title: s.title,
    description: s.description,
    startDate: s.startDate,
    endDate: s.endDate,
    questions: s.questions.map((q) => ({
      questionText: q.questionText,
      questionType: q.questionType,
      answers: tabulateAnswers(q),
    })),
  }
  return ans
}

function tabulateAnswers(question: Question): tabulatedAns[] {
  if (question.questionType == 'open') {
    const tabulation = new Map<string, number>()
    question.answers.forEach((ans) => {
      const label = ans.answerText || ans.scaleValue?.toString()
      if (label) {
        const prev = tabulation.get(label)

        tabulation.set(label, (prev || 0) + 1)
      }
    })

    const ans: tabulatedAns[] = []

    for (const [label, count] of tabulation.entries()) {
      ans.push({ label, count })
    }
    return ans
  } else {
    const ans: tabulatedAns[] = []

    if (question.questionType == 'scale') {
      for (let i = 5; i >= 1; i--) {
        ans.push({ label: i.toString(), count: 0 })
      }
    } else {
      question.questionOptions.forEach((opt) => {
        ans.push({ label: opt.textOption, count: 0 })
      })
    }

    question.answers.forEach((answ) => {
      const label = answ.answerText || answ.scaleValue?.toString()
      if (label) {
        const opt = ans.find((opt) => opt.label == label)
        if (opt) {
          opt.count++
        }
      }
    })
    return ans
  }
}
