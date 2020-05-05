import axios from 'axios'
import { action, computed, observable, runInAction } from 'mobx'
import { Varbind } from './response'

class HistoryStore {
  axios = axios.create({
    timeout: 10 * 1000,
    validateStatus: null, // always resolve HTTP response promises
  })
  @observable entries = []

  @action
  async add(reqJson, resJson) {
    await this.axios.post('/api/snmp-client-history', { request: reqJson, response: resJson })
  }

  @action
  async fetch() {
    const res = await this.axios.get('/api/snmp-client-history')

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new HistoryEntry(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async delete(id) {
    const res = await this.axios.delete(`/api/snmp-client-history?id=${id}`)

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new HistoryEntry(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async clear() {
    const res = await this.axios.delete('/api/snmp-client-history')

    if (res.status !== 200) return

    runInAction(() => {
      this.entries = []
    })
  }
}

class HistoryEntry {
  @observable id
  @observable request
  @observable response

  constructor(json) {
    this.fromJson(json)
  }

  @computed
  get httpDelay() {
    return this.response.timestamp - this.request.timestamp
  }

  @action
  fromJson(json) {
    const { request, response } = json
    request.timestamp = new Date(request.timestamp)
    response.timestamp = new Date(response.timestamp)
    response.varbinds = response.varbinds.map((varbindJson) => new Varbind(varbindJson))
    Object.assign(this, json)
  }
}

export default HistoryStore
