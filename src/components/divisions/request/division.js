import { observer } from 'mobx-react'
import { useState } from 'react'
import { useStores } from '../../../hooks'
import { Icon, IconText } from '../../common/elements/index'
import { Button, Input, Select } from '../../common/form/controls'
import { DivisionTitle } from '../../common/typography/titles'
import { FavoritesModal } from './favorites-modal'

const RequestDivision = observer(() => {
  const versions = [
    { value: '1', text: 'SNMP v1' },
    { value: '2c', text: 'SNMP v2c' },
    { value: '3', text: 'SNMP v3' },
  ]
  const methods = [{ value: 'GET' }, { value: 'GETNEXT' }, { value: 'GETBULK' }, { value: 'WALK' }]

  const { requestStore: reqStore, responseStore: resStore, historyStore } = useStores()
  const [isModalOpen, setModalOpen] = useState(false)
  const updateField = (event) => {
    const { name, value } = event.target
    reqStore[name] = value
  }
  const submit = async (event) => {
    event.preventDefault()
    resStore.clear()
    const res = await reqStore.send()
    resStore.fromResponse(res)
    historyStore.add(reqStore.json, resStore.json)
  }
  const clear = (event) => {
    event.preventDefault()
    reqStore.clear()
    resStore.clear()
  }
  const saveToFavorites = (event) => {
    event.preventDefault()
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <section>
      <form className="" onSubmit={submit}>
        <div className="flex items-center justify-between -mx-2 mb-4">
          <span className="mx-2">
            <DivisionTitle>request</DivisionTitle>
          </span>
          <span>
            <Button onClick={saveToFavorites}>
              <IconText icon={<Icon name="star-outline" />} text="Save to Favorites" />
            </Button>
            <Button bgColor="bg-transparent hover:bg-red-600" textColor="text-red-600 hover:text-white" onClick={clear}>
              <IconText icon={<Icon name="trash-outline" />} text="Clear" />
            </Button>
          </span>
        </div>
        <div className="flex -mx-2 mb-4">
          <Input width="w-full" name="host" placeholder="Host" value={reqStore.host} onChange={updateField} />
          <Input type="number" name="port" placeholder="Port" value={reqStore.port} onChange={updateField} />
        </div>
        <div className="flex -mx-2 mb-4">
          <Select width="w-1/4" name="version" value={reqStore.version} onChange={updateField} options={versions} />
          <Input
            width="w-full"
            name="community"
            placeholder="Community"
            value={reqStore.community}
            onChange={updateField}
          />
        </div>
        <div className="flex -mx-2">
          <Input
            width="w-full"
            name="oid"
            placeholder="Object identifier"
            value={reqStore.oid}
            onChange={updateField}
          />
          <Select width="w-1/4" name="method" value={reqStore.method} onChange={updateField} options={methods} />
          <Button bgColor="bg-blue-600" textColor="text-gray-200 hover:text-white" onClick={submit}>
            <IconText icon={<Icon name="send-outline" />} text="Send" />
          </Button>
        </div>
      </form>
      <FavoritesModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </section>
  )
})

export default RequestDivision
