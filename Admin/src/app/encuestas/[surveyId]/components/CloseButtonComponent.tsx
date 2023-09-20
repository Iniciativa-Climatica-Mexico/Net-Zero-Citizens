'use client'

import { apiV1Url } from '@/utils/constants'
import React from 'react'
import Modal from 'react-modal'

export default function CloseButtonComponent(props: { surveyId: string }) {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  async function closeSurvey(surveyID: string) {
    try {
      const response = await fetch(`${apiV1Url}/survey/${surveyID}/close`, {
        method: 'POST',
        mode: 'no-cors',
      })
      if (!response.ok) {
        console.log('Error closing survey')
      }
    } catch (e) {
      console.log(e)
    }
    // rediret to /encuestas
    window.location.href = '/encuestas'
    
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 rounded self-end"
      >
        Cerrar Encuesta
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 'fit-content',
            minHeight: 'fit-content',
          },
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-4xl text-txt text-center">
            ¿Está seguro que desea cerrar la encuesta?
          </h1>
          <div className="flex flex-col items-center justify-center w-full gap-4 py-4 sm:flex-row">
            <button
              onClick={() => closeSurvey(props.surveyId)}
              className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Encuesta
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
