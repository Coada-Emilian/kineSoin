/**
 * @description Sequelize model for the associative table 'patient_insurances' that links patients to their insurance organisms.
 *
 * This model:
 * - Represents the 'patient_insurances' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - patient_id: An integer that references the 'patients' table.
 *   - insurance_id: An integer that references the 'insurance_organisms' table.
 *   - adherent_code: A string of up to 12 characters that uniquely identifies the patient's adherence code.
 *   - contract_number: A string of up to 15 characters that uniquely identifies the patient's contract number.
 *   - start_date: A date that represents the start date of the insurance coverage.
 *   - end_date: A date that represents the end date of the insurance coverage.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'patient_insurances' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
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
