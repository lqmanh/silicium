import { Layout, SideBar } from '../components/layouts'
import { MibBrowserDivision } from '../components/divisions/mib-browser'
import { RequestDivision } from '../components/divisions/request'
import { ResponseDivision } from '../components/divisions/response'

const Index = () => (
  <Layout left={<SideBar />}>
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-1 border-l border-r border-gray-500 p-4">
        <MibBrowserDivision />
      </div>
      <div className="col-span-2 flex flex-col">
        <div className="border-b border-gray-500 p-4">
          <RequestDivision />
        </div>
        <div className="p-4">
          <ResponseDivision />
        </div>
      </div>
    </div>
  </Layout>
)

export default Index
