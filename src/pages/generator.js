import { useState } from 'react'
import { TabTitle } from '../components/common/typography/titles'
import { Tab, TabBar } from '../components/layout'

const Generator = () => {
  const tabs = ['Prometheus', 'Icinga 2']
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div>
      <TabBar>
        {tabs.map((tab, i) => (
          <Tab active={tab === activeTab} onClick={() => setActiveTab(tab)} key={i}>
            <TabTitle>{tab}</TabTitle>
          </Tab>
        ))}
      </TabBar>
    </div>
  )
}

export default Generator
