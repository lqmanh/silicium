import axios from 'axios'
import { action, observable } from 'mobx'

export default class FavoritesStore {
  axios = axios.create({
    timeout: 10 * 1000,
    validateStatus: null, // always resolve HTTP response promises
  })
  @observable entries = []

  @action
  async fetch() {
    //
  }

  @action
  async delete() {
    //
  }

  @action
  async clear() {
    //
  }
}

class SnmpAgent {
  @observable id
  @observable name
  @observable host
  @observable port
  @observable version
  @observable community

  constructor(json) {
    this.fromJson(json)
  }

  @action
  fromJson(json) {
    Object.assign(this, json)
  }
}
