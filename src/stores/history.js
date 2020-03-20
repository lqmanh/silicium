import { observable } from 'mobx-react'

class HistoryStore {
  @observable entries = []

  constructor() {
    //
  }
}

class HistoryEntry {
  @observable request = null
  @observable response = null
  @observable delay = 0 // ms
}

export default HistoryStore
