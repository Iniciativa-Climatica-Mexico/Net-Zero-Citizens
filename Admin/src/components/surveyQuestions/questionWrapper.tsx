import Switch from '@mui/material/Switch'
import React, { useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { MulOPQuestion } from './questionsTypes/mulOpQuestion'
import { Question, CreateSurveyBody } from '../../app/encuestas/crear/page'
import { useEffect } from 'react'

/**
 * El tipo de las props
 */
type QuestionWrapperProps = {
  questions: Question[]
  id: number
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
  survey: CreateSurveyBody
  setSurvey: React.Dispatch<React.SetStateAction<CreateSurveyBody>>
}
export const QuestionWrapper = ({
  questions,
  id,
  setQuestions,
  survey,
  setSurvey,
}: QuestionWrapperProps) => {
  //Estado para saber si la pregunta es obligatoria
  const [isRequired, setisRequired] = useState(true)

  //Estado para saber el tipo de pregunta
  const [questionType, setQuestionType] = useState('open')

  /**
   * Funcion para cambiar el tipo de pregunta
   * Actualiza el estado de la encuesta
   * @param event
   */
  const handleQuestionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestionType(event.target.value)
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions.map((question) => {
        if (question.id === id) {
          question.questionType = event.target.value
        }
        return question
      })
      return newSurvey
    })
  }

  /**
   * Funcion para eliminar una pregunta
   * Actualiza el estado de la encuesta
   */
  const deleteQuestion = () => {
    const newQuestions = questions.filter((question) => question.id !== id)
    setQuestions((prevQuestions) => newQuestions)
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions = newQuestions
      return newSurvey
    })
  }

  /**
   * Funcion para cambiar el titulo de la pregunta
   * Actualiza el estado de la encuesta
   * @param event
   */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions.map((question) => {
        if (question.id === id) {
          question.questionText = event.target.value
        }
        return question
      })
      return newSurvey
    })
  }

  /**
   * Funcion para cambiar el estado de la pregunta
   */
  const handleSwitchChange = () => {
    setisRequired((previsRequired) => !previsRequired)
  }

  /**
   * Hook para actualizar el estado de la encuesta
   * Cuando se cambia el obligatorio de la pregunta
   */
  useEffect(() => {
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions.map((question) => {
        if (question.id === id) {
          question.isRequired = isRequired
        }
        return question
      })
      return newSurvey
    })
  }, [isRequired])

  /**
   * Funcion para renderizar el tipo de pregunta
   */
  const questionSwitch = () => {
    if (questionType === 'multiple_choice') {
      return <MulOPQuestion survey={survey} setSurvey={setSurvey} />
    } else {
      return
    }
  }

  return (
    <div className="rounded border-2 border-solid border-gray-300 p-3.5 h-fit flex flex-col mb-3">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold">
          Pregunta {questions.map((q) => q.id).indexOf(id) + 1}
        </h2>
        <a onClick={deleteQuestion}>
          <RemoveCircleOutlineIcon className="hover:text-red-600 cursor-pointer" />
        </a>
      </div>

      <div className="flex flex-row justify-between mt-3">
        <input
          id="title"
          name="title"
          type="text"
          className="px-2 py-2 mb-3 rounded border border-solid border-gray-300 w-3/4 h-11"
          placeholder="Cual es tu huella de carbono?"
          onChange={handleTitleChange}
          required
        />
        <select
          className="rounded border border-solid border-gray-300 px-2 py-2 h-11"
          onChange={handleQuestionTypeChange}
        >
          <option value="open">Pregunta Abierta</option>
          <option value="multiple_choice">Opcion Multiple</option>
          <option value="scale">Pregunta Escalar</option>
        </select>
      </div>
      <div className="flex flex-col w-full">{questionSwitch()}</div>

      <div className="flex flex-row">
        <label
          className="flex items-center space-x-2"
          style={{ pointerEvents: 'none' }}
        >
          <span>Obligatoria</span>
        </label>
        <div style={{ pointerEvents: 'auto' }}>
          <Switch
            checked={isRequired}
            onChange={handleSwitchChange}
            color="primary"
            inputProps={{ 'aria-label': 'toggle switch' }}
          />
        </div>
      </div>
    </div>
  )
}
