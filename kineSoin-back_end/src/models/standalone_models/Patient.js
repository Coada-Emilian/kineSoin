import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient extends Model {}

Patient.init(
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
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birth_name: {
        type: DataTypes.STRING(50),
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      street_number: {
        type: DataTypes.STRING(10),
      },
      street_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
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
      old_password: {
        type: DataTypes.STRING(255),
      },
      new_password: {
        type: DataTypes.STRING(255),
      },
      repeat_password: { type: DataTypes.STRING(255) },
      status: {
        type: DataTypes.STRING(10),
        defaultValue: 'pending',
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
  },
  { sequelize, 
    modelName: 'Patient', 
    tableName: 'patients' 
  }
);
