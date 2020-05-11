import FavoritesStore from './favorites'
import HistoryStore from './history'
import MibStore from './mib-store'
import RequestStore from './request'
import ResponseStore from './response'
import TrapLogStore from './trap-log'

class RootStore {
  constructor() {
    this.favoritesStore = new FavoritesStore()
    this.historyStore = new HistoryStore()
    this.mibStore = new MibStore()
    this.requestStore = new RequestStore()
    this.responseStore = new ResponseStore()
    this.trapLogStore = new TrapLogStore()
  }
}

export default RootStore
