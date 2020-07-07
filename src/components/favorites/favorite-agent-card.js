import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useStores } from '../../hooks'
import { EntryCard, Icon, IconText } from '../common/elements'
import { Button } from '../common/form/controls'
import { InputField } from '../common/form/fields'

export const FavoriteAgentCard = observer((props) => {
  const { entry } = props
  const { requestStore: reqStore, favoritesStore: favStore } = useStores()
  const title = entry.name
  const router = useRouter()
  const load = async (event) => {
    event.preventDefault()
    const { host, port, version, community } = entry
    reqStore.fromJson({ host, port, version, community })
    await router.push('/')
  }
  const loadButton = (
    <Button onClick={load} key="load-button">
      <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
    </Button>
  )
  const remove = async (event) => {
    event.preventDefault()
    await favStore.delete(entry.id)
  }
  const removeButton = (
    <Button bgColor="hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={remove} key="remove-button">
      <IconText icon={<Icon name="close" />} text="Remove" />
    </Button>
  )

  return <EntryCard title={title} actions={[loadButton, removeButton]} body={<Details entry={entry} />} />
})

const Details = observer((props) => {
  const { entry } = props

  return (
    <div>
      <InputField label="Host" value={entry.host} />
      <InputField label="Port" value={entry.port} />
      <InputField label="SNMP version" value={entry.version} />
      {entry.version === '3' ? (
        <InputField label="Username" value={entry.user.username} />
      ) : (
        <InputField label="Community" value={entry.community} />
      )}
    </div>
  )
})
