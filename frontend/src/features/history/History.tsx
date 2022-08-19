import { useEffect, FC } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  getEvents,
  selectHistory,
  Event,
  getResources
} from './historySlice'
import styles from './History.module.css'

import { getEventGroupTitle, getColorByTitle } from '../../utils/event'

export const History:FC = () => {
  const history = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()
  const events = Object.entries(history.events)

  useEffect(() => {
    dispatch(getEvents())
    dispatch(getResources())
  }, [])

  if (history.status === 'loading') return <div>Loading...</div>

  const listEvents = (events: [string, Event[]]) => {
    const title = getEventGroupTitle(events[0])

    return (
      <div className={styles.table__row}>
        <div className={styles.type}>
          <span
            className={styles.badge}
            style={{
              background: getColorByTitle(title)
            }}
          >
            {title}
          </span>

        </div>
        <div className={styles.details}>
          {events[1].map((event) => (<div key={event.id}>{event.id}</div>))}
        </div>
        <div className={styles.code}>code</div>
        <div className={styles.date}>date</div>
      </div>
    )
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.type}>Event type</div>
        <div className={styles.details}>Details</div>
        <div className={styles.code}>Code</div>
        <div className={styles.date}>Date</div>
      </div>
      {events.map((event) => listEvents(event))}
    </div>
  )
}
