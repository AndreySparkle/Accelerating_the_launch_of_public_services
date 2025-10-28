import React, { useRef, useId } from 'react'

interface Props {
  title: string
  description: string
  onFileAdd: (file: File) => void
  accept?: string
  isCompleted?: boolean
  allowMultiple?: boolean
}

const AddFile: React.FC<Props> = ({
  title,
  onFileAdd,
  accept,
  description,
  isCompleted = false,
  allowMultiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      if (allowMultiple) {
        Array.from(e.target.files).forEach(file => {
          onFileAdd(file)
        })
      } else {
        onFileAdd(e.target.files[0])
      }

      if (fileInputRef.current && !allowMultiple) {
        fileInputRef.current.value = ''
      }
    }
  }

  const isDisabled = !allowMultiple && isCompleted

  return (
    <label
      htmlFor={inputId}
      className={`flex items-center relative justify-between px-16 gap-2.5 bg-white py-6 w-full whitespace-nowrap rounded-xl transition duration-300 ${
        isDisabled
          ? '!cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:scale-102 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white active:scale-97'
      }`}
    >
      <div className={'flex flex-col gap-y-3'}>
        <span className={'font-lato text-32 leading-6'}>{title}</span>
        <span className={'font-lato leading-3.5 opacity-70'}>
          {description}
        </span>
      </div>

      {isDisabled ? (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0431 31L8 22.0772L9.29914 20.7971L17.0431 28.4381L33.7027 12L35 13.2819L17.0431 31Z"
            fill="#0B1F33"
          />
        </svg>
      ) : (
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
      )}

      <input
        ref={fileInputRef}
        type="file"
        id={inputId}
        className={'absolute opacity-0 w-0 h-0'}
        onChange={handleFileChange}
        accept={accept}
        multiple={allowMultiple}
        disabled={isDisabled}
      />
    </label>
  )
}

export default AddFile
