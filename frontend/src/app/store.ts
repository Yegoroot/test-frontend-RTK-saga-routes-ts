import {
  ThunkAction, Action,
  configureStore, createListenerMiddleware
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import counterReducer from '../features/counter/counterSlice'
import historyReducer from '../features/history/historySlice'
import { rootSaga } from './saga'

const listenerMiddleware = createListenerMiddleware()
const SagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).prepend(SagaMiddleware).prepend(listenerMiddleware.middleware),
})

SagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
