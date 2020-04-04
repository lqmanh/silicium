import { Icon } from '../../elements'

const Button = (props) => {
  const { bgColor = 'bg-gray-800', textColor = 'text-gray-200 hover:text-white', onClick, children } = props
  const border = 'rounded'
  const space = 'mx-2 px-4 py-2'

  return (
    <button className={`${bgColor} ${border} ${textColor} ${space}`} onClick={onClick}>
      {children}
    </button>
  )
}

const Input = (props) => {
  const { width = '', type, placeholder, defaultValue, value, onChange } = props
  const bgColor = 'bg-gray-200 focus:bg-white'
  const border = 'rounded border border-gray-200 focus:border-gray-600'
  const textColor = 'text-gray-800 focus:text-black'
  const shadow = 'shadow-inner'
  const space = 'mx-2 px-4 py-2'

  return (
    <input
      className={`appearance-none outline-none ${width} ${bgColor} ${border} ${textColor} ${shadow} ${space}`}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  )
}

const Select = (props) => {
  const { width = '', options = [], defaultValue, value, onChange } = props
  const selectWidth = 'w-full'
  const bgColor = 'bg-gray-200 focus:bg-white'
  const border = 'rounded border border-gray-200 focus:border-gray-600'
  const textColor = 'text-gray-800 focus:text-black'
  const shadow = 'shadow-inner'
  const space = 'px-4 py-2 pr-8'

  return (
    <span className={`inline-block relative ${width} mx-2`}>
      <select
        className={`appearance-none outline-none ${selectWidth} ${bgColor} ${border} ${textColor} ${shadow} ${space}`}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.text || opt.value}
          </option>
        ))}
      </select>
      <span className="flex items-center absolute inset-y-0 right-0 px-2 pointer-events-none">
        <Icon name="chevron-down-outline" />
      </span>
    </span>
  )
}

export { Button, Input, Select }
