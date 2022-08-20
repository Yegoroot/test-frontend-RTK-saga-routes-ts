import { useEffect, FC } from 'react'
import moment from 'moment'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  getEvents,
  selectHistory,
  Event,
} from './historySlice'
import styles from './History.module.css'

import { getEventGroupTitle, getColorByTitle } from '../../utils/event'

export const History:FC = () => {
  const history = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()
  const events = Object.entries(history.events)

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  if (history.status === 'loading') return <div>Loading...</div>

  const listEvents = (events: [string, Event[]]) => {
    const title = getEventGroupTitle(events[0])

    return (
      <div
        className={styles.table__row}
        key={events[0]}
      >
        <div className={styles.type}>
          <span
            className={styles.badge}
            style={{ background: getColorByTitle(title) }}
          >
            {title}
          </span>
        </div>
        <div className={styles.eventinfo}>
          {events[1].map((event) => (
            <div
              key={event.id}
              className={styles.eventinfo__row}
            >
              <div className={styles.details}>{event.id}</div>
              <div className={styles.code}>code</div>
              <div className={styles.date}>{moment(event.date).format('DD MMM yyyy')}</div>
            </div>
          ))}
        </div>

      </div>
    )
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div>Event type</div>
        <div>Details</div>
        <div>Code</div>
        <div>Date</div>
      </div>
      {events.map((event) => listEvents(event))}
    </div>
  )
}
