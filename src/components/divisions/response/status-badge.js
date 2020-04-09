import { observer } from 'mobx-react'
import { Badge } from '../../common/elements'

const StatusBadge = observer((props) => {
  const { statusCode, statusText } = props
  let bgColor = 'bg-gray-200'
  let textColor = 'text-gray-600'
  if (statusCode < 200) {
  } else if (statusCode < 300) {
    bgColor = 'bg-green-200'
    textColor = 'text-green-600'
  } else if (statusCode < 400) {
  } else if (statusCode < 500) {
    bgColor = 'bg-yellow-200'
    textColor = 'text-yellow-600'
  } else {
    bgColor = 'bg-red-200'
    textColor = 'text-red-600'
  }

  return (
    <Badge bgColor={bgColor} textColor={textColor}>
      <span className="font-bold">{statusCode}</span>
      <span>&nbsp;{statusText}</span>
    </Badge>
  )
})

export default StatusBadge
