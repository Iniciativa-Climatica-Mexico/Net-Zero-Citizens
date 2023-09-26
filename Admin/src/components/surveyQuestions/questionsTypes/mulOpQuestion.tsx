import { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const MulOPQuestion = ({
  onQQuantityChange,
}: {
  onQQuantityChange: (newQQuantity: number) => void
}) => {
  type option = {
    id: number
    value: string
  }
  const [options, setOptions] = useState<{ id: number; value: string }[]>([])
  const [qQuantity, setQQuantity] = useState<number>(0)

  const createOption = () => {
    setQQuantity((prevQuantity) => prevQuantity + 1)
    onQQuantityChange(qQuantity + 1)
    const newOption = {
      id: qQuantity,
      value: '',
    }
    setOptions([...options, newOption])
  }

  const deleteQuestion = (id: number) => {
    return () => {
      setQQuantity((prevQuantity) => prevQuantity - 1)
      onQQuantityChange(qQuantity - 1)
      setOptions((prevOptions) => {
        const newOptions = prevOptions.filter((option) => option.id !== id)
        return newOptions
      })
    }
  }

  return (
    <div className="w-full h-11">
      <input
        id="title"
        name="title"
        type="text"
        className="px-2 py-2 mb-3 rounded border border-solid border-gray-300 w-3/4 h-full"
        placeholder="Cual es tu huella de carbono?"
      />
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
            className="px-2 py-2 rounded border border-solid border-gray-300 w-3/4 h-full"
            placeholder="Cual es tu huella de carbono?"
          />
          <a onClick={deleteQuestion(option.id)}>
            <DeleteForeverIcon className="hover:text-red-600 cursor-pointer" />
          </a>
        </div>
      ))}
      <div className="x-2 py-2 mt-3">
        <button
          onClick={createOption}
          className="flex items-center justify-center px-4 py-2 text-white bg-primary-base rounded hover:bg-primary-dark"
        >
          Agregar Opcion
        </button>
      </div>
    </div>
  )
}
