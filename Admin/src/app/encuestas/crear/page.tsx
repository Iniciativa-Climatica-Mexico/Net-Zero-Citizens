'use client'
import { QuestionWrapper } from '../../../components/surveyQuestions/questionWrapper'

export default function CreateSurvey() {
  return (
    <div>
      <form>
        <div className="flex-row flex items-center justify-between my-8 mx-8">
          <h1 className="self-start font-extrabold my-8 mx-8 text-4xl text-txt">
            Crear Encuesta
          </h1>
          <a
            href="/encuestas/crear"
            className="flex items-center justify-center px-4 py-2 my-8 mx-8 text-white bg-primary-base rounded hover:bg-primary-dark"
          >
            Crear
          </a>
        </div>
        <div className="flex-row flex items-center justify-between my-8 mx-8">
          <div className="flex flex-col mx-8">
            <label className="text-m font-bold text-txt mb-2">
              Titulo de la encuesta
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="px-4 py-2 border border-gray-700 rounded"
              placeholder="Calcula tu huella de carbono"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-1/2">
            <QuestionWrapper />
          </div>
        </div>
      </form>
    </div>
  )
}
