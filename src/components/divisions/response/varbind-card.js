import { Card } from '../../common/elements'

const VarbindCard = (props) => {
  const { varbind } = props

  return (
    <Card>
      <p>
        <span>Numeric OID: </span>
        <span>{varbind.numericOID ?? ''}</span>
      </p>
      <p>
        <span>Textual MIB name: </span>
        <span>{varbind.textualOID ?? ''}</span>
      </p>
      <p>
        <span>Full OID: </span>
        <span>{varbind.fullOID ?? ''}</span>
      </p>
      <p className="flex">
        <span className="w-1/2">
          <span>Value: </span>
          <span>{varbind.value ?? ''}</span>
        </span>
        <span className="w-1/2">
          <span>Type: </span>
          <span>{varbind.type ?? ''}</span>
        </span>
      </p>
    </Card>
  )
}

export default VarbindCard
