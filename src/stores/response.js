import { action, computed, observable } from 'mobx'

export default class ResponseStore {
  @observable statusCode = null
  @observable statusText = null
  @observable varbinds = []
  @observable snmpDelay = null // ms
  @observable timestamp = null

  constructor() {}

  @computed
  get json() {
    const { statusCode, statusText, snmpDelay, timestamp } = this
    const varbinds = this.varbinds.map((varbind) => varbind.json)
    return { statusCode, statusText, varbinds, snmpDelay, timestamp }
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }

  @action
  fromResponse(res) {
    this.timestamp = new Date()

    const { status, statusText, data } = res
    this.statusCode = status
    this.statusText = statusText

    if (status !== 200 || !(data.varbinds instanceof Array)) return

    this.varbinds = data.varbinds.map((varbindJson) => new Varbind(varbindJson))
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

export class Varbind {
  @observable numericOID = ''
  @observable textualOID = ''
  @observable fullOID = ''
  @observable type = ''
  @observable value = ''

  constructor(json) {
    this.fromJson(json)
  }

  @computed
  get json() {
    const { numericOID, textualOID, fullOID, type, value } = this
    return { numericOID, textualOID, fullOID, type, value }
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }
}
