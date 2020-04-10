import { observer } from 'mobx-react'
import { useStores } from '../../../hooks'
import { DivisionTitle } from '../../common/typography/titles'
import DelayBadge from './delay-badge'
import StatusBadge from './status-badge'
import VarbindCard from './varbind-card'

const ResponseDivision = observer(() => {
  const { responseStore: resStore, historyStore } = useStores()
  const { statusCode, statusText, varbinds, snmpDelay } = resStore
  const { last } = historyStore

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
              {last && <DelayBadge snmpDelay={snmpDelay} httpDelay={last.httpDelay} />}
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
