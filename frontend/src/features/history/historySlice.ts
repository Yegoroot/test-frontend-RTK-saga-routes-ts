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
  resources: Record<string, Resource[]>
}

const initialState: HistoryState = {
  status: 'loading',
  events: {},
  resources: {}
}

export const getEvents = createAsyncThunk(
  'history/fetchEvents',
  async () => {
    const response = await axios.get<{items: Event[]}>('/events').then((res) => res)

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
