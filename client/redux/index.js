import { isNil } from 'ramda'
import { combineReducers } from 'redux'
import configStore from './CreateStore'
import rootSaga from '../Sagas/'
import 'babel-polyfill'

export const reducers = combineReducers({
  todo: require('./TodoRedux').reducer,
  user: require('./UserRedux').reducer

})

let storeInstance = null
let persistorInstance = null

export default () => {
  if (isNil(storeInstance)) {
    let { Store, Persistor, sagasManager, sagaMiddleware } = configStore(reducers, rootSaga)
    storeInstance = Store
    persistorInstance = Persistor

    if (module.hot) {
      module.hot.accept(() => {
        const nextRootReducer = require('./').reducers
        Store.replaceReducer(nextRootReducer)

        const newYieldedSagas = require('../Sagas').default
        sagasManager.cancel()
        sagasManager.done.then(() => {
          sagasManager = sagaMiddleware.run(newYieldedSagas)
        })
      })
    }
  }
  return { store: storeInstance, persistor: persistorInstance }
}
