import { Survey, fetchAllSurveys } from '@/api/survey'

export default async function ListSurveys() {
  try {
    const response = await fetchAllSurveys()
    const surveysList = response.rows
    return (
      <div>
        ListSurveys
        {[
          surveysList.map((survey, index) => {
            return (
              <div>
                <SurveyComponent key={index} {...survey} />
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

function SurveyComponent(props: Survey) {
  return (
    <a className="text-txt bg-background" href="">
      <h3 className="text-primary font-extrabold">{props.title}</h3>
      <p className="pl-10">Descripción: {props.description}</p>
      <p className="pl-10">Fecha de inicio: {props.startDate.toString()}</p>
      <p className="pl-10">Fecha de cierre: {props.endDate?.toString()}</p>
    </a>
  )
}
