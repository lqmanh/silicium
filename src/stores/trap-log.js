import axios from 'axios'
import { action, observable } from 'mobx'

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
    //
  }

  @action
  async delete(id) {
    //
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
    Object.assign(this, json)
  }
}
