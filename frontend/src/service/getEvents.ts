import { Events, LOAD_RESOURCE } from '../features/history/historySlice'

export const getEvents = (map: Events) => {
  const list = Object.entries(map)

  const events = Object.fromEntries(list.slice(0, LOAD_RESOURCE)) as Events
  const data = Object.fromEntries(list.slice(LOAD_RESOURCE)) as Events

  return [events, data]
}
