/**
 * @description Sequelize model for the standalone table 'appointments' that stores the data of the appointments between therapists and patients.
 *
 * This model:
 * - Represents the 'appointments' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - therapist_id: An integer that references the 'therapists' table.
 *   - patient_id: An integer that references the 'patients' table.
 *   - prescription_id: An integer that references the 'prescriptions' table.
 *   - is_canceled: A boolean value that indicates whether the appointment is canceled, defaulting to false.
 *   - is_accepted: A boolean value that indicates whether the appointment is accepted, defaulting to false.
 *   - date: A date-only field that represents the date of the appointment.
 *   - time: A time field that represents the time of the appointment.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'appointments' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
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
