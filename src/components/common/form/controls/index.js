import { Icon } from '../../elements'

const Button = (props) => {
  const {
    bgColor = 'bg-gray-800',
    borderColor = '',
    textColor = 'text-gray-200 hover:text-white',
    onClick,
    children,
  } = props
  const className = `rounded ${bgColor} ${borderColor} ${textColor} mx-2 px-4 py-2`

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

const Input = (props) => {
  const { width = '', type, placeholder, defaultValue, value, onChange } = props
  const bgColor = 'bg-gray-200 focus:bg-white'
  const borderColor = 'border-gray-200 focus:border-gray-600'
  const textColor = 'text-gray-800 focus:text-black'
  const className = `border rounded shadow-inner ${width} ${bgColor} ${borderColor} ${textColor} mx-2 px-4 py-2`

  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  )
}

const Select = (props) => {
  const { width = '', options = [], value, onChange } = props
  const bgColor = 'bg-gray-200 focus:bg-white'
  const borderColor = 'border-gray-200 focus:border-gray-600'
  const textColor = 'text-gray-800 focus:text-black'
  const className = `appearance-none border rounded shadow-inner w-full ${bgColor} ${borderColor} ${textColor} px-4 py-2 pr-8`

  return (
    <span className={`inline-block relative ${width} mx-2`}>
      <select className={className} value={value} onChange={onChange}>
        {options.map((opt) => (
          <option value={opt.value}>{opt.text || opt.value}</option>
        ))}
      </select>
      <span className="flex items-center absolute inset-y-0 right-0 px-2 pointer-events-none">
        <Icon name="chevron-down-outline" />
      </span>
    </span>
  )
}

export { Button, Input, Select }
