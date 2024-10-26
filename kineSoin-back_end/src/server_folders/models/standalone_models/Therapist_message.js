/**
 * @fileoverview This module defines the model for the `therapist_messages`
 * table in the database using Sequelize. The `Therapist_message` class
 * extends the Sequelize `Model` and represents messages sent from
 * therapists to patients.
 *
 * The model includes attributes for storing message details, including
 * the sender, receiver, content, and timestamps for the message.
 *
 * @module TherapistMessageModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the message record,
 *                         auto-incremented.
 * @property {number} receiver_id - The ID of the patient receiving the
 *                                   message, referencing the `patients` table.
 * @property {number} sender_id - The ID of the therapist sending the
 *                                 message, referencing the `therapists` table.
 * @property {string} content - The text content of the message,
 *                              must be provided and cannot be null.
 * @property {Date} date - The date when the message was sent,
 *                         must be provided.
 * @property {Date} time - The time when the message was sent,
 *                         must be provided.
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Therapist_message extends Model {}

Therapist_message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    sender_id: {
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
  { sequelize, modelName: 'Therapist_message', tableName: 'therapist_messages' }
);
