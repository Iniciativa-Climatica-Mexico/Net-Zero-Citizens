import { MouseEventHandler, useState, MouseEvent } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const MulOPQuestion = () => {
  type Option = {
    id: number
    value: string
  }
  const [options, setOptions] = useState<Option[]>([
    { id: 0, value: '' },
    { id: 1, value: '' },
  ])
  const [counter, setCounter] = useState(2)

  const createOption: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const newOption = {
      id: counter,
      value: '',
    }
    setCounter(counter + 1)
    setOptions([...options, newOption])
    console.log(options)
  }

  const deleteQuestion = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: number
  ) => {
    event.preventDefault()
    setOptions((prevOptions) => {
      const newOptions = prevOptions.filter((option) => option.id !== id)
      return newOptions
    })
  }

  const handleOptionChange = (id: number, newValue: string) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option) => {
        if (option.id === id) {
          option.value = newValue
        }
        return option
      })
      return newOptions
    })
  }

  return (
    <div className="w-full">
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
          />
          <a onClick={(e) => deleteQuestion(e, option.id)}>
            <DeleteForeverIcon className="hover:text-red-600 cursor-pointer" />
          </a>
        </div>
      ))}
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
