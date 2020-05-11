import { observer } from 'mobx-react'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStores } from '../../../hooks'
import { ListEntry } from '../../common/elements'

export const MibList = observer(() => {
  const { mibStore } = useStores()
  const { mibs } = mibStore
  const pageSize = 50
  const [page, setPage] = useState(0)
  const load = (event) => {
    event.preventDefault()
  }
  const next = () => {
    setPage(page + 1)
  }
  const start = page * pageSize
  const slice = mibs.slice(start, start + pageSize)

  return (
    <InfiniteScroll
      dataLength={slice.length}
      hasMore={slice.length < mibs.length + pageSize}
      next={next}
      scrollableTarget="mib-browser"
    >
      {slice.map((mib, i) => (
        <ListEntry key={i}>
          <div className="flex items-center justify-between" onClick={load}>
            <span className="truncate">{mib.name}</span>
            <span className="text-gray-700">{mib.type}</span>
          </div>
        </ListEntry>
      ))}
    </InfiniteScroll>
  )
})
