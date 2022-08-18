import { useEffect, FC } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  getEvents,
  selectHistory,
  getResources
} from './historySlice'
import styles from './History.module.css'

export const History:FC = () => {
  const history = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEvents())
    dispatch(getResources())
  }, [])

  console.log(history)

  if (history.status === 'loading') return <div>Loading...</div>

  return (
    <div>

      <div className={styles.row}>

        <ul>
          {history.events.map((event) => (
            <div
              key={event.id}
              style={{ padding: 20 }}
            >
              {/* {event.id}
              {' '} */}
              {event.appointmentId}
              {' '}
              -
              {' '}
              {event.resource}
              {' '}
              {' '}
              {event.name}
            </div>
          ))}
        </ul>

      </div>

    </div>
  )
}
