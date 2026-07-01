/**
 * @description Sequelize model for messages sent by patients to therapists.
 *
 * Rationale:
 * - Keeps patient–therapist communication structured and queryable instead of relying
 *   on ad‑hoc text storage, which supports clear audit trails and conversation history.
 * - Separates date and time fields to avoid timezone drift and to make chronological
 *   sorting predictable across the app.
 *
 * Notes:
 * - Uses strict foreign keys to ensure messages always map to valid patient and therapist
 *   records, preserving data integrity in the messaging workflow.
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
