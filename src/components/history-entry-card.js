import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useStores } from '../hooks'
import { Card, Icon, IconText } from './common/elements'
import { Button } from './common/form/controls'
import { InputField } from './common/form/fields'

const HistoryEntryCard = observer((props) => {
  const { entry } = props
  const { request, response, httpDelay } = entry
  const [expanded, setExpanded] = useState(false)
  const { requestStore: reqStore, responseStore: resStore, historyStore } = useStores()
  const router = useRouter()
  const load = async (event) => {
    event.preventDefault()
    reqStore.fromJson(request)
    resStore.fromJson(response)
    await router.push('/')
  }
  const remove = async (event) => {
    event.preventDefault()
    await historyStore.delete(entry.id)
  }

  return (
    <Card>
      <div className="flex flex-col">
        <div className={`flex items-center justify-between ${expanded ? 'mb-4' : ''}`}>
          <span>
            {request.timestamp.toLocaleString()} &rarr; {response.timestamp.toLocaleString()}&emsp;({httpDelay} ms)
          </span>
          <span>
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? (
                <IconText icon={<Icon name="chevron-up-outline" />} text="Shrink" />
              ) : (
                <IconText icon={<Icon name="chevron-down-outline" />} text="Expand" />
              )}
            </Button>
            <Button onClick={load}>
              <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
            </Button>
            <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={remove}>
              <IconText icon={<Icon name="trash-outline" />} text="Remove" />
            </Button>
          </span>
        </div>
        {expanded && <Details request={request} response={response} />}
      </div>
    </Card>
  )
})

const Details = observer((props) => {
  const { request, response } = props

  return (
    <div className="grid grid-cols-2">
      <div className="col-auto border-r border-gray-400 mr-4 pr-4">
        <h5 className="font-bold uppercase mb-2">request</h5>
        <InputField label="Host" value={request.host} />
        <InputField label="Port" value={request.port} />
        <InputField label="SNMP version" value={request.version} />
        <InputField label="Community" value={request.community} />
        <InputField label="OID" value={request.oid} />
        <InputField label="SNMP method" value={request.method} />
      </div>
      <div className="col-auto">
        <h5 className="font-bold uppercase mb-2">response</h5>
        <InputField label="HTTP status" value={`${response.statusCode} ${response.statusText}`} />
        <InputField label="SNMP delay" value={(response.snmpDelay ?? '-') + ' ms'} />
        <InputField label="Varbind(s)" value={response.varbinds.length} />
      </div>
    </div>
  )
})

export default HistoryEntryCard
