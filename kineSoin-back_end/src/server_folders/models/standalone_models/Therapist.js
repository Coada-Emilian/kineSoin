/**
 * @fileoverview This module defines the model for the `therapists`
 * table in the database using Sequelize. The `Therapist` class
 * extends the Sequelize `Model` and represents therapists
 * registered in the system.
 *
 * The model includes attributes for storing therapist details,
 * including personal information, qualifications, and
 * credentials.
 *
 * @module TherapistModel
 *
 * @extends Model
 *
 * @property {number} id - The primary key of the therapist record,
 *                         auto-incremented.
 * @property {number} admin_id - The ID of the administrator managing
 *                               the therapist, referencing the
 *                               `administrators` table.
 * @property {string} name - The first name of the therapist,
 *                           must be provided and cannot be null.
 * @property {string} surname - The last name of the therapist,
 *                              must be provided and cannot be null.
 * @property {string} description - A detailed description of the
 *                                  therapist's qualifications and
 *                                  services, must be provided.
 * @property {string} diploma - The diploma or certification obtained
 *                              by the therapist, must be provided and
 *                              cannot be null.
 * @property {string} experience - Information about the therapist's
 *                                 experience, must be provided and
 *                                 cannot be null.
 * @property {string} specialty - The therapist's area of specialty.
 * @property {string} email - The email address of the therapist,
 *                           must be unique and provided.
 * @property {string} password - The password for the therapist's
 *                              account, must be provided and cannot be
 *                              null.
 * @property {string} picture_url - The URL of the therapist's profile
 *                                  picture, must be provided.
 * @property {string} picture_id - The ID of the therapist's picture
 *                                 in the storage system.
 * @property {string} licence_code - The unique code representing the
 *                                   therapist's professional license,
 *                                   must be provided and unique.
 * @property {string} status - The current status of the therapist,
 *                            defaulting to 'active'.
 * @property {Date} created_at - The date when the record was created,
 *                               defaults to the current date and time.
 * @property {Date} updated_at - The date when the record was last updated.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Therapist extends Model {}

Therapist.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    diploma: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING(255),
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
    picture_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    picture_id: {
      type: DataTypes.STRING(255),
    },
    licence_code: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'active',
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
  { sequelize, modelName: 'Therapist', tableName: 'therapists' }
);
