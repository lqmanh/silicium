const VarbindCard = (props) => {
  const { varbind } = props
  const width = 'w-full'
  const bgColor = 'bg-gray-200'
  const border = 'rounded'
  const textColor = 'text-gray-800'
  const shadow = 'shadow hover:shadow-md'
  const space = 'mx-2 p-4'

  return (
    <div className={`${width} ${bgColor} ${border} ${textColor} ${shadow} ${space}`}>
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
    </div>
  )
}

export default VarbindCard
