import { statusOk } from '@/utils/utils'
import { authAxios } from '../axios.config'

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

export async function fetchSurveyReport(
  surveyId: string
): Promise<SurveyReport | null> {
  const res = await authAxios().get(`/report/survey/${surveyId}`)

  if (!statusOk(res.status)) {
    console.error('Error fetching survey report')
    return null
  }

  return res.data as SurveyReport
}