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
    region_id: {
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
    insurance_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_operated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    insurance_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: 'Affliction', tableName: 'afflictions' }
);
