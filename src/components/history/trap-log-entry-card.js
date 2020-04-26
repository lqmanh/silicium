import { observer } from 'mobx-react'
import { EntryCard, Icon, IconText } from '../common/elements'
import { Button } from '../common/form/controls'
import { InputField } from '../common/form/fields'

export const TrapLogEntryCard = observer((props) => {
  const { entry } = props
  const { id, remoteHostname, transportAddress, varbinds, timestamp } = entry
  const title = timestamp.toLocaleString()
  const remove = async (event) => {
    event.preventDefault()
    console.log(id)
  }
  const removeButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={remove}>
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
      <InputField label="Transport address" value={transportAddress} />
      <InputField label="Varbind(s)" value={varbinds.length} />
    </div>
  )
})
