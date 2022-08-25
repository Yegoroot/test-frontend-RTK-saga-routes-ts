import moment from 'moment'

export const compareDates = (dateTimeA: string | Date, dateTimeB: string | Date) => {
  const momentA = moment(dateTimeA)
  const momentB = moment(dateTimeB)
  if (momentA < momentB) return 1
  if (momentA > momentB) return -1
  return 0
}
