/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

import { RootState } from '../../app/store'
import axios from '../../utils/axios'
import { compareDates } from '../../utils/date'

export const LOAD_RESOURCE = 15

export interface Event {
  id: string,
  appointmentId: string,
  name: string,
  resource: string
  date: string
}

export interface Resource {
  id: string,
  details: string,
  values: string[],
  code: string
}

export interface HistoryState {
  status: 'idle' | 'loading' | 'failed';
  events: Record<string, Event[]>
  resources: Record<string, Resource>
}

const initialState: HistoryState = {
  status: 'loading',
  events: {},
  resources: {},
}

const cortByDate = (a: Event, b: Event) => compareDates(a.date, b.date)

export const getEvents = createAsyncThunk(
  'history/fetchEvents',
  async () => {
    const response = await axios.get<{items: Event[]}>('/events').then((res) => res)
    const list = response.data.items

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
      .sort(cortByDate)
      .map((appointemt) => {
        const subEvents = notAppintmentList.filter((event) => appointemt.id === event.appointmentId).sort(cortByDate)
        eventList.push(appointemt, ...subEvents)
        return []
      })

    const withoutAppointmentIdList = notAppintmentList.filter((event) => !event.appointmentId).sort(cortByDate)

    eventList.push(...withoutAppointmentIdList)

    console.log('Event List', eventList)

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

    return Object.fromEntries(eventsMap)
  }
)

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setRecources: (state, action) => {
      state.resources = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'idle'
        state.events = action.payload
      })
  },
})

export const selectHistory = (state: RootState):RootState['history'] => state.history

export default historySlice.reducer
