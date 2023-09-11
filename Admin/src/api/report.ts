import { apiV1Url } from '@/utils/constants'

export type Answer = {
  answerText: string | null
  scaleValue: number | null
}

export type QuestionOption = {
  textOption: string
}

export type Question = {
  questionText: string
  questionType: string
  questionOptions: QuestionOption[]
  answers: Answer[]
}

export type SurveyReport = {
  surveyId: string
  title: string
  description: string
  startDate: string
  endDate: string | null
  questions: Question[]
}

export async function fetchSurveyReport(surveyId: string) {
  const res = await fetch(`${apiV1Url}/report/survey/${surveyId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch survey report')
  }

  const json = await res.json()
  return json as SurveyReport
}
