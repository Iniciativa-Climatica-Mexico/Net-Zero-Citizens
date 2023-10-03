import { Paginator, statusOk } from '@/utils/utils'
import { authAxios } from '../axios.config'

export type Survey = {
  surveyId: string
  title: string
  description: string
  startDate: Date
  endDate: Date | null
  questions: QuestionDetail[]
}

export type QuestionDetail = {
  questionText: string
  questionType: string
  isRequired: boolean
}

type CreateSurveyBody = {
  title: string
  description: string
  questions: Question[]
}

type Question = {
  id: number
  questionText: string
  questionType: string
  isRequired: boolean
  options?: string[]
}

export async function fetchAllSurveys() {
  const res = await authAxios().get('/survey')

  if (!statusOk(res.status)) {
    console.log('Failed to fetch surveys')
    return null
  }

  return res.data as Paginator<Survey>
}

export async function fetchSurveyById(surveyId: string) {
  const res = await authAxios().get(`/survey/${surveyId}`)

  if (!statusOk(res.status)) {
    console.error('Failed to fetch survey')
    return null
  }

  return res.data as Survey
}

export async function createSurvey(survey: CreateSurveyBody) {
  const res = await authAxios().post('/survey', survey)

  if (!statusOk(res.status)) {
    console.error('Failed to create survey')
    return null
  }

  return res.data as Survey
}
