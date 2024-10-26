/**
 * @fileoverview This module defines the model for the `appointments`
 * table in the database using Sequelize. The `Appointment` class
 * extends the Sequelize `Model` and represents appointments
 * scheduled between therapists and patients, along with related
 * information such as prescriptions and status indicators.
 *
 * The model includes attributes for storing appointment details,
 * including the therapist and patient IDs, prescription ID,
 * appointment date and time, and status flags for cancellation
 * and acceptance, as well as timestamps for record creation and updates.
 *
 * @module AppointmentModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the appointment record,
 *                         auto-incremented.
 * @property {number} therapist_id - The ID of the therapist associated
 *                                   with the appointment, referencing
 *                                   the `therapists` table.
 * @property {number} patient_id - The ID of the patient associated with
 *                                  the appointment, referencing the
 *                                  `patients` table.
 * @property {number} prescription_id - The ID of the prescription
 *                                       associated with the appointment,
 *                                       referencing the `prescriptions` table.
 * @property {boolean} is_canceled - Indicates whether the appointment
 *                                   has been canceled (defaults to false).
 * @property {boolean} is_accepted - Indicates whether the appointment
 *                                   has been accepted (defaults to false).
 * @property {Date} date - The date of the appointment (must be provided).
 * @property {Date} time - The time of the appointment (must be provided).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    therapist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'therapists',
        key: 'id',
      },
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    prescription_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prescriptions',
        key: 'id',
      },
    },
    is_canceled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: 'Appointment', tableName: 'appointments' }
);
