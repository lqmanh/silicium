import { observer } from 'mobx-react'
import { useState } from 'react'
import { Card, Icon, IconText } from './common/elements'
import { Button } from './common/form/controls'
import { InputField } from './common/form/fields'

const HistoryEntryCard = observer(() => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <div className="flex flex-col">
        <div className={`flex items-center justify-between ${expanded ? 'mb-4' : ''}`}>
          <span>2020-04-18 00:00:00 &rarr; 2020-04-18 00:01:17</span>
          <span>
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? (
                <IconText icon={<Icon name="chevron-up-outline" />} text="Shrink" />
              ) : (
                <IconText icon={<Icon name="chevron-down-outline" />} text="Expand" />
              )}
            </Button>
            <Button>
              <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
            </Button>
            <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white">
              <IconText icon={<Icon name="trash-outline" />} text="Remove" />
            </Button>
          </span>
        </div>
        {expanded && <Details />}
      </div>
    </Card>
  )
})

const Details = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-auto border-r border-gray-400">
        <h5 className="font-bold uppercase mb-2">request</h5>
        <InputField label="Host" value="localhost" />
        <InputField label="Port" value="161" />
        <InputField label="SNMP version" value="2c" />
        <InputField label="Community" value="public" />
        <InputField label="OID" value="" />
        <InputField label="SNMP method" value="GET" />
      </div>
      <div className="col-auto">
        <h5 className="font-bold uppercase mb-2">response</h5>
        <InputField label="HTTP status" value="200 OK" />
        <InputField label="SNMP delay" value="69 ms" />
        <InputField label="Varbind(s)" value="1" />
      </div>
    </div>
  )
}

export default HistoryEntryCard
