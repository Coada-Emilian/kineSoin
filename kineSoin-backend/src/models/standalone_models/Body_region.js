/**
 * @description Sequelize model for body regions used in treatment workflows.
 *
 * Rationale:
 * - Keeps anatomical categories normalized so afflictions and treatment plans can
 *   reference consistent region identifiers instead of free‑form strings.
 * - Links regions to admins to maintain controlled taxonomy management.
 *
 * Notes:
 * - Naming constraints ensure predictable filtering and UI display across the app.
 */


import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Body_region extends Model {}

Body_region.init(
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
    name: {
      type: DataTypes.STRING(50),
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
  { sequelize, modelName: 'Body_region', tableName: 'body_regions' }
);
