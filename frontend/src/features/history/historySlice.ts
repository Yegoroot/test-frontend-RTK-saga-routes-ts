/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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

export type Events = Record<string, Event[]>

export interface HistoryState {
  status: 'idle' | 'loading' | 'scroll';
  data: Events
  events: Events
  resources: Record<string, Resource>
}

const initialState: HistoryState = {
  status: 'loading',
  data: {},
  events: {},
  resources: {},
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setRecources: (state, action) => {
      state.resources = Object.assign(state.resources, action.payload)
    },
    getEvents(state, action) {
      const [events, data] = action.payload
      state.events = Object.assign(state.events, events)
      state.data = data
      state.status = 'idle'
    },
    scrollEvents(state, action) {
      state.status = 'scroll'
    },
    getDataRequest(state) {
      state.status = 'loading'
    },
  }
})

export const { getDataRequest, scrollEvents } = historySlice.actions

export const selectHistory = (state: RootState):RootState['history'] => state.history

export default historySlice.reducer
