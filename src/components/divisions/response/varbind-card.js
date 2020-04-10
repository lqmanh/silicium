import { observer } from 'mobx-react'
import { Card } from '../../common/elements'
import { InputField } from '../../common/form/fields'

const VarbindCard = observer((props) => {
  const { varbind } = props

  return (
    <Card>
      <InputField label="Numeric OID" value={varbind.numericOID} />
      <InputField label="Textual MIB name" value={varbind.textualOID} />
      <InputField label="Full OID" value={varbind.fullOID} />
      <InputField label="Type" value={varbind.type} />
      <InputField label="Value" value={varbind.value} />
    </Card>
  )
})

export default VarbindCard
