import React from 'react'

const CreateButton: React.FC = () => {
  return (
    <button
      className={`flex items-center justify-center gap-2.5 py-4 w-full whitespace-nowrap rounded-xl hover:scale-105 bg-blue-600 text-white active:scale-97 transition duration-300`}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 22.9231V21.0769H21.0769V10H22.9231V21.0769H34V22.9231H22.9231V34H21.0769V22.9231H10Z"
          fill="#0B1F33"
        />
      </svg>
      <span className={'font-lato text-32'}>Создать VM шаблон</span>
    </button>
  )
}

export default CreateButton
