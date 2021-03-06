import Head from 'next/head'
import { MibBrowserDivision } from '../components/divisions/mib-browser'
import { RequestDivision } from '../components/divisions/request'
import { ResponseDivision } from '../components/divisions/response'

const Index = () => (
  <div className="grid grid-cols-3 h-full">
    <Head>
      <title>Dashboard | Silicium</title>
    </Head>
    <div className="col-span-1 flex flex-col h-screen">
      <div id="mib-browser" className="flex-grow border-r border-gray-400 px-6 py-4 overflow-y-auto">
        <MibBrowserDivision />
      </div>
    </div>
    <div className="col-span-2 flex flex-col h-screen">
      <div className="border-b border-gray-400 px-6 py-4">
        <RequestDivision />
      </div>
      <div className="flex-grow px-6 py-4 overflow-y-auto">
        <ResponseDivision />
      </div>
    </div>
  </div>
)

export default Index
