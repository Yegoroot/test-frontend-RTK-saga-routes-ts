import {
  useEffect, FC, useRef, useState
} from 'react'

import { EventGroupList } from '../../components/EventGroupList'
import { useAppSelector, useAppDispatch, } from '../../app/hooks'
import { selectHistory, getDataRequest } from './historySlice'
import styles from './History.module.css'
import useScrollTrigger from '../../hooks/useScrollTrigger'

export const History:FC = () => {
  const groupListWrapper = useRef<HTMLDivElement>(null) as unknown as { current: HTMLDivElement; }

  const history = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const triggeredValue = useScrollTrigger(groupListWrapper, loading)

  useEffect(() => {
    if (triggeredValue) {
      setLoading(false)
      console.log('Loading.....')
    }
  }, [triggeredValue])

  useEffect(() => {
    // all Data
    dispatch(getDataRequest())
  }, [])

  // useEffect(() => {
  //   dispatch(getEventsRequest())
  // }, [])

  if (history.status === 'loading') return <div>Loading...</div>

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div>Event type</div>
        <div>Details</div>
        <div>Code</div>
        <div>Date</div>
      </div>
      <div ref={groupListWrapper}>
        <EventGroupList history={history} />
      </div>
      <div />
    </div>
  )
}
