'use client'

import { SurveyReport, fetchSurveyReport } from '@/api/v1/report'
import { QuestionChartContainer } from './components/QuestionChartContainer'
import { useEffect, useState } from 'react'

type SurveyReportProps = {
  params: {
    surveyId: string
  }
}

export default function SurveyReportComponent(props: SurveyReportProps) {
  try {
    const surveyId = props.params.surveyId
    // const surveyReport = await fetchSurveyReport(surveyId)

    const [surveyReport, setSurveyReport] = useState<SurveyReport | null>(null)

    useEffect(() => {
      fetchSurveyReport(surveyId).then((report) => setSurveyReport(report))
    }, [surveyId])

    if (surveyReport === null) {
      return <div>Loading...</div>
    }
    return <QuestionChartContainer {...surveyReport} />
  } catch (e: unknown) {
    if (e instanceof Error) {
      return <div>{e.message}</div>
    } else {
      return <div>Unknown error</div>
    }
  }
}
