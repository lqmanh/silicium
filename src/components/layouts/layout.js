const Layout = (props) => {
  const { left, children } = props

  return (
    <div className="flex items-stretch h-screen">
      <aside className="hidden sm:block">{left}</aside>
      <article className="flex-grow">{children}</article>
    </div>
  )
}

export default Layout
