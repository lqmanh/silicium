const TabBar = (props) => {
  const { children } = props
  const style = {
    appearance: 'flex items-center justify-center',
    width: 'w-full',
    bg: 'bg-transparent',
    text: '',
    shadow: 'shadow',
    space: 'p-4',
  }

  return (
    <div className={`${style.appearance} ${style.width} ${style.bg} ${style.text} ${style.shadow} ${style.space}`}>
      <Tabs>{children}</Tabs>
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
