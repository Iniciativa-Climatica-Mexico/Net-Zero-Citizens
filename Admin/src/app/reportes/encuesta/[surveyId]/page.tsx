'use client'

import { SurveyReport, fetchSurveyReport } from '@/api/v1/report'
import { QuestionChartContainer } from './components/QuestionChartContainer'
import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import SurveyPDFReport from '@/components/SurveyPDF'

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
        <QuestionChartContainer {...surveyReport} />

        <div>
          <PDFDownloadLink
            document={<SurveyPDFReport survey={surveyReport} />}
            fileName="reporte.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Descargar PDF'
            }
          </PDFDownloadLink>
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
