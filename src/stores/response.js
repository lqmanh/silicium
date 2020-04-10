import { action, observable } from 'mobx'

class ResponseStore {
  @observable statusCode = null
  @observable statusText = null
  @observable varbinds = []
  @observable snmpDelay = null // ms
  @observable timestamp = null

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  fromResponse(res) {
    const { status, statusText, data } = res
    this.statusCode = status
    this.statusText = statusText

    if (status !== 200 || !(data.varbinds instanceof Array)) return

    this.varbinds = data.varbinds.map((varbindData) => new Varbind(varbindData))
    this.snmpDelay = data.snmpDelay
  }

  @action
  clear() {
    this.statusCode = null
    this.statusText = null
    this.varbinds = []
    this.snmpDelay = null
    this.timestamp = null
  }
}

class Varbind {
  @observable numericOID = ''
  @observable textualOID = ''
  @observable fullOID = ''
  @observable type = ''
  @observable value = ''

  constructor(json) {
    this.fromJson(json)
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }
}

export default ResponseStore
