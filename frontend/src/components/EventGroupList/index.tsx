import moment from 'moment'
import { FC, useCallback } from 'react'

import { Event, HistoryState } from '../../features/history/historySlice'
import { getEventGroupTitle, getColorByTitle } from '../../utils/event'
import styles from '../../features/history/History.module.css'

interface Props {
  history: HistoryState
}

export const EventGroupList:FC<Props> = ({ history }) => {
  const events = Object.entries(history.events)
  const { resources } = history

  const getDetails = useCallback((key: string) => (resources[key] ? resources[key].details : ''), [resources])
  const getCode = useCallback((key: string) => (resources[key] ? resources[key].code : ''), [resources])

  const eventGroup = (eventGroup: [string, Event[]]) => {
    const title = getEventGroupTitle(eventGroup[0])

    return (
      <div
        className={styles.table__row}
        key={eventGroup[0]}
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
          {eventGroup[1].map((event) => (
            <div
              key={event.id}
              className={styles.eventinfo__row}
            >
              <div className={styles.details}>{getDetails(`${event.resource}/${event.id}`)}</div>
              <div className={styles.code}>{getCode(`${event.resource}/${event.id}`)}</div>
              <div className={styles.date}>{moment(event.date).format('DD MMM yyyy')}</div>
            </div>
          ))}
        </div>

      </div>
    )
  }

  return <>{events.map((event) => eventGroup(event))}</>
}
