import React, { useRef } from 'react'

interface Props {
  title: string
  description: string
  onFileAdd: (file: File) => void
  accept?: string
}

const AddFile: React.FC<Props> = ({
  title,
  onFileAdd,
  accept,
  description
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      onFileAdd(e.target.files[0])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <label
      htmlFor="addFile"
      className={`flex items-center relative justify-between px-16 gap-2.5 bg-white py-6 w-full whitespace-nowrap rounded-xl hover:scale-102 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white active:scale-97 transition duration-300 cursor-pointer`}
    >
      <div className={'flex flex-col gap-y-3'}>
        <span className={'font-lato text-32 leading-6'}>{title}</span>
        <span className={'font-lato leading-3.5 opacity-70'}>
          {description}
        </span>
      </div>
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
      <input
        ref={fileInputRef}
        type="file"
        id="addFile"
        className={'absolute opacity-0 w-0 h-0'}
        onChange={handleFileChange}
        accept={accept}
        multiple={false}
      />
    </label>
  )
}

export default AddFile
