import { MouseEventHandler, useState, MouseEvent } from 'react'
import { useEffect } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { CreateSurveyBody } from '../../../app/encuestas/crear/page'

export type MulOPQuestionProps = {
  survey: React.Dispatch<React.SetStateAction<CreateSurveyBody>>
  setSurvey: React.Dispatch<React.SetStateAction<CreateSurveyBody>>
}

export const MulOPQuestion = ({ setSurvey }: MulOPQuestionProps) => {
  type Option = {
    id: number
    textOption: string
  }
  const [options, setOptions] = useState<Option[]>([
    { id: 0, textOption: '' },
    { id: 1, textOption: '' },
  ])
  const [counter, setCounter] = useState(2)

  const createOption: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const newOption = {
      id: counter,
      textOption: '',
    }
    setCounter(counter + 1)
    setOptions((prevOptions) => [...prevOptions, newOption])
    if (options.length >= 2) {
      const errorText = document.getElementById('noOpErrorText')
      if (errorText) {
        errorText.style.display = 'none'
      }
    }
  }

  useEffect(() => {
    setSurvey((prevSurvey) => {
      const newSurvey = { ...prevSurvey }
      newSurvey.questions.map((question) => {
        if (question.questionType === 'multiple_choice') {
          question.options = options.map((option) => option.textOption)
        }
        if (
          question.options &&
          question.options.length &&
          question.options.length >= 2
        ) {
          const errorText = document.getElementById('noOpErrorText')
          if (errorText) {
            errorText.style.display = 'none'
          }
        }
        return question
      })
      return newSurvey
    })
  }, [options])

  const deleteQuestion = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: number
  ) => {
    event.preventDefault()
    setOptions((prevOptions) => {
      const newOptions = prevOptions.filter((option) => option.id !== id)
      if (newOptions.length < 2) {
        const errorText = document.getElementById('noOpErrorText')
        if (errorText) {
          errorText.style.display = 'block'
        }
      }
      return newOptions
    })
  }

  const handleOptionChange = (id: number, newValue: string) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option) => {
        if (option.id === id) {
          option.textOption = newValue
        }
        return option
      })
      return newOptions
    })
  }

  return (
    <div className="w-full text-left">
      <h2 className="text-sm mb-3">Opciones</h2>
      {options.map((option) => (
        <div
          key={option.id}
          className="flex flex-row gap-1.5 items-center mb-3"
        >
          <input
            id={option.id.toString()}
            name={option.id.toString()}
            type="text"
            className="px-2 py-2 rounded border border-solid border-gray-300 w-3/4"
            placeholder="Cual es tu huella de carbono?"
            onChange={(event) => {
              handleOptionChange(option.id, event.target.value)
            }}
            required
          />
          <a onClick={(e) => deleteQuestion(e, option.id)}>
            <DeleteForeverIcon className="hover:text-red-600 cursor-pointer" />
          </a>
        </div>
      ))}
      <p id="noOpErrorText" className="text-red-600">
        Se necesitan al menos 2 opciones
      </p>
      <div className="x-2 py-2 mt-3">
        <button
          onClick={(e) => createOption(e)}
          className="flex items-center justify-center px-4 py-2 text-white bg-primary-base rounded hover:bg-primary-dark"
        >
          Agregar Opcion
        </button>
      </div>
    </div>
  )
}
