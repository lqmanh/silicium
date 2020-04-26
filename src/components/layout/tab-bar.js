const TabBar = (props) => {
  const { title, children, actions } = props
  const style = {
    appearance: 'flex items-center justify-center',
    width: 'w-full',
    position: 'relative',
    bg: 'bg-transparent',
    text: '',
    shadow: 'shadow-md',
    space: 'px-6 py-2',
  }

  return (
    <div
      className={`${style.appearance} ${style.width} ${style.position} ${style.bg} ${style.text} ${style.shadow} ${style.space}`}
    >
      <span className="absolute left-0 ml-6">{title}</span>
      <Tabs>{children}</Tabs>
      <span className="absolute right-0 mr-6">
        <span className="-mx-2">{actions}</span>
      </span>
    </div>
  )
}

const Tabs = (props) => {
  const { children } = props
  const style = {
    appearance: 'flex',
    bg: 'bg-gray-200',
    border: 'rounded-full',
    text: '',
    shadow: 'shadow-inner',
    cursor: 'cursor-pointer',
  }

  return (
    <div className={`${style.appearance} ${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.cursor}`}>
      {children}
    </div>
  )
}

const Tab = (props) => {
  const { active, onClick, children } = props
  const style = {
    bg: active ? 'bg-gray-800' : 'bg-transparent',
    border: 'rounded-full',
    text: active ? 'text-gray-200' : '',
    shadow: active ? 'shadow' : '',
    space: 'px-4 py-2',
  }

  return (
    <div className={`${style.bg} ${style.border} ${style.text} ${style.shadow} ${style.space}`} onClick={onClick}>
      {children}
    </div>
  )
}

export { TabBar, Tab }
