/**
 * @description Sequelize model for the standalone table 'patients' that stores the data of the patients of the application.
 *
 * This model:
 * - Represents the 'patients' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - therapist_id: An integer that references the 'therapists' table.
 *   - name: A string of up to 50 characters that stores the patient's first name.
 *   - birth_name: A string of up to 50 characters that stores the patient's birth name.
 *   - surname: A string of up to 50 characters that stores the patient's last name.
 *   - gender: A string of up to 10 characters that stores the patient's gender.
 *   - birth_date: A date-only field that represents the patient's birth date.
 *   - street_number: A string of up to 10 characters that stores the street number of the patient's address.
 *   - street_name: A string of up to 50 characters that stores the street name of the patient's address.
 *   - postal_code: A string of up to 10 characters that stores the postal code of the patient's address.
 *   - city: A string of up to 100 characters that stores the city of the patient's address.
 *   - phone_number: A string of up to 25 characters that stores the phone number of the patient.
 *   - email: A string of up to 255 characters that stores the email address of the patient, and must be unique.
 *   - password: A string of up to 255 characters that stores the hashed password of the patient.
 *   - status: A string of up to 10 characters that represents the patient's status, defaulting to 'pending'.
 *   - picture_url: A string of up to 255 characters that stores the URL of the patient's profile picture.
 *   - picture_id: A string of up to 255 characters that stores the ID of the patient's profile picture in the storage service.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'patients' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient extends Model {}

Patient.init(
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birth_name: {
      type: DataTypes.STRING(50),
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    street_number: {
      type: DataTypes.STRING(10),
    },
    street_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'pending',
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
  { sequelize, modelName: 'Patient', tableName: 'patients' }
);
