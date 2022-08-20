import { PayloadAction } from '@reduxjs/toolkit'
import {
  call, all, put, takeLatest
} from 'redux-saga/effects'

import { AxiosResponse } from 'axios'
import { Event, Resource } from '../features/history/historySlice'
import axios from '../utils/axios'

function* fetchResources(action: PayloadAction<Record<string, Event[]>>) {
  const eventsSets = Object.entries(action.payload)

  // TODO обрезать размер запрашиваемых ресурсов до 15ти ( LOAD_RESOURCE )

  try {
    // @ts-ignore
    const responses = yield all(eventsSets.map((set) => {
      const events = set[1]
      const ids = events.map((ev) => `${ev.name}/${ev.id}`)
      return call(axios.post, '/resources', { ids })
    }))

    const resources = responses.map((response: AxiosResponse) => [...response.data.items]).flat()
    const resourcesMap = resources.reduce((a: Resource, v: Resource) => ({ ...a, [v.id]: v }), {})

    yield put({ type: 'history/setRecources', payload: resourcesMap })
  } catch (e) {
    console.log('Get Resourses Error')
  }
}

export function* rootSaga() {
  yield takeLatest('history/fetchEvents/fulfilled', fetchResources)
}
