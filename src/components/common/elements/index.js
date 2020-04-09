const Icon = (props) => {
  const { name, size = 16 } = props

  return (
    <span className="flex">
      <ion-icon name={name} style={{ fontSize: size }} />
    </span>
  )
}

const IconText = (props) => {
  const { icon, text } = props

  return (
    <span className="inline-flex items-center">
      {icon}
      <span className="ml-2">{text}</span>
    </span>
  )
}

const Badge = (props) => {
  const { bgColor = 'bg-gray-200', textColor = 'text-gray-600', children } = props
  const style = {
    bg: bgColor,
    border: 'rounded-full',
    text: textColor,
    space: 'mx-2 px-4 py-2',
  }

  return <span className={`${style.bg} ${style.border} ${style.text} ${style.space}`}>{children}</span>
}

const Card = (props) => {
  const { bgColor = 'bg-gray-200', textColor = 'text-gray-800 hover:text-black', children } = props
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

export { Icon, IconText, Badge, Card }
