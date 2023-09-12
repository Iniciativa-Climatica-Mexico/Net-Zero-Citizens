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
    return tabulateOpenQuestion(question)
  }

  let labels: string[]
  if (question.questionType == 'scale') {
    labels = ['5', '4', '3', '2', '1']
  } else {
    labels = question.questionOptions.map((option) => option.textOption)
  }

  return tabulateFromLabels(question.answers, labels)
}

function tabulateOpenQuestion(question: Question): tabulatedAns[] {
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
}

function tabulateFromLabels(
  answers: Answer[],
  labels: string[]
): tabulatedAns[] {
  const ans = labels.map((label) => ({ label, count: 0 }))

  answers.forEach((answ) => {
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
