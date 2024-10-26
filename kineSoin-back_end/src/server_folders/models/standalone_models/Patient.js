/**
 * @fileoverview This module defines the model for the `patients`
 * table in the database using Sequelize. The `Patient` class
 * extends the Sequelize `Model` and represents patient information
 * within the system.
 *
 * The model includes attributes for storing personal details
 * about each patient, including their therapist association,
 * contact information, and status.
 *
 * @module PatientModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the patient record,
 *                         auto-incremented.
 * @property {number} therapist_id - The ID of the therapist assigned
 *                                    to the patient, referencing the
 *                                    `therapists` table.
 * @property {string} name - The first name of the patient (must be provided).
 * @property {string} birth_name - The birth name of the patient.
 * @property {string} surname - The last name of the patient (must be provided).
 * @property {string} gender - The gender of the patient (must be provided).
 * @property {Date} birth_date - The birth date of the patient
 *                                (must be provided).
 * @property {string} street_number - The street number of the patient's address.
 * @property {string} street_name - The street name of the patient's address
 *                                  (must be provided).
 * @property {string} postal_code - The postal code of the patient's address
 *                                  (must be provided).
 * @property {string} city - The city of the patient's address
 *                          (must be provided).
 * @property {string} phone_number - The phone number of the patient
 *                                   (must be provided).
 * @property {string} email - The email address of the patient
 *                           (must be unique and provided).
 * @property {string} password - The password for the patient's account
 *                               (must be provided).
 * @property {string} status - The status of the patient, defaulting to
 *                            'pending' and cannot be null.
 * @property {string} picture_url - The URL for the patient's profile picture
 *                                   (must be provided).
 * @property {string} picture_id - The ID of the uploaded picture.
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
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
