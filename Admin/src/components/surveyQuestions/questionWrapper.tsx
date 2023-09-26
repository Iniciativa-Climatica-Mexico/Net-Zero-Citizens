import Switch from '@mui/material/Switch'
import { useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { OpenQuestion } from './questionsTypes/openQuestion'
import { MulOPQuestion } from './questionsTypes/mulOpQuestion'
import { useEffect } from 'react'
import { use } from 'chai'

export const QuestionWrapper = () => {
  const [required, setRequired] = useState(false)
  const [questionType, setQuestionType] = useState('openQuestion')
  const [wrapperHeight, setWrapperHeight] = useState(200)
  const [switchMargin, setSwitchMargin] = useState(0.75)
  const [mulOpQuestionQuantity, setMulOpQuestionQuantity] = useState(0)

  useEffect(() => {
    const newHeight = questionType === 'mulOptionQuestion' ? 400 : 200
    setWrapperHeight(newHeight)
    const newMargin = questionType === 'mulOptionQuestion' ? 14 : 0.75
    setSwitchMargin(newMargin)
  }, [questionType])

  useEffect(() => {
    if (mulOpQuestionQuantity > 0) {
      const newHeight = 400 + mulOpQuestionQuantity * 50
      setWrapperHeight(newHeight)
      const newMargin = 14 + mulOpQuestionQuantity * 3.5
      setSwitchMargin(newMargin)
    }
  }, [mulOpQuestionQuantity])

  const handleMulOpQQuantityChange = (newQQuantity: number) => {
    event?.preventDefault()
    setMulOpQuestionQuantity(newQQuantity)
    console.log('New quantity:', newQQuantity)
  }

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
        return <MulOPQuestion onQQuantityChange={handleMulOpQQuantityChange} />
      default:
        return <OpenQuestion />
    }
  }

  return (
    <div
      className="rounded border border-solid border-gray-300 p-3.5 h-f"
      style={{ minHeight: `${wrapperHeight}px` }}
    >
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

      <div
        className="flex flex-row"
        style={{ marginTop: `${switchMargin}rem` }}
      >
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
