/**
 * @description Sequelize model for therapist accounts.
 *
 * Rationale:
 * - Centralizes therapist identity, credentials, and professional details so scheduling,
 *   messaging, prescriptions, and patient assignments all rely on a single authoritative record.
 * - Keeps role boundaries clear by separating therapists from medics, patients, and admins,
 *   which simplifies authentication and permission handling.
 *
 * Notes:
 * - Enforces unique licence codes and validated contact fields to maintain reliable
 *   professional identification.
 * - Stores picture metadata to support secure profile management and consistent media handling.
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
