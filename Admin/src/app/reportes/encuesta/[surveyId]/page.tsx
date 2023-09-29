'use client'

import { SurveyReport, fetchSurveyReport } from '@/api/v1/report'
import { QuestionChartContainer } from './components/QuestionChartContainer'
import { useEffect, useState, useRef } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import SurveyReportPDF from '@/components/SurveyReportPDF'

type SurveyReportProps = {
  params: {
    surveyId: string
  }
}

export default function SurveyReportComponent(props: SurveyReportProps) {
  const chartRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

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
        <div className="mt-4">
          <PDFDownloadLink
            document={
              <SurveyReportPDF
                surveyReport={surveyReport}
                chartImage={capturedImage}
              />
            }
            fileName="surveyReport.pdf"
          >
            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
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
