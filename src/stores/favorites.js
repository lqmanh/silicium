import axios from 'axios'
import { action, computed, observable, runInAction } from 'mobx'
import { User } from './request'

export default class FavoritesStore {
  axios = axios.create({
    timeout: 10 * 1000,
    validateStatus: null, // always resolve HTTP response promises
  })
  @observable entries = []

  @action
  async add(snmpAgentJson) {
    await this.axios.post('/api/favorites', snmpAgentJson)
  }

  @action
  async fetch() {
    const res = await this.axios.get('/api/favorites')

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new SnmpAgent(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async update(id, snmpAgentJson) {
    await this.axios.put(`/api/favorites?id=${id}`, snmpAgentJson)
  }

  @action
  async delete(id) {
    const res = await this.axios.delete(`/api/favorites?id=${id}`)

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new SnmpAgent(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async clear() {
    const res = await this.axios.delete('/api/favorites')

    if (res.status !== 200) return

    runInAction(() => {
      this.entries = []
    })
  }
}

export class SnmpAgent {
  @observable id
  @observable name
  @observable host
  @observable port
  @observable version
  @observable community
  @observable user

  constructor(json) {
    this.fromJson(json)
  }

  @computed
  get json() {
    const { name, host, port, version, community, user } = this
    return { name, host, port, version, community, user: user.json }
  }

  @action
  fromJson(json) {
    const user = new User(json.user)
    Object.assign(this, { ...json, user })
  }
}
