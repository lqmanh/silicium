import { observer } from 'mobx-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Icon, IconText } from '../components/common/elements'
import { Button } from '../components/common/form/controls'
import { DivisionTitle, TabTitle } from '../components/common/typography/titles'
import { FavoriteAgentCard } from '../components/favorites'
import { Tab, TabBar } from '../components/layout'
import { useStores } from '../hooks'

const Favorites = observer(() => {
  const tabs = ['Favorite Agents']
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { favoritesStore: favStore } = useStores()
  const title = <DivisionTitle>favorites</DivisionTitle>
  const clear = async (event) => {
    event.preventDefault()
    await favStore.clear()
  }
  const clearButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={clear} key="clear-button">
      <IconText icon={<Icon name="trash-outline" />} text="Clear" />
    </Button>
  )

  return (
    <div>
      <Head>
        <title>Favorites | Silicium</title>
      </Head>
      <TabBar title={title} actions={[clearButton]}>
        {tabs.map((tab, i) => (
          <Tab active={tab === activeTab} onClick={() => setActiveTab(tab)} key={i}>
            <TabTitle>{tab}</TabTitle>
          </Tab>
        ))}
      </TabBar>
      <div className="flex-grow overflow-y-auto px-24 py-6">{activeTab === tabs[0] && <FavoriteAgents />}</div>
    </div>
  )
})

const FavoriteAgents = observer(() => {
  const { favoritesStore: favStore } = useStores()
  useEffect(() => {
    favStore.fetch()
  }, [])

  return (
    <div>
      {favStore.entries.map((entry, i) => (
        <div className="flex -mx-2 mb-6" key={i}>
          <FavoriteAgentCard entry={entry} />
        </div>
      ))}
    </div>
  )
})

export default Favorites
