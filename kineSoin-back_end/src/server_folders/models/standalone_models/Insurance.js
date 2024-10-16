import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Insurance extends Model {}

Insurance.init(
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amc_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING(25),
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
  { sequelize, modelName: 'Insurance', tableName: 'insurance_organisms' }
);
