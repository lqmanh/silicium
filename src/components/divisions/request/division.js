import { observer } from 'mobx-react'
import { useState } from 'react'
import { useStores } from '../../../hooks'
import { Icon, IconText } from '../../common/elements/index'
import { Button, Input, Select } from '../../common/form/controls'
import { DivisionTitle } from '../../common/typography/titles'
import { LfFModal, StFModal } from './favorites-modal'

const RequestDivision = observer(() => {
  const versions = [
    { value: '1', text: 'SNMP v1' },
    { value: '2c', text: 'SNMP v2c' },
    { value: '3', text: 'SNMP v3' },
  ]
  const methods = [{ value: 'GET' }, { value: 'GETNEXT' }, { value: 'GETBULK' }, { value: 'WALK' }]
  const authProtocols = [
    { value: 'MD5' },
    { value: 'SHA' },
    { value: 'SHA-512' },
    { value: 'SHA-384' },
    { value: 'SHA-256' },
    { value: 'SHA-224' },
  ]
  const privProtocols = [{ value: 'DES' }, { value: 'AES' }]

  const { requestStore: reqStore, responseStore: resStore, historyStore } = useStores()
  const [isModalOpen, setModalOpen] = useState('')
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
    setModalOpen('save')
  }
  const loadFromFavorites = (event) => {
    event.preventDefault()
    setModalOpen('load')
  }
  const closeModal = () => {
    setModalOpen('')
  }

  return (
    <section>
      <form className="" onSubmit={submit}>
        <div className="flex items-center justify-between -mx-2 mb-4">
          <span className="mx-2">
            <DivisionTitle>request</DivisionTitle>
          </span>
          <span>
            <Button onClick={loadFromFavorites}>
              <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
            </Button>
            <Button onClick={saveToFavorites}>
              <IconText icon={<Icon name="star-outline" />} text="Save" />
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
          {reqStore.version === '3' ? (
            <Input
              width="w-full"
              placeholder="Username"
              value={reqStore.user.username}
              onChange={(event) => {
                reqStore.user.username = event.target.value
              }}
            />
          ) : (
            <Input
              width="w-full"
              name="community"
              placeholder="Community"
              value={reqStore.community}
              onChange={updateField}
            />
          )}
        </div>
        {reqStore.version === '3' ? (
          <div className="flex -mx-2 mb-4">
            <Select
              width="w-1/4"
              value={reqStore.user.authProtocol}
              options={authProtocols}
              onChange={(event) => {
                reqStore.user.authProtocol = event.target.value
              }}
            />
            <Input
              width="w-full"
              placeholder="Authentication password"
              value={reqStore.user.authPassword}
              onChange={(event) => {
                reqStore.user.authPassword = event.target.value
              }}
            />
          </div>
        ) : null}
        {reqStore.version === '3' ? (
          <div className="flex -mx-2 mb-4">
            <Select
              width="w-1/4"
              value={reqStore.user.privProtocol}
              options={privProtocols}
              onChange={(event) => {
                reqStore.user.privProtocol = event.target.value
              }}
            />
            <Input
              width="w-full"
              placeholder="Privacy password"
              value={reqStore.user.privPassword}
              onChange={(event) => {
                reqStore.user.privPassword = event.target.value
              }}
            />
          </div>
        ) : null}
        <div className="flex -mx-2">
          <Input
            width="w-full"
            name="oid"
            placeholder="Object identifier"
            value={reqStore.oid}
            onChange={updateField}
          />
          <Select width="w-1/4" name="method" value={reqStore.method} onChange={updateField} options={methods} />
          <Button
            bgColor="bg-blue-600"
            textColor="text-gray-200 hover:text-white"
            onClick={submit}
            disabled={reqStore.method === 'WALK'}
          >
            <IconText icon={<Icon name="send-outline" />} text="Send" />
          </Button>
        </div>
      </form>
      <LfFModal isOpen={isModalOpen === 'load'} onRequestClose={closeModal} />
      <StFModal isOpen={isModalOpen === 'save'} onRequestClose={closeModal} />
    </section>
  )
})

export default RequestDivision
