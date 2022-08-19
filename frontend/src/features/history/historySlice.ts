/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

import { RootState } from '../../app/store'
import axios from '../../utils/axios'
import { compareDates } from '../../utils/date'

export interface Event {
  id: string,
  appointmentId: string,
  name: string,
  resource: string
  date: string
}

export interface Resource {
  id: string,
  appointmentId: string,
  name: string,
  resource: string
  date: string
}

export interface HistoryState {
  status: 'idle' | 'loading' | 'failed';
  events: Record<string, Event[]>
  resources: Resource[]
}

const initialState: HistoryState = {
  status: 'loading',
  events: {},
  resources: []
}

export const getEvents = createAsyncThunk(
  'history/fetchEvents',
  async () => {
    const response = await axios.get<{items: Event[]}>('http://localhost:5010/events').then((res) => res)

    const eventsMap = new Map()
    response.data.items.sort((a, b) => compareDates(a.date, b.date)).map((event: Event) => {
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

// группировка по Condition/дата

export const getResources = createAsyncThunk(
  'history/fetchResources',
  async () => {
    const response = await axios.post('http://localhost:5010/resources', {
      ids: ['Appointment/61c9a7b2591f62638eec3e88', 'Appointment/6239ce03bf646fd0dde4e9d2']
    }).then((res) => res)
    return response.data
  }
)

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // smth: (state) => {
    //   state.status -= 1
    // },
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
      .addCase(getResources.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.status = 'idle'
        state.resources = action.payload.items
      })
  },
})

export const selectHistory = (state: RootState):RootState['history'] => state.history

export default historySlice.reducer
