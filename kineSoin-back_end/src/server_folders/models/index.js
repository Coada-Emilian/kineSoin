/**
 * @fileoverview This module exports all the defined models and
 * associations for the kinesitherapy management system, making
 * them available for use in the server. It also includes the
 * Sequelize instance used for database operations.
 *
 * The exported models include:
 * - Admin: Represents the administrators managing the system.
 * - Affliction: Represents various afflictions that can be treated.
 * - Appointment: Represents appointments between patients and therapists.
 * - Body_region: Represents body regions related to afflictions.
 * - Medic: Represents medics who prescribe treatments.
 * - Patient: Represents the patients seeking treatment.
 * - Prescription: Represents prescriptions issued to patients.
 * - Therapist: Represents therapists providing treatment.
 * - Patient_message: Represents messages sent by patients.
 * - Therapist_message: Represents messages sent by therapists.
 * - Insurance: Represents insurance plans available for patients.
 * - Patient_Insurance: Represents the many-to-many relationship
 *   between patients and insurances.
 *
 * @module ModelExports
 *
 * @exports Admin
 * @exports Affliction
 * @exports Appointment
 * @exports Body_region
 * @exports Medic
 * @exports Patient
 * @exports Prescription
 * @exports Therapist
 * @exports Patient_message
 * @exports Therapist_message
 * @exports Insurance
 * @exports Patient_Insurance
 * @exports sequelize
 *
 * @example
 * // Importing models and sequelize in another file
 * import { Patient, Therapist, sequelize } from './models.js';
 *
 * // Using the sequelize instance to sync the database
 * await sequelize.sync();
 *
 * // Creating a new patient
 * const newPatient = await Patient.create({
 *   name: 'Jane',
 *   surname: 'Smith',
 *   email: 'jane@example.com',
 * });
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
