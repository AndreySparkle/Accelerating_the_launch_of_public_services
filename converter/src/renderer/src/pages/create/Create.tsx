import React, { useState } from 'react'
import AddFile from '../../Components/ui/AddFile/AddFile'
import RemoveButton from '../../Components/ui/RemoveButton/RemoveButton'
import CreateButton from '../../Components/ui/CreateButton/CreateButton'

interface FileData {
  id: string
  name: string
  type: string
  file: File
}

const Create: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([])

  const handleFileAdd = (file: File, type: string): void => {
    const newFile: FileData = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: type,
      file: file
    }
    setFiles(prev => [...prev, newFile])
  }

  const removeFile = (id: string): void => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const hasEpguFile = files.some(
    file => file.type === 'JSON-схема услуги (ЕПГУ)'
  )
  const hasVisFile = files.some(
    file => file.type === 'XSD-схема вида сведений (ВИС)'
  )
  const hasApplicationFile = files.some(
    file => file.type === 'Тестовое заявление (JSON)'
  )

  return (
    <main
      className={
        'bg-gray-50 min-h-screen py-16 text-blue-700 font-lato flex justify-center'
      }
    >
      <div className="container px-6 flex flex-col w-full justify-between gap-y-12">
        <div className={'flex flex-col gap-12 mx-auto items-start w-full'}>
          <span className={'text-5xl font-bold'}>Добавить файлы</span>
          <div className={'flex flex-col w-full gap-y-4'}>
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'JSON-схема услуги (ЕПГУ)')
              }
              accept=".json,application/json"
              title={'Добавить схему услуги ЕПГУ'}
              description={'Описание полей формы с портала Госуслуг'}
              isCompleted={hasEpguFile}
              allowMultiple={false}
            />
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'XSD-схема вида сведений (ВИС)')
              }
              accept=".xsd,application/xml"
              title={'Добавить схему вида сведений ВИС'}
              description={
                'Структура данных, которую ожидает внутренняя система'
              }
              isCompleted={hasVisFile}
              allowMultiple={false}
            />
          </div>

          <span className={'text-5xl font-bold'}>Ваше заявление</span>

          <div className={'flex flex-col w-full gap-y-4'}>
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'Тестовое заявление (JSON)')
              }
              accept=".json,application/json"
              title={'Добавить заявление'}
              description={'Примеры заполненных форм (можно выбрать несколько)'}
              isCompleted={hasApplicationFile}
              allowMultiple={true}
            />
          </div>

          <div className="flex flex-col w-full gap-y-4">
            <span className={'text-40 font-bold'}>Добавленные файлы</span>
            <div className="flex flex-col gap-3">
              {files.length > 0 ? (
                files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="font-lato text-lg">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-lato text-sm text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <RemoveButton onClick={() => removeFile(file.id)} />
                    </div>
                  </div>
                ))
              ) : (
                <span>Файлы отсутствуют</span>
              )}
            </div>
          </div>
        </div>
        <CreateButton />
      </div>
    </main>
  )
}

export default Create
