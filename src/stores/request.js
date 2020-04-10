import axios from 'axios'
import { action, computed, observable } from 'mobx'

class RequestStore {
  @observable host = 'localhost' // hostname or IP address
  @observable port = 161
  @observable version = '2c' // 1, 2c or 3
  @observable community = 'public'
  @observable oid = ''
  @observable method = 'GET' // GET or GETNEXT
  @observable timestamp = null

  constructor(rootStore) {
    this.rootStore = rootStore
    this.axios = axios.create({
      timeout: 10 * 1000,
      validateStatus: null, // always resolve HTTP response promises
    })
  }

  @computed
  get json() {
    const { host, port, version, community, oid, method } = this
    return { host, port, version, community, oid, method }
  }

  @action
  async submit() {
    this.rootStore.responseStore.clear()

    const res = await this.axios.post('/api/snmp', this.json)
    this.rootStore.responseStore.fromResponse(res)
  }

  @action
  clear() {
    this.host = ''
    this.port = ''
    this.version = ''
    this.community = ''
    this.oid = ''
    this.method = ''
    this.timestamp = null

    this.rootStore.responseStore.clear()
  }
}

export default RequestStore
