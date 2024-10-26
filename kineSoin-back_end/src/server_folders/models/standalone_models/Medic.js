/**
 * @fileoverview This module defines the model for the `medics` table in the
 * database using Sequelize. The `Medic` class extends the Sequelize
 * `Model` and represents medical professionals available in the system.
 *
 * The model includes attributes for storing details related to each
 * medic, such as personal information, contact details, and
 * administrative details.
 *
 * @module MedicModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the medic record,
 *                         auto-incremented.
 * @property {number} admin_id - The ID of the administrator who created
 *                               the medic record, referencing the
 *                               `administrators` table.
 * @property {string} name - The first name of the medic (must be provided).
 * @property {string} surname - The last name of the medic (must be provided).
 * @property {string} street_number - The street number of the medic's address.
 * @property {string} street_name - The street name of the medic's address (must be provided).
 * @property {string} postal_code - The postal code of the medic's address (must be provided).
 * @property {string} city - The city of the medic's address (must be provided).
 * @property {string} phone_number - The contact phone number of the medic (must be provided).
 * @property {string} licence_code - The unique license code assigned to the medic (must be provided).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
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
    phone_number: {
      type: DataTypes.STRING(25),
      allowNull: false,
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
