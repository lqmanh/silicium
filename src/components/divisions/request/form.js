import { Button, Input } from '../../common/form/controls'

const RequestForm = () => {
  return (
    <form className="mt-6">
      <div className="flex -mx-2 mb-4">
        <Input placeholder="Host" defaultValue="localhost" />
        <Input type="number" placeholder="Port" defaultValue="161" />
        <Input placeholder="SNMP version" defaultValue="v2c" />
        <Input placeholder="Community" defaultValue="public" />
      </div>
      <div className="flex -mx-2 mb-4">
        <Input placeholder="Object identifier" />
        <Input placeholder="SNMP method" defaultValue="GET" />
      </div>
      <div className="flex justify-between -mx-2">
        <span className="">
          <Button bgColor="bg-blue-600" isPill>
            Send
          </Button>
          <Button
            bgColor="bg-transparent hover:bg-red-600"
            textColor="text-red-600 hover:text-white"
          >
            Clear
          </Button>
        </span>
        <span className="">
          <Button
            bgColor="bg-transparent hover:bg-red-600"
            textColor="text-red-600 hover:text-white"
          >
            Reset to default
          </Button>
          <Button
            bgColor="bg-transparent hover:bg-gray-800"
            textColor="text-gray-800 hover:text-white"
          >
            Save as default
          </Button>
        </span>
      </div>
    </form>
  )
}

export default RequestForm
