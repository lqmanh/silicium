import SideBar from './side-bar'

const Layout = (props) => {
  const { children } = props

  return (
    <div className="flex items-stretch bg-white h-screen">
      <aside className="hidden sm:block">
        <SideBar />
      </aside>
      <article className="flex-grow">{children}</article>
    </div>
  )
}

export default Layout
