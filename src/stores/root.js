import HistoryStore from './history'
import RequestStore from './request'
import ResponseStore from './response'

class RootStore {
  constructor() {
    this.historyStore = new HistoryStore()
    this.requestStore = new RequestStore()
    this.responseStore = new ResponseStore()
  }
}

export default RootStore
