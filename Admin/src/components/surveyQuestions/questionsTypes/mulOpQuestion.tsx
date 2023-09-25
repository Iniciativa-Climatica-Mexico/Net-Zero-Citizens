export const MulOPQuestion = () => {
  return (
    <div className="w-full h-11">
      <input
        id="title"
        name="title"
        type="text"
        className="px-2 py-2 rounded border border-solid border-gray-300 w-3/4 h-full"
        placeholder="Calcula tu huella de carbono"
      />
      <input
        id="option1"
        name="option1"
        type="text"
        className="px-2 py-2 rounded border border-solid border-gray-300 w-3/4 h-full"
        placeholder="1000"
      />
      <input
        id="option2"
        name="option2"
        type="text"
        className="px-2 py-2 rounded border border-solid border-gray-300 w-3/4 h-full"
        placeholder="50000"
      />
    </div>
  )
}
