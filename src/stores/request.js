import { observable } from 'mobx-react'

class RequestStore {
  @observable host = 'localhost' // hostname or IP address
  @observable port = 161
  @observable community = 'public'
  @observable oid = ''
  @observable method = 'GET' // GET or GETNEXT
  @observable timestamp = null

  constructor() {
    //
  }
}

export default RequestStore
