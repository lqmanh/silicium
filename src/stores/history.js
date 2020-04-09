import { observable } from 'mobx'

class HistoryStore {
  @observable entries = []

  constructor(rootStore) {
    this.rootStore = rootStore
  }
}

class HistoryEntry {
  @observable request = null
  @observable response = null
  @observable delay = 0 // ms
}

export default HistoryStore
