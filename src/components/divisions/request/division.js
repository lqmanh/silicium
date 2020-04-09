import { useContext } from 'react'
import { Icon, IconText } from '../../common/elements/index'
import { Button, Input, Select } from '../../common/form/controls'
import { DivisionTitle } from '../../common/typography/titles'

const versions = [
  { value: '1', text: 'SNMP v1' },
  { value: '2c', text: 'SNMP v2c' },
  { value: '3', text: 'SNMP v3' },
]
const methods = [{ value: 'GET' }, { value: 'GETNEXT' }, { value: 'GETBULK' }]

const RequestDivision = () => {
  return (
    <section>
      <form className="">
        <div className="flex items-center justify-between -mx-2 mb-4">
          <span className="mx-2">
            <DivisionTitle>request</DivisionTitle>
          </span>
          <span>
            <Button bgColor="bg-transparent hover:bg-red-600" textColor="text-red-600 hover:text-white">
              <IconText icon={<Icon name="trash-outline" />} text="Clear" />
            </Button>
            <Button>
              <IconText icon={<Icon name="cloud-upload-outline" />} text="Load" />
            </Button>
            <Button>
              <IconText icon={<Icon name="cloud-download-outline" />} text="Save" />
            </Button>
          </span>
        </div>
        <div className="flex -mx-2 mb-4">
          <Input width="w-full" placeholder="Host" defaultValue="localhost" />
          <Input type="number" placeholder="Port" defaultValue="161" />
        </div>
        <div className="flex -mx-2 mb-4">
          <Select width="w-1/4" options={versions} defaultValue="v2c" />
          <Input width="w-full" placeholder="Community" defaultValue="public" />
        </div>
        <div className="flex -mx-2">
          <Input width="w-full" placeholder="Object identifier" />
          <Select width="w-1/4" options={methods} defaultValue="GET" />
          <Button bgColor="bg-blue-600" textColor="text-gray-200 hover:text-white">
            <IconText icon={<Icon name="send-outline" />} text="Send" />
          </Button>
        </div>
      </form>
    </section>
  )
}

export default RequestDivision
