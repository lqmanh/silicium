import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useStores } from '../../hooks'
import { EntryCard, Icon, IconText } from '../common/elements'
import { Button } from '../common/form/controls'

export const FavoriteAgentCard = observer((props) => {
  const { entry } = props
  const { favoritesStore: favStore } = useStores()
  const title = entry.name
  const router = useRouter()
  const load = async (event) => {
    event.preventDefault()
    await router.push('/')
  }
  const loadButton = (
    <Button onClick={load} key="load-button">
      <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
    </Button>
  )
  const remove = async (event) => {
    event.preventDefault()
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
  console.log(entry)

  return null
})
