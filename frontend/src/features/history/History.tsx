import {
  useEffect, FC,
} from 'react'

import { EventGroupList } from '../../components/EventGroupList'
import { useAppSelector, useAppDispatch, } from '../../app/hooks'
import { getEvents, selectHistory } from './historySlice'
import styles from './History.module.css'

export const History:FC = () => {
  const history = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  if (history.status === 'loading') return <div>Loading...</div>

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div>Event type</div>
        <div>Details</div>
        <div>Code</div>
        <div>Date</div>
      </div>
      <EventGroupList history={history} />
    </div>
  )
}
