import { apiV1Url } from '@/utils/constants'
import { Paginator } from '@/utils/utils'

export type Survey = {
  surveyId: string
  title: string
  description: string
  startDate: Date
  endDate: Date | null
  questions: DetailedSurvey[]
}

export type DetailedSurvey = {
  questionText: string
  questionType: string
  requiredQuestion: boolean
}

export async function fetchAllSurveys() {
  const res = await fetch(`${apiV1Url}/survey`)

  if (!res.ok) {
    throw new Error('Failed to fetch all surveys')
  }

  const json = await res.json()
  return json as Paginator<Survey>
}

export async function fetchSurveyById(surveyId: string) {
  const res = await fetch(`${apiV1Url}/survey/${surveyId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch survey')
  }

  const json = await res.json()
  return json as Survey
}

