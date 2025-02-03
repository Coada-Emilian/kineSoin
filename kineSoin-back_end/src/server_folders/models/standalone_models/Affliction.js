/**
 * @description Sequelize model for the standalone table 'afflictions' that stores the data of the afflictions that can be treated by the therapists.
 *
 * This model:
 * - Represents the 'afflictions' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - admin_id: An integer that references the 'administrators' table.
 *   - body_region_id: An integer that references the 'therapists' table.
 *   - name: A string of up to 50 characters that stores the name of the affliction.
 *   - description: A text field that provides a description of the affliction.
 *   - insurance_code: A string of up to 10 characters that stores the insurance code for the affliction.
 *   - is_operated: A boolean value that indicates whether the affliction has been operated upon, defaulting to false.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'afflictions' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
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
