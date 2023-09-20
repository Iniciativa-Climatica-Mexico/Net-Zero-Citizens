'use client'

import { apiV1Url } from '@/utils/constants'
import React from 'react'

export default function CloseButtonComponent(props: { surveyId: string }) {
  return (
    <button
      onClick={() => openModal(props.surveyId)}
      className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-8 mt-8 rounded self-end"
    >
      Cerrar Encuesta
    </button>
  )
}

async function openModal(surveyID: string) {
  const response = await fetch(`${apiV1Url}/survey/${surveyID}/close`, {
    method: 'POST',
    mode: 'no-cors'
  })
  if (!response.ok) {
    console.log('Error closing survey')
  }
}

function confirmCloseModal() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="self-start font-extrabold mt-8 mx-8 text-4xl text-txt">
          ¿Está seguro que desea cerrar la encuesta?
        </h1>
        <div className="flex flex-row justify-center">
          <button className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-8 mt-8 rounded self-end">
            Cerrar Encuesta
          </button>
          <button className=" bg-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-8 mt-8 rounded self-end">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
