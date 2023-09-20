import { fetchSurveyById, QuestionDetail } from '@/api/survey'
import Link from 'next/link'
import CloseButtonComponent from './components/CloseButtonComponent'

type DetailedSurveyProps = {
  params: {
    surveyId: string
    title: string
    description: string
  }
}

export default async function DetailedSurvey(props: DetailedSurveyProps) {
  try {
    const surveyId = props.params.surveyId
    const surveyDetail = await fetchSurveyById(surveyId)

    return (
      <div>
        <div className="flex flex-row items-center  my-8 mx-8">
          <h1 className="self-start font-extrabold mt-8 mx-8 text-4xl text-txt">
            {surveyDetail.title}
          </h1>
          
        </div>
        <div className="flex mx-8 justify-between">
          <p className="self-start mb-8 mx-8 text-secondary">
            {surveyDetail.description}
          </p>
          <div className='flex gap-4'>
            {surveyDetail.endDate == null && (
              <CloseButtonComponent surveyId={surveyId} />
            )}

            <Link href={'/reportes/encuesta/' + surveyId}>
              <button className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 rounded self-end">
                Generar Reporte
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center w-full justify-center">
          <table className="table-fixed border-collapse w-4/5">
            <thead className="">
              <tr className="text-txt font-bold">
                <th scope="col" className="py-8 border-b border-gray-700">
                  Pregunta
                </th>
                <th scope="col" className="py-8 border-b border-gray-700">
                  Tipo de Respuesta
                </th>
                <th scope="col" className="py-8 border-b border-gray-700">
                  Tipo de Pregunta
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                surveyDetail.questions.map((question, index) => {
                  return <QuestionComponent key={index} {...question} />
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

function QuestionComponent(props: QuestionDetail) {
  return (
    <tr className="border-b border-gray-300">
      <td className="text-center py-8 px-8 truncate text-txt">
        {props.questionText}
      </td>
      <td className="text-center truncate py-8 px-8 text-txt ">
        {props.questionType}
      </td>
      <td className="text-center truncate py-8 px-8 text-txt ">
        {props.isRequired ? (
          <button className="bg-primary text-white py-2 px-4 w-[8rem] rounded cursor-default">
            Obligatorio
          </button>
        ) : (
          <button className="text-primary py-2 px-4 w-[8rem] rounded cursor-default border-primary border-2">
            Opcional
          </button>
        )}
      </td>
    </tr>
  )
}
