import { observer } from 'mobx-react'
import { useStores } from '../../../hooks'
import { Icon, IconText } from '../../common/elements'
import { Button } from '../../common/form/controls'
import { DivisionTitle } from '../../common/typography/titles'
import { MibList } from './mib-list'

const MibBrowserDivision = observer(() => {
  const { requestStore: reqStore, mibStore } = useStores()
  const submit = async (event) => {
    event.preventDefault()
    const res = await reqStore.loadMibTree()
    mibStore.fromResponse(res)
  }

  return (
    <section>
      <div className="flex items-center justify-between -mx-2 mb-4">
        <span className="mx-2">
          <DivisionTitle>mib browser</DivisionTitle>
        </span>
        <span>
          <Button bgColor="bg-blue-600" textColor="text-gray-200 hover:text-white" onClick={submit}>
            <IconText icon={<Icon name="refresh-outline" />} text="Refresh" />
          </Button>
        </span>
      </div>
      <div className="flex flex-col -mx-2 mb-4">
        <MibList />
      </div>
    </section>
  )
})

export default MibBrowserDivision
