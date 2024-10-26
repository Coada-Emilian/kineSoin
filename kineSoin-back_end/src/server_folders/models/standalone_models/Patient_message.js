/**
 * @fileoverview This module defines the model for the `patient_messages`
 * table in the database using Sequelize. The `Patient_message` class
 * extends the Sequelize `Model` and represents messages exchanged
 * between patients and therapists in the system.
 *
 * The model includes attributes for storing details related to each
 * message, including sender and receiver IDs, message content, and
 * timestamps.
 *
 * @module PatientMessageModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the message record,
 *                         auto-incremented.
 * @property {number} sender_id - The ID of the patient sending the
 *                                message, referencing the `patients` table.
 * @property {number} receiver_id - The ID of the therapist receiving the
 *                                  message, referencing the `therapists` table.
 * @property {string} content - The content of the message (must be provided).
 * @property {Date} date - The date when the message was sent (must be provided).
 * @property {Time} time - The time when the message was sent (must be provided).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient_message extends Model {}

Patient_message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'therapists',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
  { sequelize, modelName: 'Patient_message', tableName: 'patient_messages' }
);
