'use client'
import { Survey, fetchAllSurveys } from '@/api/v1/survey'
import moment from 'moment'
import { useEffect, useState } from 'react'
import 'moment/locale/es'

moment.locale('es')

export default function ListSurveys() {
  try {
    // const response = await fetchAllSurveys()
    const [response, setResponse] = useState({ rows: [] } as { rows: Survey[] })

    useEffect(() => {
      fetchAllSurveys().then((res) => setResponse(res || { rows: [] }))
    }, [])

    const surveysList = response.rows.sort((a, b) => {
      return moment(b.startDate).diff(moment(a.startDate))
    })
    return (
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between my-8">
          <h1 className="font-extrabold my-8 sm:ml-12 md:ml-32 text-4xl sm:text-3xl text-txt">
            Encuestas
          </h1>
          <a
            href="/encuestas/crear"
            className="flex items-center justify-center px-4 py-2 my-8 md:mr-32 sm:mr-12 text-white bg-primary-base rounded hover:bg-primary-dark text-center"
          >
            Crear Encuesta
          </a>
        </div>
        <div className="w-10/12 m-auto p-3 overflow-x-auto">
          <table className="border-collapse justify-center items-center w-full">
            <thead className="">
              <tr className="text-txt font-bold">
                <th
                  scope="col"
                  className="py-8 border-b w-[20%] border-gray-700"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="py-8 w-[40%] border-b border-gray-700"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="py-8 border-b border-gray-700 w-[20%]"
                >
                  Fecha de inicio
                </th>
                <th
                  scope="col"
                  className="py-8 border-b border-gray-700 w-[20%]"
                >
                  Fecha de cierre
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                surveysList.map((survey, index) => {
                  return <SurveyComponent key={index} {...survey} />
                }),
              ]}
            </tbody>
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
    <tr className="border-b border-gray-300">
      <td className="truncate cursor-pointer text-txt hover:text-primary-base hover:font-semibold">
        <a
          href={'/encuestas/' + props.surveyId}
          className="text-center py-8 px-8 "
        >
          {props.title}
        </a>
      </td>
      <td className="truncate py-8 px-8 text-txt">{props.description}</td>
      <td className="text-center truncate py-8 px-8 border-gray-300 text-txt ">
        {moment(props.startDate).format('DD MMMM YYYY')}
      </td>
      <td className="text-center truncate py-8 px-8 border-gray-300 text-txt ">
        {props.endDate
          ? moment(props.endDate).format('DD MMMM YYYY')
          : '---------'}
      </td>
    </tr>
  )
}
