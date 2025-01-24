// Purpose: Sequelize model of the associative table 'patient_insurances' that links patients to their insurance organisms.

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient_Insurance extends Model {}

Patient_Insurance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'insurance_organisms',
        key: 'id',
      },
    },
    adherent_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    contract_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
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
  { sequelize, modelName: 'Patient_Insurance', tableName: 'patient_insurances' }
);
