import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useStores } from '../../../hooks'
import { SnmpAgent } from '../../../stores'
import { Icon, IconText } from '../../common/elements'
import { Button, Input } from '../../common/form/controls'

export const FavoritesModal = observer((props) => {
  const { isOpen, onRequestClose } = props
  const [entryName, setEntryName] = useState('')
  const { requestStore: reqStore, favoritesStore: favStore } = useStores()
  useEffect(() => {
    favStore.fetch()
  }, [])
  const updateEntryName = (event) => {
    event.preventDefault()
    setEntryName(event.target.value)
  }
  const clear = (event) => {
    event.preventDefault()
    setEntryName('')
  }
  const save = async (event) => {
    event.preventDefault()

    const trimmedEntryName = entryName.trim()
    if (trimmedEntryName.length < 6 || trimmedEntryName.length > 48) {
      console.error('Invalid entry name')
      return
    }

    const { host, port, version, community } = reqStore.json
    let agent = favStore.entries.find((entry) => {
      return entry.name === trimmedEntryName
    })
    if (!agent) {
      agent = new SnmpAgent({ name: trimmedEntryName, host, port, version, community })
      await favStore.add(agent.json)
    } else {
      agent.fromJson({ host, port, version, community })
      await favStore.update(agent.id, agent.json)
    }
    await favStore.fetch()
  }

  const suggestions = favStore.entries.filter((entry) => {
    return entry.name.toLowerCase().includes(entryName.toLowerCase())
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(45, 55, 72, 0.75)',
        },
        content: {
          width: '50%',
          maxWidth: '500px',
          height: '75%',
          maxHeight: '600px',
          border: 'none',
          margin: 'auto',
          padding: '1rem 1.5rem',
        },
      }}
    >
      <form>
        <div className="flex -mx-2 mb-6">
          <Input width="w-full" placeholder="Entry name" value={entryName} onChange={updateEntryName} required />
          <Button bgColor="bg-transparent hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={clear}>
            <IconText icon={<Icon name="trash-outline" />} text="Clear" />
          </Button>
          <Button bgColor="bg-blue-600" textColor="text-gray-200 hover:text-white" type="submit" onClick={save}>
            <IconText icon={<Icon name="save-outline" />} text="Save" />
          </Button>
        </div>
        {suggestions.map((entry, i) => (
          <Entry name={entry.name} host={entry.host} onClick={updateEntryName} key={i} />
        ))}
      </form>
    </Modal>
  )
})

const Entry = observer((props) => {
  const { name, host, onClick } = props
  const load = (event) => {
    event.target.value = name
    onClick(event)
  }

  const style = {
    appearance: 'flex items-center justify-between',
    bg: 'hover:bg-gray-200',
    border: 'rounded',
    text: 'hover:text-black',
    cursor: 'cursor-pointer',
    space: 'px-4 py-2',
  }

  return (
    <div
      className={`${style.appearance} ${style.bg} ${style.border} ${style.text} ${style.cursor} ${style.space}`}
      onClick={load}
    >
      <span>{name}</span>
      <span className="text-opacity-75">{host}</span>
    </div>
  )
})
