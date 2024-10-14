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
