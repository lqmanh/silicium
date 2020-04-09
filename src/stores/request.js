import { action, computed, observable } from 'mobx'

class RequestStore {
  @observable host = 'localhost' // hostname or IP address
  @observable port = 161
  @observable version = '2c' // 1, 2c or 3
  @observable community = 'public'
  @observable oid = ''
  @observable method = 'GET' // GET or GETNEXT

  constructor() {
    //
  }

  @computed
  get json() {
    const { host, port, version, community, oid, method } = this
    return { host, port, version, community, oid, method }
  }

  @action
  clear() {
    this.host = ''
    this.port = ''
    this.version = ''
    this.community = ''
    this.oid = ''
    this.method = ''
  }
}

export default RequestStore
