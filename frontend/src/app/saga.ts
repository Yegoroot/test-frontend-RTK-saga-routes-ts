import { PayloadAction } from '@reduxjs/toolkit'
import {
  call, all, put, takeLatest
} from 'redux-saga/effects'
import moment from 'moment'

import { AxiosResponse } from 'axios'
import { Event, Resource, Events } from '../features/history/historySlice'
import axios from '../utils/axios'
import { compareDates } from '../utils/date'
import { getEvents } from '../service/getEvents'

function* fetchResources(action: PayloadAction<[Events, Events]>) {
  const eventsSets = Object.entries(action.payload[0])

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

const sortByDate = (a: Event, b: Event) => compareDates(a.date, b.date)

function* getDataRequestSaga() {
  try {
    // @ts-ignore
    const response = yield call(axios.get, '/events')
    const list = response.data.items as Event[]

    const appintmentList: Event[] = []
    const notAppintmentList: Event[] = []

    list.map((ev) => {
      if (ev.resource === 'Appointment') {
        appintmentList.push(ev)
      } else {
        notAppintmentList.push(ev)
      }
      return null
    })

    const eventList: Event[] = []
    appintmentList
      .sort(sortByDate)
      .map((appointemt) => {
        const subEvents = notAppintmentList.filter((event) => appointemt.id === event.appointmentId).sort(sortByDate)
        eventList.push(appointemt, ...subEvents)
        return []
      })

    const withoutAppointmentIdList = notAppintmentList.filter((event) => !event.appointmentId).sort(sortByDate)

    eventList.push(...withoutAppointmentIdList)

    const eventsMap = new Map()
    eventList.map((event: Event) => {
      const key = `${event.resource}/${moment(event.date).format('DD.MM.YYYY')}`
      const value = eventsMap.get(key)
      let eventList: Event[] = []

      if (value) {
        eventList = [...value, event]
      }

      eventsMap.set(key, eventList)
      return null
    })

    const backData = Object.fromEntries(eventsMap)

    yield put({ type: 'history/getEvents', payload: getEvents(backData) })
  } catch (error) {
    console.error('Error getting data')
  }
}

export function* rootSaga() {
  yield takeLatest('history/getDataRequest', getDataRequestSaga)
  yield takeLatest('history/getEvents', fetchResources)
}
