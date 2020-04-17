const DivisionTitle = (props) => {
  const { children } = props

  return <h5 className="uppercase">{children}</h5>
}

const TabTitle = (props) => {
  const { children } = props

  return <h5>{children}</h5>
}

export { DivisionTitle, TabTitle }
