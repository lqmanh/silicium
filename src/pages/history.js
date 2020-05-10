import { observer } from 'mobx-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Icon, IconText } from '../components/common/elements'
import { Button } from '../components/common/form/controls'
import { DivisionTitle, TabTitle } from '../components/common/typography/titles'
import { SnmpClientHistoryEntryCard, TrapLogEntryCard } from '../components/history'
import { Tab, TabBar } from '../components/layout'
import { useStores } from '../hooks'

const History = () => {
  const tabs = ['SNMP Client History', 'TRAP/INFORM Log']
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { historyStore, trapLogStore } = useStores()
  const title = <DivisionTitle>history</DivisionTitle>
  const clear = async (event) => {
    event.preventDefault()
    if (activeTab === tabs[0]) await historyStore.clear()
    else if (activeTab === tabs[1]) await trapLogStore.clear()
  }
  const clearButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={clear} key="clear-button">
      <IconText icon={<Icon name="trash-outline" />} text="Clear" />
    </Button>
  )

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>History | Silicium</title>
      </Head>
      <TabBar title={title} actions={[clearButton]}>
        {tabs.map((tab, i) => (
          <Tab active={tab === activeTab} onClick={() => setActiveTab(tab)} key={i}>
            <TabTitle>{tab}</TabTitle>
          </Tab>
        ))}
      </TabBar>
      <div className="flex-grow overflow-y-auto px-24 py-6">
        {activeTab === tabs[0] && <SnmpClientHistory />}
        {activeTab === tabs[1] && <TrapLog />}
      </div>
    </div>
  )
}

const SnmpClientHistory = observer(() => {
  const { historyStore } = useStores()
  useEffect(() => {
    historyStore.fetch()
  }, [])

  return (
    <div>
      {historyStore.entries.map((entry, i) => (
        <div className="flex -mx-2 mb-6" key={i}>
          <SnmpClientHistoryEntryCard entry={entry} />
        </div>
      ))}
    </div>
  )
})

const TrapLog = observer(() => {
  const { trapLogStore } = useStores()
  useEffect(() => {
    trapLogStore.fetch()
  }, [])

  return (
    <div>
      {trapLogStore.entries.map((entry, i) => (
        <div className="flex -mx-2 mb-6" key={i}>
          <TrapLogEntryCard entry={entry} />
        </div>
      ))}
    </div>
  )
})

export default History
