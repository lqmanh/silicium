const Button = (props) => {
  const {
    bgColor = 'bg-gray-800',
    borderColor = '',
    textColor = 'text-gray-200 hover:text-white',
    isPill = false,
    onClick,
    children
  } = props
  const className = `${
    isPill ? 'rounded-full' : 'rounded'
  } ${bgColor} ${borderColor} ${textColor} mx-2 ${isPill ? 'px-8' : 'px-4'} py-2`

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

const Input = (props) => {
  const { type, placeholder, defaultValue, value, onChange } = props

  return (
    <input
      className="border rounded bg-gray-200 focus:bg-white text-gray-800 focus:text-black border-gray-200 focus:border-gray-600 w-full mx-2 px-4 py-2"
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  )
}

export { Button, Input }
