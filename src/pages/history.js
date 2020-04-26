import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { TabTitle } from '../components/common/typography/titles'
import { SnmpClientHistoryEntryCard } from '../components/history'
import { Tab, TabBar } from '../components/layout'
import { useStores } from '../hooks'

const History = () => {
  const tabs = ['SNMP Client History', 'TRAP/INFORM Log']
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="flex flex-col h-screen">
      <TabBar>
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

const TrapLog = () => null

export default History
