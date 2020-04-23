import axios from 'axios'
import { action, computed, observable } from 'mobx'

export default class RequestStore {
  @observable host = 'localhost' // hostname or IP address
  @observable port = 161
  @observable version = '2c' // 1, 2c or 3
  @observable community = 'public'
  @observable oid = ''
  @observable method = 'GET' // GET or GETNEXT
  @observable timestamp = null

  constructor() {
    this.axios = axios.create({
      timeout: 10 * 1000,
      validateStatus: null, // always resolve HTTP response promises
    })
  }

  @computed
  get json() {
    const { host, port, version, community, oid, method, timestamp } = this
    return { host, port, version, community, oid, method, timestamp }
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }

  @action
  async send() {
    this.timestamp = new Date()
    return this.axios.post('/api/snmp-client', this.json)
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
  }
}
