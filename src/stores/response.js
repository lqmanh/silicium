import { observable } from 'mobx-react'

class ResponseStore {
  @observable statusCode = 0
  @observable statusText = ''
  @observable varbinds = []
  @observable snmpDelay = 0 // ms
  @observable timestamp = null

  constructor() {
    //
  }
}

class Varbind {
  @observable numericOID = ''
  @observable textualOID = ''
  @observable fullOID = ''
  @observable type = ''
  @observable value = ''

  constructor() {
    //
  }
}

export default ResponseStore
