import Switch from '@mui/material/Switch'
import { useState } from 'react'

export const QuestionWrapper = () => {
  const [obligatoria, setObligatoria] = useState(false)

  const handleSwitchChange = () => {
    setObligatoria(!obligatoria)
  }

  return (
    <div className="rounded border border-solid border-gray-300 p-3.5">
      <div className="flex flex-row justify-between">
        <h2>Pregunta 1</h2>
        <img src="../../../public/LogoBloque.png" alt="Delete Icon" />
      </div>
      <div className="flex flex-row justify-between mt-3">
        <input
          className="rounded border border-solid border-gray-300 p-2"
          type="text"
          placeholder="Pregunta"
        />
        <select className="rounded border border-solid border-gray-300 p-1 pr-5">
          <option value="openQuestion">Pregunta Abierta</option>
          <option value="mulOptionQuestion">Opcion Multiple</option>
          <option value="scalenQuestion">Pregunta Escalar</option>
        </select>
      </div>
      <div className="mt-3">
        <label className="flex items-center space-x-2">
          <span>Obligatoria</span>
          <Switch
            checked={obligatoria}
            onChange={handleSwitchChange}
            color="primary"
            inputProps={{ 'aria-label': 'toggle switch' }}
          />
        </label>
      </div>
    </div>
  )
}
