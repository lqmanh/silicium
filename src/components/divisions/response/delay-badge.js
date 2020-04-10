import { observer } from 'mobx-react'
import { Badge } from '../../common/elements'

const DelayBadge = observer((props) => {
  const { snmpDelay, httpDelay } = props

  return (
    <Badge bgColor="bg-blue-200" textColor="text-blue-600">
      {snmpDelay ? <span className="font-bold">{snmpDelay}</span> : <span>&ndash;</span>}
      <span>&nbsp;ms</span>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span className="font-bold">{httpDelay}</span>
      <span>&nbsp;ms</span>
    </Badge>
  )
})

export default DelayBadge
