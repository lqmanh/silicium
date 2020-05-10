import { observer } from 'mobx-react'
import { useStores } from '../../../hooks'
import { Icon, IconText } from '../../common/elements'
import { Button } from '../../common/form/controls'
import { DivisionTitle } from '../../common/typography/titles'

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
        <span></span>
      </div>
      <div className="flex items-center -mx-2">
        <Button bgColor="bg-blue-600" textColor="text-gray-200 hover:text-white" onClick={submit}>
          <IconText icon={<Icon name="refresh-outline" />} text="Load MIB tree" />
        </Button>
      </div>
    </section>
  )
})

export default MibBrowserDivision
