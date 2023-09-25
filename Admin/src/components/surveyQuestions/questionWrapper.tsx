import Switch from '@mui/material/Switch'
import { useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { OpenQuestion } from './questionsTypes/openQuestion'
import { MulOPQuestion } from './questionsTypes/mulOpQuestion'

export const QuestionWrapper = () => {
  const [required, setRequired] = useState(false)
  const [questionType, setQuestionType] = useState('openQuestion')

  const handleQuestionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestionType(event.target.value)
  }

  const handleSwitchChange = () => {
    setRequired(!required)
  }

  const questionSwitch = () => {
    switch (questionType) {
      case 'openQuestion':
        return <OpenQuestion />
      case 'mulOptionQuestion':
        return <MulOPQuestion />
      default:
        return <OpenQuestion />
    }
  }

  return (
    <div className="rounded border border-solid border-gray-300 p-3.5 h-full">
      <div className="flex flex-row justify-between">
        <h2>Pregunta 1</h2>
        <RemoveCircleOutlineIcon className="hover:text-red-600 cursor-pointer" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-col w-full">{questionSwitch()}</div>
          <div className="flex flex-col">
            <select
              className="rounded border border-solid border-gray-300 px-2 py-2 h-11"
              onChange={handleQuestionTypeChange}
            >
              <option value="openQuestion">Pregunta Abierta</option>
              <option value="mulOptionQuestion">Opcion Multiple</option>
              <option value="scalenQuestion">Pregunta Escalar</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-row">
        <label
          className="flex items-center space-x-2"
          style={{ pointerEvents: 'none' }}
        >
          <span>Obligatoria</span>
        </label>
        <div style={{ pointerEvents: 'auto' }}>
          <Switch
            checked={required}
            onChange={handleSwitchChange}
            color="primary"
            inputProps={{ 'aria-label': 'toggle switch' }}
          />
        </div>
      </div>
    </div>
  )
}
