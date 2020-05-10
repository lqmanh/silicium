import { observer } from 'mobx-react'
import { useState } from 'react'
import { Button } from '../form/controls'

export const Icon = (props) => {
  const { name, size = 16 } = props

  return (
    <span className="flex">
      <ion-icon name={name} style={{ fontSize: size }} />
    </span>
  )
}

export const IconText = (props) => {
  const { icon, text } = props

  return (
    <span className="inline-flex items-center">
      {icon}
      <span className="ml-2">{text}</span>
    </span>
  )
}

export const Badge = (props) => {
  const { bgColor = 'bg-gray-200', textColor = 'text-gray-600', children } = props
  const style = {
    appearance: 'inline-block',
    bg: bgColor,
    border: 'rounded-full',
    text: textColor,
    space: 'mx-2 px-4 py-2',
  }

  return (
    <span className={`${style.appearance} ${style.bg} ${style.border} ${style.text} ${style.space}`}>{children}</span>
  )
}

export const Card = (props) => {
  const { bgColor = 'bg-gray-200', textColor = 'hover:text-black', children } = props
  const style = {
    width: 'w-full',
    bg: bgColor,
    border: 'rounded',
    text: textColor,
    shadow: 'shadow hover:shadow-md',
    space: 'mx-2 p-4',
  }

  return (
    <div className={`${style.width} ${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.space}`}>
      {children}
    </div>
  )
}

export const EntryCard = observer((props) => {
  const { title, actions, body } = props
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <div className="flex flex-col">
        <div className={`flex items-center justify-between ${expanded ? 'mb-4' : ''}`}>
          <span>{title}</span>
          <span>
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? (
                <IconText icon={<Icon name="chevron-up-outline" />} text="Shrink" />
              ) : (
                <IconText icon={<Icon name="chevron-down-outline" />} text="Expand" />
              )}
            </Button>
            {actions}
          </span>
        </div>
        {expanded && body}
      </div>
    </Card>
  )
})

export const ListEntry = observer((props) => {
  const { children } = props
  const style = {
    bg: 'hover:bg-gray-200',
    border: 'rounded',
    text: 'hover:text-black',
    cursor: 'cursor-pointer',
    space: 'px-4 py-2',
  }

  return <div className={`${style.bg} ${style.border} ${style.text} ${style.cursor} ${style.space}`}>{children}</div>
})
