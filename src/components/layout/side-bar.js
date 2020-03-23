import Link from 'next/link'
import { useRouter } from 'next/router'

const SideBar = () => {
  return (
    <nav className="flex flex-col bg-gray-800 text-white h-full py-4">
      <p className="flex px-4 pb-4">
        <ion-icon name="logo-ionic" style={{ fontSize: 24 }} />
      </p>

      <Entry href="/" iconName="home-outline" />
      <Entry href="/favorites" iconName="star-outline" />
      <Entry href="/history" iconName="time-outline" />
      <Entry href="/generator" iconName="construct-outline" />
    </nav>
  )
}

const Entry = (props) => {
  const { href, iconName } = props
  const { pathname } = useRouter()
  const active = href === pathname
  const className =
    'flex px-4 py-3 ' + (active ? 'bg-gray-700' : 'text-gray-600 hover:text-white')

  return (
    <Link href={href}>
      <a className={className}>
        <ion-icon name={iconName} style={{ fontSize: 24 }} />
      </a>
    </Link>
  )
}

export default SideBar
