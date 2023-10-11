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

    return (
      <div>
        {/* Use Tailwind CSS classes to conditionally show content based on screen size */}
        <div className="hidden sm:block md:block lg:block xl:block">
          <QuestionChartContainer {...surveyReport} />
        </div>
        <div className="sm:hidden md:hidden lg:hidden xl:hidden">
          {/* Message for small and medium devices */}
          <p className="text-center mt-4">
            Para ver el reporte generado ingresa desde tu dispositivo de
            escritorio.
          </p>
        </div>
      </div>
    )
  } catch (e: unknown) {
    if (e instanceof Error) {
      return <div>{e.message}</div>
    } else {
      return <div>Unknown error</div>
    }
  }
}
