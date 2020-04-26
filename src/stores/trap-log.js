import axios from 'axios'
import { action, observable, runInAction } from 'mobx'
import { Varbind } from './response'

export default class TrapLogStore {
  @observable entries = []

  constructor() {
    this.axios = axios.create({
      timeout: 10 * 1000,
      validateStatus: null, // always resolve HTTP response promises
    })
  }

  @action
  async fetch() {
    const res = await this.axios.get('/api/trap-log')

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new TrapLogEntry(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async delete(id) {
    const res = await this.axios.delete(`/api/trap-log?id=${id}`)

    if (res.status !== 200 || !(res.data instanceof Array)) return

    const entries = res.data.map((entryJson) => new TrapLogEntry(entryJson))
    runInAction(() => {
      this.entries = entries
    })
  }

  @action
  async clear() {
    const res = await this.axios.delete('/api/trap-log')

    if (res.status !== 200) return

    runInAction(() => {
      this.entries = []
    })
  }
}

class TrapLogEntry {
  @observable id
  @observable remoteHostname
  @observable transportAddress
  @observable varbinds
  @observable timestamp

  constructor(json) {
    this.fromJson(json)
  }

  @action
  fromJson(json) {
    json.timestamp = new Date(json.timestamp)
    json.varbinds = json.varbinds.map((varbindJson) => new Varbind(varbindJson))
    Object.assign(this, json)
  }
}
