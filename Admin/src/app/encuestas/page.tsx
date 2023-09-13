import { Survey, fetchAllSurveys } from '@/api/survey'
import Link from 'next/link'

export default async function ListSurveys() {
  try {
    const response = await fetchAllSurveys()
    const surveysList = response.rows
    return (
      <div>
        <div className="flex-row flex items-center justify-between my-8 mx-8">
          <h1 className="self-start font-extrabold my-8 mx-8 text-4xl text-zinc-800">
            Encuestas
          </h1>
          <Link href="/reportes/"><button className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-8 my-8 rounded self-end">
            Crear Encuesta
          </button></Link>
        </div>
        <div className="flex flex-col items-center w-full justify-center">
          <table className="table-fixed border-collapse w-4/5">
            <thead className="">
              <tr className="text-primary font-bold">
                <th
                  scope="col"
                  className="py-8 border-b w-[20%] border-gray-700"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="py-8 w-[40%] border-b border-gray-700"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-8 border-b border-gray-700 w-[20%]"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="py-8 border-b border-gray-700 w-[20%]"
                >
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
        <td className="text-center truncate py-8 px-8 border-b border-gray-300 text-zinc-800">
          <a href="">{props.title}</a>
        </td>
        <td className="truncate border-b py-8 px-8 border-gray-300 text-zinc-800">
          {props.description}
        </td>
        <td className="text-center truncate border-b py-8 px-8 border-gray-300 text-zinc-800">
          {props.startDate.toString()}
        </td>
        <td className="text-center border-b truncate py-8 px-8 border-gray-300 text-zinc-800">
          {props.endDate ? props.endDate.toString() : '---------'}
        </td>
      </tr>
    </tbody>
  )
}

function createSurvey() {

}

function viewDetailedSurvey() {

}
