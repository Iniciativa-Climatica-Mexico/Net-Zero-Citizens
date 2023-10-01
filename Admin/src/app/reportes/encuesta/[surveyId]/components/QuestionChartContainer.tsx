'use client'

import { QuestionReport, SurveyReport } from '@/api/v1/report'
import { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import { PDFDownloadLink } from '@react-pdf/renderer'
import htm2canvas from 'html2canvas'
import SurveyPDFReport from '@/components/reporte/SurveyPDF/SurveyPDF'
import ScaleChart from './ScaleChart'

/**
 * `generateGraphImages` genera las imágenes de las gráficas de las
 * preguntas cerradas de la encuesta
 *
 * @function
 * @name generateGraphImages
 * @async
 *
 * @param {Array} questions - The questions from the survey report.
 * @param {Function} setImageState - Function to set the graph images state.
 * @param {Function} setLoadedState - Function to set the graphs loaded state.
 */
const generateGraphImages = async (
  questions: QuestionReport[],
  setImageState: (_images: string[]) => void,
  setLoadedState: (_loaded: boolean) => void
) => {
  const images: string[] = []

  await new Promise((resolve) => setTimeout(resolve, 2000))

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]

    if (question.questionType !== 'open') {
      const canvas = await htm2canvas(
        document.getElementById(`graph-${i}`) as HTMLElement,
        {
          scale: 8,
          backgroundColor: 'transparent',
        }
      )

      images.push(canvas.toDataURL())
    } else images.push('')
  }

  setLoadedState(true)
  setImageState(images)
}

