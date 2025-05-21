/**
 * @function getDeleteModalEntityDetails
 *
 * This function extracts relevant details for displaying entity-specific deletion confirmation messages
 * in the admin delete modal. It maps an entity to its type-specific details such as full name or name.
 *
 * @param {IEntityInterface} entity - The entity object to extract details from.
 * @returns {Array} - An array of objects containing entity type and relevant identification properties.
 *
 * @property {string} entityType - The type of the entity (e.g., therapist, patient, affliction, etc.).
 * @property {string} [full_name] - The full name of the entity if applicable.
 * @property {string} [name] - The name of the entity if applicable.
 *
 * @example
 * const entityDetails = getDeleteModalEntityDetails(therapist);
 * console.log(entityDetails); // [{ entityType: 'therapist', full_name: 'John Doe' }]
 *
 * @remarks
 * - Supports multiple entity types: therapists, patients, afflictions, medics, and insurance organisms.
 * - Uses TypeScript casting to ensure type-specific property access.
 * - Intended for use in deletion confirmation modals.
 */

import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';
import { IEntityInterface } from '../../../../../../@types/types/componentTypes';

export const getDeleteModalEntityDetails = (entity: IEntityInterface) => [
  {
    entityType: 'therapist',
    full_name: (entity as ITherapist).fullName,
  },
  {
    entityType: 'patient',
    full_name: (entity as IPatient).fullName,
  },
  {
    entityType: 'affliction',
    name: (entity as IAffliction).name,
  },
  {
    entityType: 'medic',
    full_name: (entity as IMedic).fullName,
  },
  {
    entityType: 'insurance',
    name: (entity as IInsurance).name,
  },
];
