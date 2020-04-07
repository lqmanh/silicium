import { MibBrowserDivision } from '../components/divisions/mib-browser'
import { RequestDivision } from '../components/divisions/request'
import { ResponseDivision } from '../components/divisions/response'

const Index = () => (
  <div className="grid grid-cols-3 h-full">
    <div className="col-span-1 border-r border-gray-400 px-6 py-4">
      <MibBrowserDivision />
    </div>
    <div className="col-span-2 flex flex-col h-screen">
      <div className="border-b border-gray-400 px-6 py-4">
        <RequestDivision />
      </div>
      <div className="flex-grow overflow-y-auto px-6 py-4">
        <ResponseDivision />
      </div>
    </div>
  </div>
)

export default Index
