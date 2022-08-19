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

// @ts-ignore
export const getEventGroupTitle = (t: string): NameEvent => t.split('/')[0]
