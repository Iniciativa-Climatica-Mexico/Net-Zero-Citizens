import { fetchSurveyReport, QuestionReport, tabulatedAns } from '@/api/report'
import ScaleChart from './components/ScaleChart'

type SurveyReportProps = {
  params: {
    surveyId: string
  }
}

export default async function SurveyReport(props: SurveyReportProps) {
  try {
    const surveyId = props.params.surveyId
    const surveyReport = await fetchSurveyReport(surveyId)

    return (
      <div>
        SurveyReport
        {[
          surveyReport.questions.map((question, index) => {
            const labels = question.answers?.map((answer) => answer.label)
            const data = question.answers?.map((answer) => answer.count)
            return (
              <div>
                <QuestionComponent key={index} {...question} />
                <div className="w-1/2">
                  {question.questionType != 'open' && (
                    <ScaleChart
                      {...{
                        title: question.questionText,
                        labels,
                        data,
                      }}
                    />
                  )}
                </div>
              </div>
            )
          }),
        ]}
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

function QuestionComponent(props: QuestionReport) {
  return (
    <div className="text-txt bg-background">
      <h3 className="text-primary font-extrabold">{props.questionText}</h3>
      <p className="pl-10">Tipo: {props.questionType}</p>
      {props.questionType == 'open' &&
        props.answers?.map((answer, index) => {
          return <AnswerComponent key={index} {...answer} />
        })}
    </div>
  )
}

function AnswerComponent(props: tabulatedAns) {
  return (
    <div>
      <h3>{props.label}</h3>
      <p>{props.count}</p>
    </div>
  )
}
