import { apiV1Url } from '@/utils/constants'
import { Paginator } from '@/utils/utils'

export type Survey = {
  surveyId: string
  title: string
  description: string
  startDate: Date
  endDate: Date | null
}



export async function fetchAllSurveys() {
  const res = await fetch(`${apiV1Url}/survey`)

  if (!res.ok) {
    throw new Error('Failed to fetch all surveys')
  }

  const json = await res.json()
  return json as Paginator<Survey>
}
