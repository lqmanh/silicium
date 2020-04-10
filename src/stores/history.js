import { action, computed, observable } from 'mobx'

class HistoryStore {
  @observable entries = []

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @computed
  get last() {
    const n = this.entries.length
    if (!n) return null
    return this.entries[n - 1]
  }

  @action
  append(req, res) {
    const entry = new HistoryEntry()
    entry.request = req
    entry.response = res
    this.entries.push(entry)
  }
}

class HistoryEntry {
  @observable request = null
  @observable response = null

  @computed
  get httpDelay() {
    if (!this.request || !this.response) return null
    return this.response.timestamp - this.request.timestamp
  }
}

export default HistoryStore
