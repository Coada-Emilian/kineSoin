// Purpose: Sequelize associations between the standalone models of the application.

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
