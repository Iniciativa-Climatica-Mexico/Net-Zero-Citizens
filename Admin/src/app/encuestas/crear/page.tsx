'use client'
import { QuestionWrapper } from '../../../components/surveyQuestions/questionWrapper'
import AddIcon from '@mui/icons-material/Add'
import { MouseEventHandler, useState } from 'react'
import { createSurvey } from '@/api/v1/survey'
import { useEffect } from 'react'
import SurveyModal from '@/components/surveyModal'

export type CreateSurveyBody = {
  title: string
  description: string
  questions: Question[]
}

export type Question = {
  id: number
  questionText: string
  questionType: string
  isRequired: boolean
  options?: string[]
}

export default function CreateSurvey() {
  const [counter, setCounter] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 0,
      questionText: '',
      questionType: 'open',
      isRequired: false,
    },
  ])

  const [survey, setSurvey] = useState<CreateSurveyBody>({
    description: '',
    title: '',
    questions: questions,
  })

  const createQuestion: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    const newQuestion = {
      id: counter,
      questionText: '',
      questionType: 'open',
      isRequired: false,
    }
    setCounter(counter + 1)
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions = [...prevSurvey.questions, newQuestion]
      return newSurvey
    })
  }

  const handleSurveyTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey, title: event.target.value }
      return newSurvey
    })
  }

  const handleSurveyDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey, description: event.target.value }
      return newSurvey
    })
  }

  useEffect(() => {
    const errorText = document.getElementById('noQErrorText')
    if (questions.length < 1) {
      if (errorText) {
        errorText.style.display = 'block'
      }
    } else {
      if (errorText) {
        errorText.style.display = 'none'
      }
    }
  }, [questions])

  const [buttonEnabled, setButtonEnabled] = useState(true)
  useEffect(() => {
    const hasTitle = survey.title !== ''
    const hasDescription = survey.description !== ''
    const hasQuestions = questions.length > 0

    const hasMultipleChoiceQuestions = questions.every(
      (question) =>
        question.questionType === 'open' ||
        question.questionType === 'scale' ||
        (question.questionType === 'multiple_choice' &&
          question.options &&
          question.options.length >= 2)
    )

    const emptyQuestions = questions.some(
      (question) =>
        question.questionText === '' || question.questionText === ' '
    )

    const emptyOptions = questions.some(
      (question) =>
        question.questionType === 'multiple_choice' &&
        question.options &&
        question.options.some((option) => option === '' || option === ' ')
    )

    setButtonEnabled(
      hasTitle &&
        hasDescription &&
        hasQuestions &&
        hasMultipleChoiceQuestions &&
        !emptyQuestions &&
        !emptyOptions
    )
  }, [survey])

  const createSurveyHandeler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()

    console.log('clicked:', survey)

    createSurvey(survey)
    window.location.href = '/encuestas'
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setModalIsOpen(true)
  }

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div>
      <form>
        <SurveyModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          onAccept={() => {
            createSurveyHandeler
          }}
          modalText="Se cerraran todas las encuestas que esten en progreso"
        />
        <div className="flex-row flex items-center justify-between my-8 mx-8">
          <h1 className="self-start font-extrabold my-8 mx-8 text-4xl text-txt">
            Crear Encuesta
          </h1>
          <button
            className={`flex items-center justify-center px-4 py-2 my-8 mx-8 text-white bg-primary-base rounded hover:bg-primary-900 cursor-pointer ${
              !buttonEnabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => openModal(e)}
            disabled={!buttonEnabled}
          >
            Crear
          </button>
        </div>
        <div className="flex-row flex justify-evenly my-8 mx-8">
          <div className="flex flex-col mx-8">
            <label className="text-m font-bold text-txt mb-2">
              Titulo de la encuesta
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="px-4 py-2 mb-3 border border-gray-700 rounded"
              placeholder="Calcula tu huella de carbono"
              onChange={handleSurveyTitleChange}
              required
            />
            <label className="text-m font-bold text-txt mb-2">
              Descripción
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="px-4 py-2 border border-gray-700 rounded h"
              placeholder="Encuesta para calcular tu huella de carbono"
              onChange={handleSurveyDescriptionChange}
              required
            />
          </div>
          <div className="flex flex-col w-1/2 text-center">
            <h1 id="noQErrorText" className="text-red-600">
              Agrega una nueva pregunta
            </h1>
            <div className="w-full">
              {questions.map((question) => (
                <QuestionWrapper
                  questions={questions}
                  id={question.id}
                  setQuestions={setQuestions}
                  key={question.id}
                  survey={survey}
                  setSurvey={setSurvey}
                />
              ))}
            </div>
            <div className="flex flex-row">
              <a
                className=" w-full flex items-center justify-center px-4 py-2 my-8 text-white bg-primary-base rounded cursor-pointer hover:bg-primary-dark"
                onClick={(e) => createQuestion(e)}
              >
                Anadir Pregunta
                <AddIcon />
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
