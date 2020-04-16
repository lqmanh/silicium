import axios from 'axios'
import { action, computed, observable } from 'mobx'

class HistoryStore {
  @observable entries = []

  constructor(rootStore) {
    this.rootStore = rootStore
    this.axios = axios.create({
      timeout: 10 * 1000,
      validateStatus: null, // always resolve HTTP response promises
    })
  }

  @computed
  get last() {
    const n = this.entries.length
    if (!n) return null
    return this.entries[n - 1]
  }

  @action
  async append(reqJson, resJson) {
    const entry = new HistoryEntry()
    entry.request = reqJson
    entry.response = resJson
    this.entries.push(entry)

    await this.axios.post('/api/history', { request: reqJson, response: resJson })
  }
}

class HistoryEntry {
  @observable request = null
  @observable response = null

  @computed
  get httpDelay() {
    return this.response.timestamp - this.request.timestamp
  }
}

export default HistoryStore
