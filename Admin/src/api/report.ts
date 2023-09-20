import { apiV1Url } from '@/utils/constants'


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
  questionType: 'open' | 'scale' | 'multiple_choice'
  answers: tabulatedAns[]
}

export type tabulatedAns = { label: string; count: number }

export async function fetchSurveyReport(surveyId: string) {
  const res = await fetch(`${apiV1Url}/report/survey/${surveyId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch survey report')
  }

  const json = await res.json()
  return json as SurveyReport
}
