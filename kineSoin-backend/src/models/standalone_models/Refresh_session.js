import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Refresh_session extends Model {}

Refresh_session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    therapist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    last_used_at: {
      type: DataTypes.DATE,
    },

    revoked_at: {
      type: DataTypes.DATE,
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
  {
    sequelize,
    modelName: 'Refresh_session',
    tableName: 'refresh_sessions',
  }
);
