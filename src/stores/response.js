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

    if (status !== 200 || !(data instanceof Array)) return

    this.varbinds = data.map((varbindData) => new Varbind(varbindData))
  }

  @action
  clear() {
    this.statusCode = null
    this.statusText = null
    this.varbinds = []
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
