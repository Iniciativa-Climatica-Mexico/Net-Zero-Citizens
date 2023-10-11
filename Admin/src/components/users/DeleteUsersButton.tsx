'use client'
import { Trash2 } from 'lucide-react'

interface DeleteUsersButtonProps {
    setIsModalOpen: (value: boolean) => void
}

export default function DeleteUsersButton({setIsModalOpen}: DeleteUsersButtonProps) {
  const handleOnClick = () => {
    setIsModalOpen(true)
  }
  return (
    <div className="flex justify-end">
      <button 
        className="flex items-center space-x-2" 
        onClick={handleOnClick}
      >
        <Trash2 size={16} />
        <span>Eliminar</span>
      </button>
    </div>
  )
}