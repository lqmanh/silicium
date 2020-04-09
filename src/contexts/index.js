import { createContext } from 'react'
import { RootStore } from '../stores'

const rootStore = new RootStore()
const { historyStore, requestStore, responseStore } = rootStore

export const storesContext = createContext({
  rootStore,
  historyStore,
  requestStore,
  responseStore,
})
