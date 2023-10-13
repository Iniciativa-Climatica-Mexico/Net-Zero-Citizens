import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4 bg-white p-8 rounded-xl shadow-xl">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-40 h-40 md:w-64 md:h-64 mb-4"
        />
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h1 className="text-4xl font-bold text-txt">Cargando...</h1>
      </div>
      <style jsx>{`
        .loader {
          border-top-color: #ffffff66;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingPage
