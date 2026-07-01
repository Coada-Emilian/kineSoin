/**
 * @description Central export hub for Sequelize models and the sequelize client.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all models and the database
 *   connection, so other modules don’t need to import from multiple paths.
 * - Keeps the application’s data layer organized by exposing only the fully
 *   associated models defined in the main associations file.
 *
 * Notes:
 * - Ensures consistent model loading order and prevents circular import issues
 *   when working with Sequelize associations.
 */

import {
  Admin,
  Affliction,
  Appointment,
  Body_region,
  Insurance,
  Medic,
  Patient,
  Patient_Insurance,
  Patient_message,
  Prescription,
  Therapist,
  Therapist_message,
} from './associations.js';
import { sequelize } from './sequelize_client.js';

export {
  Admin,
  Affliction,
  Appointment,
  Body_region,
  Insurance,
  Medic,
  Patient,
  Patient_Insurance,
  Patient_message,
  Prescription,
  sequelize,
  Therapist,
  Therapist_message
};

