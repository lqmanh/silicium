import { action, computed, observable, runInAction } from 'mobx'

export default class MibStore {
  @observable mibs = []

  @action
  fromResponse(res) {
    const { status, data } = res

    if (status !== 200 || !(data.varbinds instanceof Array)) return

    const mibs = data.varbinds.map((varbindJson) => new Mib(varbindJson))
    runInAction(() => {
      this.mibs = mibs
    })
  }
}

class Mib {
  @observable textualOID = ''
  @observable type = ''
  @observable value = ''

  constructor(json) {
    this.fromJson(json)
  }

  @computed
  get name() {
    return this.textualOID
  }

  @computed
  get json() {
    const { name, type, value } = this
    return { name, type, value }
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }
}
