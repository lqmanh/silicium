import { DivisionTitle } from '../../common/typography/titles'
import VarbindCard from './varbind-card'

const ResponseDivision = () => {
  return (
    <section>
      <div className="flex items-center justify-between -mx-2 mb-4">
        <span className="mx-2">
          <DivisionTitle>response</DivisionTitle>
        </span>
        <span>{/* response status */}</span>
      </div>
      <div className="flex -mx-2 mb-4">
        <VarbindCard varbind={{}} />
      </div>
      <div className="flex -mx-2">
        <VarbindCard varbind={{}} />
      </div>
    </section>
  )
}

export default ResponseDivision
