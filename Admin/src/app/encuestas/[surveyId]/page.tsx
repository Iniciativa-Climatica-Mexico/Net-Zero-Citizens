'use client'
import { fetchSurveyById, QuestionDetail, Survey } from '@/api/v1/survey'
import Link from 'next/link'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { authAxios } from '@/api/v1/axios.config'
import { Pill } from '@/components/pill/pill'

type DetailedSurveyProps = {
  params: {
    surveyId: string
    title: string
    description: string
  }
}

export default function DetailedSurvey(props: DetailedSurveyProps) {
  try {
    const surveyId = props.params.surveyId
    const [modalIsOpen, setIsOpen] = useState(false)
    const [surveyDetail, setSurveyDetail] = useState({} as Survey)
    const [isGeneratingReport, setIsGeneratingReport] = useState(false)

    useEffect(() => {
      fetchSurveyById(surveyId).then((res) =>
        res ? setSurveyDetail(res) : console.log(res)
      )
    }, [])

    const closeSurvey = async (surveyID: string) => {
      try {
        await authAxios().post(`/survey/${surveyID}/close`)
        window.location.href = '/encuestas'
      } catch (e) {
        console.log(e)
        setIsOpen(false)
      }
    }

    return (
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 mx-8">
          <div>
            <Link href={'/encuestas/'}>
              <button
                className="flex items-center justify-center text-primary-base font-bold py-2 px-4 rounded self-end md:mr-32 sm:mr-12"
              >
                ←  Regresar
              </button>
            </Link>
            <h1 className="font-extrabold my-8 sm:ml-8 md:ml-32 sm:pr-2 md:pr-6 text-4xl sm:text-3xl text-txt text-center">
              {surveyDetail.title}
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            {surveyDetail.endDate == null && (
              <button
                onClick={() => setIsOpen(true)}
                className=" bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded self-end mt-4 "
              >
                Cerrar Encuesta
              </button>
            )}
            <Link href={'/reportes/encuesta/' + surveyId}>
              <button
                className="flex items-center justify-center bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded self-end mt-4 md:mr-32 sm:mr-12"
                onClick={() => setIsGeneratingReport(true)}
              >
                Generar Reporte
              </button>
            </Link>
          </div>
        </div>
        <div className="flex mx-8 justify-between">
          <p className="font-normal mt-8 sm:ml-8 md:ml-32 sm:pr-2 md:pr-6 text-txt">
            {surveyDetail.description}
          </p>
          <div className="flex gap-4">
            {surveyDetail.endDate == null && (
              <div>
                <Modal
                  isOpen={modalIsOpen}
                  style={{
                    overlay: {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    },
                    content: {
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      minWidth: 'fit-content',
                      minHeight: 'fit-content',
                      maxWidth: '40rem',
                    },
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-extrabold text-2xl text-txt text-center">
                      ¿Está seguro que desea cerrar la encuesta?
                    </h1>
                    <div className="flex flex-col items-center justify-center w-full gap-4 py-4 sm:flex-row">
                      <button
                        onClick={() => closeSurvey(surveyDetail.surveyId)}
                        className=" bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded"
                      >
                        Cerrar Encuesta
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className=" bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
        <div className="w-5/6 m-auto p-3 overflow-x-auto mb-8">
          <table className="border-collapse justify-center items-center w-full">
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
              {surveyDetail && [
                surveyDetail?.questions?.map((question, index) => {
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
      <td className="text-left py-8 px-8 truncate whitespace-normal text-txt max-w-sm">
        {props.questionText}
      </td>
      <td className="text-center truncate py-8 px-8 text-txt ">
        {props.questionType === 'open' ? 'Pregunta Abierta' : ''}
        {props.questionType === 'scale' ? 'Escala de valores' : ''}
        {props.questionType === 'multiple_choice' ? 'Opción múltiple' : ''}
      </td>
      <td className="text-center truncate py-8 px-8 text-txt ">
        {props.isRequired ? (
          <Pill status="mandatory" />
        ) : (
          <Pill status="optional" />
        )}
      </td>
    </tr>
  )
}
