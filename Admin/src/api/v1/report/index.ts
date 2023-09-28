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

export async function jsonToCsv(items: Record<string, any>[]): Promise<string> 
{
  const header = Object.keys(items[0]);
  const headerString = header.join(',');

  // handle null or undefined values here
  const replacer = (key: string, value: any) => (value !== null && value !== undefined ? value : '');

  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join('\r\n');

  return csv;
}