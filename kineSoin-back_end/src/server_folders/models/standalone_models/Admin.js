/**
 * @fileoverview This module defines the model for the `administrators`
 * table in the database using Sequelize. The `Admin` class extends the
 * Sequelize `Model` and represents the admin users who manage the
 * application.
 *
 * The model includes attributes for storing information related to
 * admins, including their name, email, password, and timestamps for
 * record creation and updates.
 *
 * @module AdminModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the admin record,
 *                         auto-incremented.
 * @property {string} name - The name of the admin (up to 50 characters).
 * @property {string} email - The email address of the admin (unique,
 *                           up to 255 characters).
 * @property {string} password - The hashed password of the admin
 *                               (up to 255 characters).
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Admin extends Model {}

Admin.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
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
  { sequelize, modelName: 'Admin', tableName: 'administrators' }
);
