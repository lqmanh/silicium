const InputField = (props) => {
  const { label, input, value } = props

  return (
    <p className="flex w-full">
      <span className="w-1/3">{label}</span>
      <span className="mx-2">:</span>
      <span className="w-full">{input ?? value}</span>
    </p>
  )
}

export { InputField }
