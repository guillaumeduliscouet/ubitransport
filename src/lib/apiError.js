import { path } from 'ramda'

let store

export const initApiErrorHandler = appStore => {
  store = appStore
}

export const parseApiError = err => ({
  isServer: Boolean(err.response),
  status: path(['response', 'status'], err),
  isNetwork: err.request && !err.response
})

export const handleApiError = err => {
  const { isServer, isNetwork, status } = parseApiError(err)
  if (!isNetwork && !isServer) throw err
  if (isNetwork) store.dispatch('snackbar/show', { message: 'Network error, check your internet connection' })
  if (isServer) store.dispatch('snackbar/show', { message: `Server error ${status}` })
}
