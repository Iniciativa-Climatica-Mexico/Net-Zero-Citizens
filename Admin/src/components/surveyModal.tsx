import React from 'react'
import Modal from 'react-modal'
import WarningIcon from '@mui/icons-material/Warning'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  modalText: string
}

const SurveyModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  modalText,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Warning Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto text-center border border-gray-500">
        <h2 className="text-2xl font-bold mb-4">Precaucion</h2>
        <div className="text-yellow-500 mb-4">
          <WarningIcon sx={{ fontSize: 90 }} />
        </div>
        <p className="text-gray-800 text-lg mb-4">{modalText}</p>
        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 rounded text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary-base hover:bg-primary-dark rounded text-white"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default SurveyModal
