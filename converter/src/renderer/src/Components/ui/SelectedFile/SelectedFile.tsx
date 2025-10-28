import React, { useRef } from 'react'

interface SelectedFileProps {
  title: string
  icon: React.ReactNode
  fileName: string
  fileSize: string
  onFileChange: (file: File) => void
  onRemove: () => void
  accept?: string
}

const SelectedFile: React.FC<SelectedFileProps> = ({
  title,
  icon,
  fileName,
  fileSize,
  onFileChange,
  onRemove,
  accept
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleChangeClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center justify-between px-16 gap-2.5 bg-white py-5.5 w-full whitespace-nowrap rounded-xl border border-blue-700">
        <div className={'flex gap-x-2.5 items-center flex-1'}>
          {icon}
          <div className={'flex flex-col gap-y-3 flex-1'}>
            <span className={'font-lato text-32 leading-6'}>{fileName}</span>
            <span className={'font-lato leading-3.5 opacity-70 text-xl'}>
              {title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-lato text-sm text-gray-500 whitespace-nowrap">
            {fileSize} MB
          </span>

          <button
            onClick={onRemove}
            className="hover:text-blue-700 group relative w-10 h-10"
          >
            <svg
              className="absolute inset-0 group-hover:opacity-0 transition-opacity"
              width="38"
              height="40"
              viewBox="0 0 38 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.3634 30C12.7874 30 12.2971 29.8005 11.8926 29.4014C11.488 29.0023 11.2857 28.5191 11.2857 27.9518V12.2448H10V10.9765H15.1429V10H22.8571V10.9765H28V12.2448H26.7143V27.9518C26.7143 28.5352 26.5163 29.0226 26.1203 29.4141C25.7243 29.8055 25.2297 30.0008 24.6366 30H13.3634ZM25.4286 12.2448H12.5714V27.9518C12.5714 28.1792 12.6456 28.3661 12.7939 28.5124C12.9421 28.6586 13.132 28.7318 13.3634 28.7318H24.6379C24.835 28.7318 25.0163 28.6506 25.1817 28.4883C25.3471 28.3259 25.4294 28.1467 25.4286 27.9505V12.2448ZM16.1817 26.1953H17.4674V14.7812H16.1817V26.1953ZM20.5326 26.1953H21.8183V14.7812H20.5326V26.1953Z" />
            </svg>
            <svg
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              width="38"
              height="40"
              viewBox="0 0 38 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3634 30C12.7874 30 12.2971 29.8005 11.8926 29.4014C11.488 29.0023 11.2857 28.5191 11.2857 27.9518V12.2448H10V10.9765H15.1429V10H22.8571V10.9765H28V12.2448H26.7143V27.9518C26.7143 28.5352 26.5163 29.0226 26.1203 29.4141C25.7243 29.8055 25.2297 30.0008 24.6366 30H13.3634ZM25.4286 12.2448H12.5714V27.9518C12.5714 28.1792 12.6456 28.3661 12.7939 28.5124C12.9421 28.6586 13.132 28.7318 13.3634 28.7318H24.6379C24.835 28.7318 25.0163 28.6506 25.1817 28.4883C25.3471 28.3259 25.4294 28.1467 25.4286 27.9505V12.2448Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.4286 12.2448H12.5714V27.9518C12.5714 28.1792 12.6456 28.3661 12.7939 28.5124C12.9421 28.6586 13.132 28.7318 13.3634 28.7318H24.6379C24.835 28.7318 25.0163 28.6506 25.1817 28.4883C25.3471 28.3259 25.4294 28.1467 25.4286 27.9505V12.2448ZM17.4674 26.1953H16.1817V14.7812H17.4674V26.1953ZM21.8183 26.1953H20.5326V14.7812H21.8183V26.1953Z"
              />
            </svg>
          </button>

          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0431 31L8 22.0772L9.29914 20.7971L17.0431 28.4381L33.7027 12L35 13.2819L17.0431 31Z"
              fill="#10B981"
            />
          </svg>
        </div>
      </div>

      <span
        onClick={handleChangeClick}
        tabIndex={0}
        className={
          'cursor-pointer rounded-xl text-32 leading-6 px-8 py-9 bg-white hover:bg-blue-600 hover:text-white hover:scale-102 active:bg-blue-600 active:text-white active:scale-97 transition duration-300'
        }
      >
        Изменить
      </span>

      <input
        ref={fileInputRef}
        type="file"
        className={'absolute opacity-0 w-0 h-0'}
        onChange={handleFileChange}
        accept={accept}
      />
    </div>
  )
}

export default SelectedFile
