/**
 * @description Sequelize associations file that imports and exports the standalone models and the sequelize client.
 *
 * This module:
 * - Imports the following models:
 *   - Admin, Affliction, Appointment, Body_region, Medic, Patient, Prescription, Therapist, Patient_message, Therapist_message, Insurance, and Patient_Insurance from './associations.js'.
 *   - The sequelize client from './sequelize_client.js'.
 * - Exports the models and the sequelize client for use in other parts of the application.
 *
 * This setup ensures that all standalone models and the sequelize client are properly configured and can be easily accessed throughout the application.
 *
 * Ensure that all referenced models and the sequelize client are properly defined and configured before using this setup.
 */

import {
  Admin,
  Affliction,
  Appointment,
  Body_region,
  Medic,
  Patient,
  Prescription,
  Therapist,
  Patient_message,
  Therapist_message,
  Insurance,
  Patient_Insurance,
} from './associations.js';
import { sequelize } from './sequelize_client.js';

export {
  Admin,
  Affliction,
  Appointment,
  Body_region,
  Medic,
  Patient,
  Prescription,
  Therapist,
  Patient_message,
  Therapist_message,
  Insurance,
  Patient_Insurance,
  sequelize,
};
