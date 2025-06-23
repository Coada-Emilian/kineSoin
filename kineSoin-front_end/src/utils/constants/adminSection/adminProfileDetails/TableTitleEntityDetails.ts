/**
 * @constant tableTitleEntityDetails
 *
 * An array of objects mapping entity types to their corresponding display titles in French.
 *
 * Each object contains:
 * - `entityType` (string): The identifier for the entity.
 * - `title` (string): The human-readable title used for display purposes.
 *
 * @example
 * // Accessing the title for 'therapist'
 * const therapistTitle = tableTitleEntityDetails.find(e => e.entityType === 'therapist')?.title;
 * // therapistTitle === 'thérapeute'
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
