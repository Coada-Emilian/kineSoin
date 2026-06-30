/**
 * @description Sequelize model for afflictions treated in the system.
 *
 * Rationale:
 * - Keeps medical conditions normalized and linked to body regions and admins,
 *   which avoids duplication and supports consistent clinical workflows.
 * - Tracks whether an affliction was operated on, since this affects treatment
 *   plans, insurance rules, and appointment logic.
 *
 * Notes:
 * - Uses strict codes and naming constraints to align with real insurance
 *   and diagnostic formats.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Affliction extends Model {}

Affliction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'administrators',
        key: 'id',
      },
    },
    body_region_id: {
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
    description: {
      type: DataTypes.TEXT,
    },
    insurance_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    is_operated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
  { sequelize, modelName: 'Affliction', tableName: 'afflictions' }
);
