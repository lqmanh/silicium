import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '../common/elements'

const SideBar = () => {
  return (
    <nav className="flex flex-col bg-gray-800 text-white h-full py-4">
      <p className="px-4 pb-4">
        <Icon name="logo-ionic" size={24} />
      </p>

      <Entry href="/" iconName="home-outline" />
      <Entry href="/favorites" iconName="star-outline" />
      <Entry href="/history" iconName="time-outline" />
    </nav>
  )
}

const Entry = (props) => {
  const { href, iconName } = props
  const { pathname } = useRouter()
  const active = href === pathname

  return (
    <Link href={href}>
      <a className={'p-4 ' + (active ? 'bg-gray-700' : 'text-gray-600 hover:text-white')}>
        <Icon name={iconName} size={24} />
      </a>
    </Link>
  )
}

export default SideBar
