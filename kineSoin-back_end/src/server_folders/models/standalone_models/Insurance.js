/**
 * @fileoverview This module defines the model for the `insurance_organisms`
 * table in the database using Sequelize. The `Insurance` class
 * extends the Sequelize `Model` and represents various insurance
 * organizations available in the system.
 *
 * The model includes attributes for storing details related to each
 * insurance organization, such as name, address, contact information,
 * and administrative details.
 *
 * @module InsuranceModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the insurance record,
 *                         auto-incremented.
 * @property {number} admin_id - The ID of the administrator who created
 *                               the insurance record, referencing the
 *                               `administrators` table.
 * @property {string} name - The name of the insurance organization (must be provided).
 * @property {string} amc_code - The unique AMC code assigned to the insurance organization.
 * @property {string} street_number - The street number of the insurance organization's address.
 * @property {string} street_name - The street name of the insurance organization's address (must be provided).
 * @property {string} postal_code - The postal code of the insurance organization's address (must be provided).
 * @property {string} city - The city of the insurance organization's address (must be provided).
 * @property {string} phone_number - The contact phone number of the insurance organization (must be provided).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
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
