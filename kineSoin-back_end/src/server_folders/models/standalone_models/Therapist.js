/**
 * @description Sequelize model for the standalone table 'therapists' that stores the data of the therapists of the application.
 *
 * This model:
 * - Represents the 'therapists' table in the database.
 * - Defines the table structure with the following fields:
 *   - id: An auto-incrementing integer that serves as the primary key.
 *   - admin_id: An integer that references the 'administrators' table.
 *   - name: A string of up to 50 characters that stores the therapist's first name.
 *   - surname: A string of up to 50 characters that stores the therapist's last name.
 *   - description: A text field that provides a description of the therapist.
 *   - diploma: A string of up to 255 characters that stores the therapist's diploma.
 *   - experience: A string of up to 255 characters that describes the therapist's experience.
 *   - specialty: A string of up to 255 characters that describes the therapist's specialty.
 *   - email: A string of up to 255 characters that stores the email address of the therapist, and must be unique.
 *   - password: A string of up to 255 characters that stores the hashed password of the therapist.
 *   - picture_url: A string of up to 255 characters that stores the URL of the therapist's profile picture.
 *   - picture_id: A string of up to 255 characters that stores the ID of the therapist's profile picture in the storage service.
 *   - licence_code: A string of up to 9 characters that uniquely identifies the therapist, and must be unique.
 *   - status: A string of up to 50 characters that represents the therapist's status, defaulting to 'active'.
 *   - created_at: A date that represents when the record was created, defaulting to the current date and time.
 *   - updated_at: A date that represents when the record was last updated.
 * - Ensures that all fields are properly defined and constrained.
 * - Uses Sequelize to establish the model and link it to the 'therapists' table in the database.
 *
 * Ensure that the sequelize module is installed and properly configured before using this model.
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
    phone_number: {
      type: DataTypes.STRING(15),
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
