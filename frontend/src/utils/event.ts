import { Resource } from '../features/history/historySlice'

export enum TitleColors {
  Appointment='#bbc9fa',
  Observation='#9de7ff',
  Condition='#dbedb6',
  AllergyIntolerance='#febdd8',
  MedicationStatement='#b6ecd7',
  Immunization='#be9cf9',
  Procedure='#f99c9c',
  CarePlan='#03f493'
}

export type NameEvent = keyof typeof TitleColors

export const getColorByTitle = (title: NameEvent) => TitleColors[title]

export const getEventGroupTitle = (t: string): NameEvent => t.split('/')[0] as NameEvent

export const getEventValues = (key: string, resources: Record<string, Resource>) => {
  if (!resources[key] || !resources[key].values || !resources[key].values.length) { return '' }

  // ['', '']
  if (typeof resources[key].values[0] === 'string') {
    return resources[key].values.toString()
  }

  // [{}, {}]
  // @ts-ignore потому что проверили на строку выше
  return resources[key].values.map((value: {value: string | number, unit: string}) => `${value.unit}: ${value.value}`)
}
