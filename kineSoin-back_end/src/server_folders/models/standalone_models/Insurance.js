/**
 * @description Sequelize model for the standalone table 'insurance_organisms' that stores the data of the insurance organisms that can be linked to the patients.
 *
 * This model:
 * - Represents the 'insurance_organisms' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - admin_id: An integer that references the 'administrators' table.
 *   - name: A string of up to 255 characters that stores the name of the insurance organism.
 *   - amc_code: A string of up to 9 characters that uniquely identifies the insurance organism, and must be unique.
 *   - street_number: A string of up to 10 characters that stores the street number of the insurance organism's address.
 *   - street_name: A string of up to 50 characters that stores the street name of the insurance organism's address.
 *   - postal_code: A string of up to 10 characters that stores the postal code of the insurance organism's address.
 *   - city: A string of up to 100 characters that stores the city of the insurance organism's address.
 *   - phone_number: A string of up to 25 characters that stores the phone number of the insurance organism.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'insurance_organisms' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
 */

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
      type: DataTypes.STRING(9),
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
