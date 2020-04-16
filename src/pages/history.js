import { useState } from 'react'
import { DivisionTitle } from '../components/common/typography/titles'
import { Tab, TabBar } from '../components/layout'

const History = () => {
  const tabs = ['snmp client history', 'trap/inform logs']
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div>
      <TabBar>
        {tabs.map((tab, i) => (
          <Tab active={tab === activeTab} onClick={() => setActiveTab(tab)} key={i}>
            <DivisionTitle>{tab}</DivisionTitle>
          </Tab>
        ))}
      </TabBar>
    </div>
  )
}

export default History
