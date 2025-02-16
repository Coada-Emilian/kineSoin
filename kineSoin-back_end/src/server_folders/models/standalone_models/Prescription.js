/**
 * @description Sequelize model for the standalone table 'prescriptions' that stores the data of the prescriptions given to patients by medics.
 *
 * This model:
 * - Represents the 'prescriptions' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - medic_id: An integer that references the 'medics' table.
 *   - patient_id: An integer that references the 'patients' table.
 *   - affliction_id: An integer that references the 'afflictions' table.
 *   - appointment_quantity: An integer that represents the number of appointments prescribed.
 *   - is_completed: A boolean value that indicates whether the prescription has been completed, defaulting to false.
 *   - at_home_care: A boolean value that indicates whether the prescription involves at-home care, defaulting to false.
 *   - date: A date-only field that represents the date of the prescription.
 *   - picture_url: A string of up to 255 characters that stores the URL of the prescription's picture.
 *   - picture_id: A string of up to 255 characters that stores the ID of the prescription's picture in the storage service.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'prescriptions' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
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
      allowNull: true,
    },
    is_new_prescription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
