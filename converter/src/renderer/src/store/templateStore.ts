import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SavedTemplate {
  id: string
  title: string
  content: string
  fileName: string
  serviceCode: string
  createdAt: string
  isFavorite: boolean
}

interface TemplateStore {
  templates: SavedTemplate[]
  addTemplate: (template: Omit<SavedTemplate, 'id'>) => void
  removeTemplate: (id: string) => void
  toggleFavorite: (id: string) => void
  getTemplate: (id: string) => SavedTemplate | undefined
  getNextFileName: (serviceCode: string) => string
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      templates: [],

      addTemplate: (templateData) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newTemplate: SavedTemplate = {
          ...templateData,
          id,
        }

        set((state) => ({
          templates: [newTemplate, ...state.templates]
        }))

        return id
      },

      removeTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter(t => t.id !== id)
        }))
      },

      toggleFavorite: (id) => {
        set((state) => ({
          templates: state.templates.map(t =>
            t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
          )
        }))
      },

      getTemplate: (id) => {
        return get().templates.find(t => t.id === id)
      },

      getNextFileName: (serviceCode: string) => {
        const templates = get().templates
        const sameServiceTemplates = templates.filter(t =>
          t.serviceCode === serviceCode
        )
        return `${serviceCode}_Applicant_${sameServiceTemplates.length + 1}.vm`
      }
    }),
    {
      name: 'template-storage',
      version: 1
    }
  )
)
