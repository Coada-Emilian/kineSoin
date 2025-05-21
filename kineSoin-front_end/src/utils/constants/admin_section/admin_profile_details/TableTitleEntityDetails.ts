/**
 * @constant tableTitleEntityDetails
 * @type {Array<{ entityType: string, title: string }>}
 *
 * This array holds the details of various entity types and their corresponding titles.
 * It is used to map specific entity types (such as therapist, patient, affliction, etc.)
 * to their corresponding French titles. This can be helpful when rendering dynamic
 * titles or labels based on the entity type.
 *
 * @example
 * const therapistTitle = tableTitleEntityDetails.find(entity => entity.entityType === 'therapist').title;
 */

export const tableTitleEntityDetails = [
  {
    entityType: 'therapist',
    title: 'thérapeute',
  },
  { entityType: 'patient', title: 'patient' },
  {
    entityType: 'affliction',
    title: 'affliction',
  },
  { entityType: 'medic', title: 'médecin' },
  {
    entityType: 'insurance',
    title: "organisme d'assurance",
  },
];
