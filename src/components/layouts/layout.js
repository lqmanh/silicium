const Layout = (props) => {
  const { left, children } = props

  return (
    <article className="flex items-stretch h-screen">
      <aside className="hidden sm:block h-full">{left}</aside>
      <section className="flex-grow h-full">{children}</section>
    </article>
  )
}

export default Layout
