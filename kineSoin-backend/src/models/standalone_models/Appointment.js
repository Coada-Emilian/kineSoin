/**
 * @description Sequelize model for therapy appointments.
 *
 * Rationale:
 * - Keeps scheduling logic normalized by linking appointments to therapists,
 *   patients, and prescriptions, ensuring treatment plans stay consistent.
 * - Tracks acceptance and cancellation states directly in the model so workflow
 *   rules can be enforced at the data level.
 *
 * Notes:
 * - Uses separate date/time fields to avoid timezone drift and to simplify
 *   daily scheduling operations.
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
