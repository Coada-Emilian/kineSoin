/**
 * @fileoverview This module defines the model for the `patient_insurances`
 * table in the database using Sequelize. The `Patient_Insurance` class
 * extends the Sequelize `Model` and represents the relationship between
 * patients and their insurance details.
 *
 * The model includes attributes for storing information related to
 * insurance, including the patient ID, insurance ID, adherent code,
 * contract number, start and end dates of coverage, and timestamps for
 * record creation and updates.
 *
 * @module PatientInsuranceModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the patient insurance record,
 *                         auto-incremented.
 * @property {number} patient_id - The ID of the patient associated with
 *                                 this insurance.
 * @property {number} insurance_id - The ID of the insurance organism.
 * @property {string} adherent_code - A unique code for the insurance
 *                                    adherent (12 characters).
 * @property {string} contract_number - A unique number for the insurance
 *                                      contract (15 characters).
 * @property {Date} start_date - The date when the insurance coverage starts.
 * @property {Date} end_date - The date when the insurance coverage ends.
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient_Insurance extends Model {}

Patient_Insurance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'insurance_organisms',
        key: 'id',
      },
    },
    adherent_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    contract_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
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
  { sequelize, modelName: 'Patient_Insurance', tableName: 'patient_insurances' }
);
