import { useState } from 'react'
import { TabTitle } from '../components/common/typography/titles'
import HistoryEntryCard from '../components/history-entry-card'
import { Tab, TabBar } from '../components/layout'

const History = () => {
  const tabs = ['SNMP Client History', 'TRAP/INFORM Logs']
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
        {activeTab === tabs[1] && <TrapLogs />}
      </div>
    </div>
  )
}

const SnmpClientHistory = () => {
  return (
    <div>
      <div className="flex -mx-2 mb-6">
        <HistoryEntryCard />
      </div>
      <div className="flex -mx-2 mb-6">
        <HistoryEntryCard />
      </div>
      <div className="flex -mx-2 mb-6">
        <HistoryEntryCard />
      </div>
      <div className="flex -mx-2 mb-6">
        <HistoryEntryCard />
      </div>
    </div>
  )
}

const TrapLogs = () => null

export default History
