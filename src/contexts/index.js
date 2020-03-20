import { createContext } from 'react'
import { HistoryStore, RequestStore, ResponseStore } from '../stores'

export const historyStoreContext = createContext(new HistoryStore())
export const requestStoreContext = createContext(new RequestStore())
export const responseStoreContext = createContext(new ResponseStore())
