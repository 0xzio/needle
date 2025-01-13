import { set } from 'idb-keyval'
import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { commands } from './constants'
import { AppStore } from './stores/AppStore'
import { NodeStore } from './stores/NodeStore'
import { RouterStore } from './stores/RouterStore'
import { SpaceStore } from './stores/SpaceStore'
import { UserStore } from './stores/UserStore'
import { Command } from './types'

export const commandsAtom = atom<Command[]>(commands)

const PENX_TOKEN = 'PENX_TOKEN'
export const tokenAtom = atomWithStorage(PENX_TOKEN, '')

const baseStore = createStore()

export const store = Object.assign(baseStore, {
  get: baseStore.get,
  set: baseStore.set,

  get app() {
    return new AppStore(this)
  },

  get router() {
    return new RouterStore(this)
  },

  get space() {
    return new SpaceStore(this)
  },

  get node() {
    return new NodeStore(this)
  },

  get user() {
    return new UserStore(this)
  },

  getToken() {
    return store.get(tokenAtom)
  },

  setToken(token: string) {
    set(PENX_TOKEN, token)
    return store.set(tokenAtom, token)
  },
})
