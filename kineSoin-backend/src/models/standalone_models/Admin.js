/**
 * @description Sequelize model for administrator accounts.
 *
 * Rationale:
 * - Keeps admin credentials isolated from patient/therapist data to simplify permission
 *   boundaries and avoid accidental privilege overlap.
 * - Enforces unique emails and required fields to maintain a reliable authentication layer.
 *
 * Notes:
 * - Timestamps follow the same convention as other models for consistent auditing.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Admin extends Model {}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: 'Admin', tableName: 'administrators' }
);
