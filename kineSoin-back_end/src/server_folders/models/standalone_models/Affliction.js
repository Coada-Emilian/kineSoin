/**
 * @fileoverview This module defines the model for the `afflictions`
 * table in the database using Sequelize. The `Affliction` class extends
 * the Sequelize `Model` and represents various afflictions that patients
 * may have, including their details and relationships to administrators
 * and body regions.
 *
 * The model includes attributes for storing information related to
 * afflictions, including the name, description, insurance code, and
 * operational status, as well as timestamps for record creation and updates.
 *
 * @module AfflictionModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the affliction record,
 *                         auto-incremented.
 * @property {number} admin_id - The ID of the admin who created or
 *                               manages the affliction, referencing
 *                               the `administrators` table.
 * @property {number} body_region_id - The ID of the body region
 *                                      associated with the affliction,
 *                                      referencing the `therapists` table.
 * @property {string} name - The name of the affliction (up to 50 characters).
 * @property {string} description - A detailed description of the
 *                                  affliction (optional).
 * @property {string} insurance_code - The insurance code associated
 *                                     with the affliction (up to 10 characters).
 * @property {boolean} is_operated - Indicates whether the affliction
 *                                   has been operated on (defaults to false).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
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
