import { Icon } from '../../elements'

const Button = (props) => {
  const { bgColor = 'bg-transparent', textColor = 'hover:text-black', type, onClick, disabled, children } = props
  const style = {
    appearance: disabled ? 'opacity-75' : '',
    bg: bgColor,
    border: 'rounded',
    text: textColor,
    shadow: 'shadow hover:shadow-md',
    cursor: disabled ? 'cursor-not-allowed' : '',
    space: 'mx-2 px-4 py-2',
  }

  return (
    <button
      className={`${style.appearance} ${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.cursor} ${style.space}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Input = (props) => {
  const { width = '', type, name, placeholder, defaultValue, value, onChange, required } = props
  const style = {
    appearance: 'appearance-none outline-none',
    width,
    bg: 'bg-gray-200 focus:bg-white',
    border: 'rounded border border-gray-200 focus:border-gray-600',
    text: 'focus:text-black',
    shadow: 'shadow-inner',
    space: 'mx-2 px-4 py-2',
  }

  return (
    <input
      className={`${style.appearance} ${style.width} ${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.space}`}
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}

const Select = (props) => {
  const { width = '', name, defaultValue, value, onChange, options = [] } = props
  const style = {
    appearance: 'appearance-none outline-none',
    innerWidth: 'w-full',
    bg: 'bg-gray-200 focus:bg-white',
    border: 'rounded border border-gray-200 focus:border-gray-600',
    text: 'focus:text-black',
    shadow: 'shadow hover:shadow-md',
    space: 'px-4 py-2 pr-8',
  }

  return (
    <span className={`inline-block relative ${width} mx-2`}>
      <select
        className={`${style.appearance} ${style.innerWidth} ${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.space}`}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <option value={opt.value} key={i}>
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
