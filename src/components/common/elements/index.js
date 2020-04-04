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

export { Icon, IconText }
