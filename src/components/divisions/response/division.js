import { observer } from 'mobx-react'
import { useStores } from '../../../hooks'
import { DivisionTitle } from '../../common/typography/titles'
import DelayBadge from './delay-badge'
import StatusBadge from './status-badge'
import VarbindCard from './varbind-card'

const ResponseDivision = observer(() => {
  const { requestStore: reqStore, responseStore: resStore } = useStores()
  const { timestamp: reqTimestamp } = reqStore
  const { statusCode, statusText, varbinds, snmpDelay, timestamp: resTimestamp } = resStore
  const httpDelay = resTimestamp - reqTimestamp

  return (
    <section>
      <div className="flex items-center justify-between -mx-2 mb-4">
        <span className="mx-2">
          <DivisionTitle>response</DivisionTitle>
        </span>
        <span>
          {statusCode && (
            <>
              <StatusBadge statusCode={statusCode} statusText={statusText} />
              <DelayBadge snmpDelay={snmpDelay} httpDelay={httpDelay} />
            </>
          )}
        </span>
      </div>
      {varbinds.map((varbind, i) => (
        <div className="flex -mx-2 mb-4" key={i}>
          <VarbindCard varbind={varbind} />
        </div>
      ))}
    </section>
  )
})

export default ResponseDivision
