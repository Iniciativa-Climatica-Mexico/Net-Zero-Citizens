import { fetchSurveyReport, Question, QuestionOption, Answer } from '@/api/report'


type SurveyReportProps = {
  params: {
    surveyId: string
  }
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
      {props.answers?.length > 0 && (
        <h4 className="text-primary">ANSWERS ({props.answers.length})</h4>
      )}
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
