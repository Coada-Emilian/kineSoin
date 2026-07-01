/**
 * @description Sequelize model linking patients to their insurance coverage.
 *
 * Rationale:
 * - Keeps insurance relationships normalized instead of embedding insurance data directly
 *   in patient records, which avoids duplication and supports multiple contracts per patient.
 * - Explicit foreign keys ensure medical and administrative data stay consistent across
 *   prescriptions, billing, and appointment workflows.
 *
 * Notes:
 * - Uses strict length constraints for identifiers to match real insurance formats.
 * - Associations expose patient and insurance entities cleanly for use in includes.
 */

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Patient_Insurance extends Model {
  static associate(models) {
    Patient_Insurance.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patient',
    });

    Patient_Insurance.belongsTo(models.Insurance, {
      foreignKey: 'insurance_id',
      as: 'insurance', // this is what you're using in your include
    });
  }
}

Patient_Insurance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'insurance_organisms',
        key: 'id',
      },
    },
    adherent_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    contract_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
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
  { sequelize, modelName: 'Patient_Insurance', tableName: 'patient_insurances' }
);
