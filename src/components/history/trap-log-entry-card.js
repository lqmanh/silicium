import { observer } from 'mobx-react'
import { useStores } from '../../hooks'
import { EntryCard, Icon, IconText } from '../common/elements'
import { Button } from '../common/form/controls'
import { InputField } from '../common/form/fields'

export const TrapLogEntryCard = observer((props) => {
  const { entry } = props
  const { id, remoteHostname, transportAddress, varbinds, timestamp } = entry
  const { trapLogStore } = useStores()
  const title = timestamp.toLocaleString()
  const remove = async (event) => {
    event.preventDefault()
    await trapLogStore.delete(id)
  }
  const removeButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={remove} key="remove-button">
      <IconText icon={<Icon name="close" />} text="Remove" />
    </Button>
  )

  return (
    <EntryCard
      title={title}
      actions={[removeButton]}
      body={<Details remoteHostname={remoteHostname} transportAddress={transportAddress} varbinds={varbinds} />}
    />
  )
})

const Details = observer((props) => {
  const { remoteHostname, transportAddress, varbinds } = props

  return (
    <div>
      <InputField label="Remote hostname" value={remoteHostname} />
      <div className="my-2">
        <h5 className="font-bold uppercase">transport address</h5>
        <InputField label="Protocol" value={transportAddress.protocol} />
        <InputField label="Remote address" value={transportAddress.remoteAddress} />
        <InputField label="Local address" value={transportAddress.localAddress} />
      </div>
      <InputField label="Varbind(s)" value={varbinds.length} />
    </div>
  )
})
