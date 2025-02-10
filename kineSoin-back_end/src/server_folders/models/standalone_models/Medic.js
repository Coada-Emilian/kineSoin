/**
 * @description Sequelize model for the standalone table 'medics' that stores the data of the medics of the application.
 *
 * This model:
 * - Represents the 'medics' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - admin_id: An integer that references the 'administrators' table.
 *   - name: A string of up to 50 characters that stores the medic's first name.
 *   - surname: A string of up to 50 characters that stores the medic's last name.
 *   - street_number: A string of up to 10 characters that stores the street number of the medic's address.
 *   - street_name: A string of up to 50 characters that stores the street name of the medic's address.
 *   - postal_code: A string of up to 10 characters that stores the postal code of the medic's address.
 *   - city: A string of up to 100 characters that stores the city of the medic's address.
 *   - phone_number: A string of up to 25 characters that stores the phone number of the medic.
 *   - licence_code: A string of up to 9 characters that uniquely identifies the medic, and must be unique.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'medics' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Medic extends Model {}

Medic.init(
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
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
    prefix: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    full_phone_number: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    licence_code: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: true,
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
    modelName: 'Medic',
    tableName: 'medics',
  }
);
