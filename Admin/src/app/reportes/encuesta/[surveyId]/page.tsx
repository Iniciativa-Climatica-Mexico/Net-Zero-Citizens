import { fetchSurveyReport } from '@/api/report'
import { QuestionChartContainer } from './components/QuestionChartContainer'

type SurveyReportProps = {
  params: {
    surveyId: string
  }
}

export default async function SurveyReportComponent(props: SurveyReportProps) {
  try {
    const surveyId = props.params.surveyId
    const surveyReport = await fetchSurveyReport(surveyId)
    return <QuestionChartContainer {...surveyReport} />
  } catch (e: unknown) {
    if (e instanceof Error) {
      return <div>{e.message}</div>
    } else {
      return <div>Unknown error</div>
    }
  }
}
