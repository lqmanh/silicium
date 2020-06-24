import { observer } from 'mobx-react'
import { useStores } from '../../../hooks'
import { ListEntry } from '../../common/elements'

export const MibList = observer(() => {
  const { requestStore: reqStore, mibStore } = useStores()
  const { mibs } = mibStore
  const load = (oid) => (event) => {
    event.preventDefault()
    reqStore.oid = oid
  }

  return (
    <>
      {mibs.map((mib, i) => (
        <ListEntry key={i}>
          <div className="flex items-center justify-between" onClick={load(mib.name)}>
            <span className="truncate">{mib.name}</span>
            <span className="opacity-75">{mib.type}</span>
          </div>
        </ListEntry>
      ))}
    </>
  )
})
