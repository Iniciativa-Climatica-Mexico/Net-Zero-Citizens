'use client'
import { Survey, fetchAllSurveys } from '@/api/survey'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function ListSurveys() {
  try {
    // const response = await fetchAllSurveys()
    const [response, setResponse] = useState({ rows: [] } as { rows: Survey[] })

    useEffect(() => {
      fetchAllSurveys().then((res) => setResponse(res))
    }, [])

    const surveysList = response.rows.sort((a, b) => {
      return moment(b.startDate).diff(moment(a.startDate))
    })
    return (
      <div>
        <div className="flex-row flex items-center justify-between my-8 mx-8">
          <h1 className="self-start font-extrabold my-8 mx-8 text-4xl text-txt">
            Encuestas
          </h1>
        </div>
        <div className="flex flex-col items-center w-full justify-center">
          <table className="table-fixed border-collapse w-4/5">
            <thead className="">
              <tr className="text-txt font-bold">
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
      <td className="truncate cursor-pointer  text-txt hover:text-primary-base hover:font-semibold">
        <a
          href={'/encuestas/' + props.surveyId}
          className="text-center py-8 px-8 "
        >
          {props.title}
        </a>
      </td>
      <td className="truncate py-8 px-8 border-gray-300 text-txt ">
        {props.description}
      </td>
      <td className="text-center truncate py-8 px-8 border-gray-300 text-txt ">
        {moment(props.startDate).format('MMM Do YYYY')}
      </td>
      <td className="text-center truncate py-8 px-8 border-gray-300 text-txt ">
        {props.endDate
          ? moment(props.endDate).format('MMM Do YYYY')
          : '---------'}
      </td>
    </tr>
  )
}