export function QuestionChartContainer(surveyReport: SurveyReport) {
  try {
    const [page, setPage] = useState(0)
    const maxPage = Math.ceil(surveyReport.questions.length)

    const onNextPage = () => setPage((page + 1) % maxPage)
    const onPrevPage = () => setPage(page > 0 ? page - 1 : maxPage - 1)

    const question = surveyReport.questions[page]
    const labels = question.answers?.map((answer) => answer.label)
    const data = question.answers?.map((answer) => answer.count)
    const filename = question.questionText

    const [showDropdown, setShowDropdown] = useState(false)
    const [graphImages, setGraphImages] = useState<string[]>([])
    const [graphsLoaded, setGraphsLoaded] = useState<boolean>(false)
    const setShowDownloadLink = useState<boolean>(false)[1]

    useEffect(() => {
      generateGraphImages(
        surveyReport.questions,
        setGraphImages,
        setGraphsLoaded
      )
    }, [surveyReport])

    useEffect(() => {
      if (graphsLoaded) {
        const timer = setTimeout(() => {
          setShowDownloadLink(true)
        }, 500)

        return () => clearTimeout(timer)
      }
    }, [graphsLoaded])

    const hasQuestionWithoutAnswers = () => {
      return surveyReport.questions.some(
        (question) => !question.answers || question.answers.length === 0
      )
    }

    return (
      <div>
        <div className="flex flex-row items-center justify-between my-8 mx-8">
          <h1 className="self-start font-extrabold mt-8 mx-8 text-4xl text-txt">
            {surveyReport.title}
          </h1>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded self-end mt-4 ml-auto left-500"
            >
              Descargar Respuestas
            </button>
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {/* CSV Download Option */}
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <CSVLink
                      headers={[
                        { label: 'Opción', key: 'label' },
                        { label: 'Total de respuestas', key: 'count' },
                      ]}
                      data={question.answers}
                      filename={filename}
                    >
                      CSV
                    </CSVLink>
                  </div>

                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {graphsLoaded || hasQuestionWithoutAnswers() ? (
                      <PDFDownloadLink
                        document={
                          <SurveyPDFReport
                            survey={surveyReport}
                            graphImages={graphImages}
                          />
                        }
                        fileName={`${surveyReport.title}.pdf`}
                      >
                        {({ loading }) =>
                          loading
                            ? 'Cargando documento...'
                            : 'Descargar resumen'
                        }
                      </PDFDownloadLink>
                    ) : (
                      'Cargando documento...'
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex pl-10 pb-2">
          <button className="pr-5" onClick={onPrevPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <h3 className="text-txt font-medium text-xl">
            {question.questionText}
          </h3>
          <button className="pl-5" onClick={onNextPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        {(() => {
          return (
            <div className="flex min-h-[25rem]">
              {/* Lado izquierdo de la ventana */}
              <div className="pl-20 w-2/5 flex flex-col justify-between">
                <QuestionComponent {...question} />
                <table className="table-fixed border-collapse rounded-lg border border-slate-400 w-3/5">
                  <thead>
                    <tr>
                      <th className="px-10 py-4 border border-slate-400">
                        Número de respuestas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center p-4 border border-slate-400">
                        <div className="bg-zinc-900 text-white rounded-full text-xl font-semibold p-2 px-4 inline-block">
                          {question.answers.length > 0
                            ? question.answers
                                .map((ans) => ans.count)
                                .reduce((prev, curr) => prev + curr)
                            : 0}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lado derecho de la ventana */}
              <div className="pt-10 w-1/2">
                <h2 className="text-black font-extrabold text-4xl">
                  Desglose de respuestas
                </h2>
                {question.answers.length > 0 ? (
                  <>
                    {/* Preguntas cerradas */}
                    {question.questionType != 'open' && (
                      <div className="flex">
                        {/* Tabla de labels */}
                        <div className="pt-10 w-1/2">
                          <table className="table-fixed border-collapse rounded-lg border border-slate-400">
                            <thead>
                              <tr>
                                <th className="px-10 py-4 border border-slate-400">
                                  Opción
                                </th>
                                <th className="px-10 py-4 border border-slate-400">
                                  Total de respuestas
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {question.answers.map((ans) => (
                                <tr>
                                  <td className="text-center p-4 border border-slate-400">
                                    {ans.label}
                                  </td>
                                  <td className="text-center p-4 border border-slate-400">
                                    {ans.count}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Gráfica */}
                        <div className="pl-4 w-1/2">
                          <ScaleChart
                            {...{
                              title: question.questionText,
                              labels,
                              data,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Rendering hidden graphs for PDF */}
                    {surveyReport.questions.map(
                      (question, index) =>
                        question.questionType !== 'open' && (
                          <div
                            key={index}
                            style={{
                              position: 'absolute',
                              left: '-99999px',
                            }}
                            id={`graph-${index}`}
                          >
                            <ScaleChart
                              {...{
                                title: question.questionText,
                                labels: question.answers?.map(
                                  (answer) => answer.label
                                ),
                                data: question.answers?.map(
                                  (answer) => answer.count
                                ),
                              }}
                            />
                          </div>
                        )
                    )}

                    {/* Preguntas abiertas */}
                    {question.questionType == 'open' && (
                      <div className="flex">
                        <div className="pt-10">
                          <table className="table-fixed border-collapse rounded-lg border border-slate-400">
                            <thead>
                              <tr>
                                <th className="px-10 py-4 border border-slate-400">
                                  Respuesta
                                </th>
                                <th className="px-10 py-4 border border-slate-400">
                                  Total de respuestas
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {question.answers.map((ans) => (
                                <tr>
                                  <td className="text-center p-4 border border-slate-400">
                                    {ans.label}
                                  </td>
                                  <td className="text-center p-4 border border-slate-400">
                                    {ans.count}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <h3 className="text-black font-extrabold text-5xl pt-40 pb-3">
                    No hay respuestas disponibles
                  </h3>
                )}
              </div>
            </div>
          )
        })()}
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

const questionTypeMap = {
  scale: 'Escala',
  open: 'Abierta',
  multiple_choice: 'Opción Múltiple',
}

function QuestionComponent(props: QuestionReport) {
  return (
    <div className="text-txt bg-background">
      <h3 className="text-black font-extrabold text-3xl pt-10 pb-3">
        Tipo de pregunta
      </h3>
      <div className="bg-emerald-600 text-white font-semibold rounded-lg text-sm px-6 py-2 inline-block">
        {questionTypeMap[props.questionType]}
      </div>
    </div>
  )
}
