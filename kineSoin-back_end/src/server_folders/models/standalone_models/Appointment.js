import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Appointment extends Model {}

Appointment.init(
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
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    prescription_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prescriptions',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
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
  { sequelize, modelName: 'Appointment', tableName: 'appointments' }
);
