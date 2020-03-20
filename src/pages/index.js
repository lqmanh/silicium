import { Layout, SideBar } from '../components/layouts'
import { MibBrowser } from '../components/divisions/mib-browser'

const Index = () => (
  <Layout left={<SideBar />}>
    <MibBrowser />
  </Layout>
)

export default Index
