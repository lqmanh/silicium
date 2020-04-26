import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useStores } from '../../hooks'
import { EntryCard, Icon, IconText } from '../common/elements'
import { Button } from '../common/form/controls'
import { InputField } from '../common/form/fields'

export const SnmpClientHistoryEntryCard = observer((props) => {
  const { entry } = props
  const { id, request, response, httpDelay } = entry
  const { requestStore: reqStore, responseStore: resStore, historyStore } = useStores()
  const title = (
    <>
      {request.timestamp.toLocaleString()} &rarr; {response.timestamp.toLocaleString()}
      &emsp;({httpDelay} ms)
    </>
  )
  const router = useRouter()
  const load = async (event) => {
    event.preventDefault()
    reqStore.fromJson(request)
    resStore.fromJson(response)
    await router.push('/')
  }
  const loadButton = (
    <Button onClick={load} key="load-button">
      <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
    </Button>
  )
  const remove = async (event) => {
    event.preventDefault()
    await historyStore.delete(id)
  }
  const removeButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={remove} key="remove-button">
      <IconText icon={<Icon name="close" />} text="Remove" />
    </Button>
  )

  return (
    <EntryCard
      title={title}
      actions={[loadButton, removeButton]}
      body={<Details request={request} response={response} />}
    />
  )
})

const Details = observer((props) => {
  const { request, response } = props

  return (
    <div className="grid grid-cols-2">
      <div className="col-auto border-r border-gray-400 mr-4 pr-4">
        <h5 className="font-bold uppercase">request</h5>
        <InputField label="Host" value={request.host} />
        <InputField label="Port" value={request.port} />
        <InputField label="SNMP version" value={request.version} />
        <InputField label="Community" value={request.community} />
        <InputField label="OID" value={request.oid} />
        <InputField label="SNMP method" value={request.method} />
      </div>
      <div className="col-auto">
        <h5 className="font-bold uppercase">response</h5>
        <InputField label="HTTP status" value={`${response.statusCode} ${response.statusText}`} />
        <InputField label="SNMP delay" value={(response.snmpDelay ?? '-') + ' ms'} />
        <InputField label="Varbind(s)" value={response.varbinds.length} />
      </div>
    </div>
  )
})
