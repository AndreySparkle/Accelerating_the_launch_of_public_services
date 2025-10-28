import React from 'react'

interface Props {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
  isGenerated?: boolean
}

const CreateButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  isLoading = false,
  isGenerated = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2.5 py-4 w-full whitespace-nowrap text-white rounded-xl transition duration-300 ${
        disabled || isLoading
          ? 'bg-blue-200 !cursor-not-allowed'
          : 'bg-blue-600 hover:scale-105 hover:bg-white hover:text-blue-700 active:bg-white active:text-blue-700 active:scale-97'
      }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className={'font-lato text-32'}>Генерация...</span>
        </>
      ) : (
        <>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 22.9231V21.0769H21.0769V10H22.9231V21.0769H34V22.9231H22.9231V34H21.0769V22.9231H10Z"
              fill="currentColor"
            />
          </svg>
          <span className={'font-lato text-32'}>
            {isGenerated ? 'Перегенерировать' : 'Создать VM шаблон'}
          </span>
        </>
      )}
    </button>
  )
}

export default CreateButton
