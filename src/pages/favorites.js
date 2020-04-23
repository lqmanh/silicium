import { useState } from 'react'
import { TabTitle } from '../components/common/typography/titles'
import { Tab, TabBar } from '../components/layout'

const Favorites = () => {
  const tabs = ['Favorites']
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

export default Favorites
