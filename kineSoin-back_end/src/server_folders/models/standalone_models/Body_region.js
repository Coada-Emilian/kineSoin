/**
 * @fileoverview This module defines the model for the `body_regions`
 * table in the database using Sequelize. The `Body_region` class
 * extends the Sequelize `Model` and represents different body regions
 * that can be associated with afflictions or therapies in the system.
 *
 * The model includes attributes for storing body region details,
 * including the name of the region, the ID of the admin who created
 * it, and timestamps for record creation and updates.
 *
 * @module BodyRegionModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the body region record,
 *                         auto-incremented.
 * @property {number} admin_id - The ID of the administrator who created
 *                               the body region, referencing the
 *                               `administrators` table.
 * @property {string} name - The name of the body region (must be provided).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

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
