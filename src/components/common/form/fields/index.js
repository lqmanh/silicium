const InputField = (props) => {
  const { label, input, value } = props

  return (
    <p className="flex">
      <span className="w-1/4 mr-4">{label}</span>
      <span className="w-3/4">{input ?? value}</span>
    </p>
  )
}

export { InputField }
