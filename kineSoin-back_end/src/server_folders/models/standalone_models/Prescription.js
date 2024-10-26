/**
 * @fileoverview This module defines the model for the `prescriptions`
 * table in the database using Sequelize. The `Prescription` class
 * extends the Sequelize `Model` and represents the prescription
 * details associated with a patient and a medic.
 *
 * The model includes attributes for storing prescription information,
 * including the associated medic, patient, affliction, and other
 * relevant details regarding the treatment plan.
 *
 * @module PrescriptionModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the prescription record,
 *                         auto-incremented.
 * @property {number} medic_id - The ID of the medic who issued the
 *                                prescription, referencing the `medics` table.
 * @property {number} patient_id - The ID of the patient who received
 *                                  the prescription, referencing the `patients` table.
 * @property {number} affliction_id - The ID of the affliction related to
 *                                     the prescription, referencing the `afflictions` table.
 * @property {number} appointment_quantity - The quantity of appointments
 *                                           prescribed.
 * @property {boolean} is_completed - A flag indicating whether the prescription
 *                                    has been completed, defaults to `false` and cannot be null.
 * @property {boolean} at_home_care - A flag indicating whether the care is
 *                                     to be provided at home, defaults to `false`.
 * @property {Date} date - The date of the prescription (must be provided).
 * @property {string} picture_url - The URL for any associated prescription image
 *                                   (must be provided).
 * @property {string} picture_id - The ID of the uploaded picture.
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Prescription extends Model {}

Prescription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'medics',
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
    affliction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'afflictions',
        key: 'id',
      },
    },
    appointment_quantity: {
      type: DataTypes.INTEGER,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    at_home_care: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    picture_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    picture_id: {
      type: DataTypes.STRING(255),
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
  { sequelize, modelName: 'Prescription', tableName: 'prescriptions' }
);
