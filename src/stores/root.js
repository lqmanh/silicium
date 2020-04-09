import HistoryStore from './history'
import RequestStore from './request'
import ResponseStore from './response'

class RootStore {
  constructor() {
    this.historyStore = new HistoryStore(this)
    this.requestStore = new RequestStore(this)
    this.responseStore = new ResponseStore(this)
  }
}

export default RootStore
