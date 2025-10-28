interface IHelperButton {
  title: string
  href?: string
  onClick?: () => void
}

export const helperButtons: IHelperButton[] = [
  {
    title: 'Как создать новый шаблон?',
    onClick: () => {}
  },
  {
    title: 'Моя профессия ит',
    href: 'https://t.me/+3b3c3KfROrs3ZWIy'
  },
  {
    title: 'Помощь',
    href: 'https://t.me/Andrey_shot'
  }
]
