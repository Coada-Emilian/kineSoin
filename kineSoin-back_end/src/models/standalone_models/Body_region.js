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
