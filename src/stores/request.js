import axios from 'axios'
import { action, computed, observable } from 'mobx'

export default class RequestStore {
  @observable host = 'localhost' // hostname or IP address
  @observable port = 161
  @observable version = '2c' // 1, 2c or 3
  @observable community = 'public'
  @observable user = new User()
  @observable oid = ''
  @observable method = 'GET' // GET, GETNEXT, GETBULK or WALK
  @observable timestamp = null

  constructor() {
    this.axios = axios.create({
      timeout: 10 * 1000,
      validateStatus: null, // always resolve HTTP response promises
    })
  }

  @computed
  get json() {
    const { host, port, version, community, user, oid, method, timestamp } = this
    return { host, port, version, community, user, oid, method, timestamp }
  }

  @action
  fromJson(json) {
    const user = new User()
    user.fromJson(json.user)
    Object.assign(this, { ...json, user })
  }

  @action
  async send() {
    this.timestamp = new Date()
    return this.axios.post('/api/snmp-client', this.json)
  }

  @action
  async loadMibTree() {
    this.method = 'WALK'
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

export class User {
  @observable username = ''
  @observable authProtocol = 'MD5'
  @observable authPassword = ''
  @observable privProtocol = 'DES'
  @observable privPassword = ''

  constructor(json) {
    this.fromJson(json)
  }

  @computed
  get json() {
    const { username, authProtocol, authPassword, privProtocol, privPassword } = this
    return { username, authProtocol, authPassword, privProtocol, privPassword }
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }
}
