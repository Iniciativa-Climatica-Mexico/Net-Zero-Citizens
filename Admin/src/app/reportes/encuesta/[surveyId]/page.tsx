import { apiV1Url } from '@/utils/constants'

type SurveyReportProps = {
  params: {
    surveyId: string
  }
}

async function fetchSurveyReport(surveyId: string) {
  const res = await fetch(`${apiV1Url}/report/survey/${surveyId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch survey report')
  }

  const json = await res.json()
  return json as SurveyReport
}

type Answer = {
  answerText: string | null
  scaleValue: number | null
}

type QuestionOption = {
  textOption: string
}

type Question = {
  questionText: string
  questionType: string
  questionOptions: QuestionOption[]
  answers: Answer[]
}

type SurveyReport = {
  surveyId: string
  title: string
  description: string
  startDate: string
  endDate: string | null
  questions: Question[]
}

export default async function SurveyReport(props: SurveyReportProps) {
  try {
    const surveyId = props.params.surveyId
    const surveyReport = await fetchSurveyReport(surveyId)
    console.log(surveyReport)
    return (
      <div>
        SurveyReport
        {[
          surveyReport.questions.map((question, index) => {
            return (
              <Question
                key={index}
                questionText={question.questionText}
                questionType={question.questionType}
                questionOptions={question.questionOptions}
                answers={question.answers}
              />
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

function Question(props: Question) {
  return (
    <div className="text-txt bg-background">
      <h3 className="text-primary font-extrabold">{props.questionText}</h3>
      <p className="pl-10">Tipo: {props.questionType}</p>

      {props.questionOptions?.length > 0 && (
        <h4 className="text-primary">OPTIONS</h4>
      )}
      {props.questionOptions?.map((option, index) => {
        return <QuestionOption key={index} {...option} />
      })}
      {props.answers?.length > 0 && <h4 className="text-primary">ANSWERS ({props.answers.length})</h4>}
      {props.answers?.map((answer, index) => {
        return <Answer key={index} {...answer} />
      })}
    </div>
  )
}

function QuestionOption(questionOption: QuestionOption) {
  return <p className="pl-10"> {questionOption.textOption}</p>
}

function Answer(props: Answer) {
  return (
    <div>
      <h3>{props.answerText}</h3>
      <p>{props.scaleValue}</p>
    </div>
  )
}
