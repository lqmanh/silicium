import { useState } from 'react'
import { DivisionTitle } from '../components/common/typography/titles'
import { Tab, TabBar } from '../components/layout'

const Favorites = () => {
  const tabs = ['favorites']
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

export default Favorites
