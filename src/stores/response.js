import { action, observable } from 'mobx'

class ResponseStore {
  @observable statusCode = 0
  @observable statusText = ''
  @observable varbinds = []
  @observable snmpDelay = 0 // ms
  @observable timestamp = null

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  updateFromResponse(res) {
    const { status, statusText, data } = res
    this.statusCode = status
    this.statusText = statusText

    if (status !== 200) return

    this.varbinds = data.map((varbindData) => new Varbind(varbindData))
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
