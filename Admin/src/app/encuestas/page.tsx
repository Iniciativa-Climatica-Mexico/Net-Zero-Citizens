import { Survey, fetchAllSurveys } from '@/api/survey'

export default async function ListSurveys() {
  try {
    const response = await fetchAllSurveys()
    const surveysList = response.rows
    return (
      <div className="text-primary flex-col flex items-center w-full">
        <h1 className=" self-start font-extrabold my-8 mx-8 text-4xl text-zinc-800">Encuestas</h1>
        <table className="table-fixed border-collapse w-[100rem]">
          <thead className="">
            <tr className="text-primary font-bold">
              <th scope="col" className="py-8 border-b border-gray-700">
                Title
              </th>
              <th scope="col" className="py-8 w-1/3 border-b border-gray-700">
                Description
              </th>
              <th scope="col" className="py-8 border-b border-gray-700">
                Start Date
              </th>
              <th scope="col" className="py-8 border-b border-gray-700">
                End Date
              </th>
            </tr>
          </thead>
          {[
            surveysList.map((survey, index) => {
              return <SurveyComponent key={index} {...survey} />
            }),
          ]}
        </table>
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
    <tbody>
      <tr>
        <td className="text-center truncate py-8 border-b border-gray-300 text-zinc-800"><a href="">{props.title}</a></td>
        <td className="truncate border-b border-gray-300 text-zinc-800">{props.description}</td>
        <td className="text-center border-b border-gray-300 text-zinc-800">{props.startDate.toString()}</td>
        <td className="text-center border-b border-gray-300 text-zinc-800">
          {props.endDate ? props.endDate.toString() : '---------'}
        </td>
      </tr>
    </tbody>
    // <a className="text-txt bg-background" href="">
    //   <h3 className="text-primary font-extrabold">{props.title}</h3>
    //   <p className="pl-10">Descripción: {props.description}</p>
    //   <p className="pl-10">Fecha de inicio: {props.startDate.toString()}</p>
    //   <p className="pl-10">Fecha de cierre: {props.endDate?.toString()}</p>
    // </a>
  )
}
