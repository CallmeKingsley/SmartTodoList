import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { seamlessImmutableReconciler, seamlessImmutableTransformCreator } from 'redux-persist-seamless-immutable'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import 'babel-polyfill'

const transformerConfig = {
  whitelistPerReducer: {
    todo: ['todoList'],
    user: ['user', 'authenticated', 'errors', 'userId', 'loading']
  },
  blacklistPerReducer: {
    analytics: [
      'sessionStarted', 'sessionStartedRecorded',
      'updateChecked', 'reviewTriggered',
      'reviewRecorded', 'resolutionWarnings',
      'selectedPhotos', 'longUploadMessageCount'
    ]
  }
}

export default (rootReducer, rootSaga) => {
  const persistConfig = {
    key: 'root',
    storage,
    whitlelist: ['user'],
    blacklist: [],
    stateReconciler: seamlessImmutableReconciler,
    transforms: [seamlessImmutableTransformCreator(transformerConfig)],
    version: 4
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware()

  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  const Store = createStore(persistedReducer, composeEnhancers(...enhancers))

  const Persistor = persistStore(Store)

  const SagasManager = sagaMiddleware.run(rootSaga)

  return {
    Store,
    Persistor,
    SagasManager
  }
}
