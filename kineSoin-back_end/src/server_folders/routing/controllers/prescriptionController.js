// Purpose: Define the prescription controller, which contains the methods for getting all prescriptions, getting one prescription, and adding a new prescription.

import Joi from 'joi';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import { Patient, Prescription } from '../../models/associations.js';

const prescriptionController = {
  // Function to get all prescriptions for a patient
  getAllPrescriptions: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundPatient = await Patient.findByPk(patientId, {
          attributes: ['id', 'name', 'surname', 'status'],
          include: [
            {
              association: 'prescriptions',
              required: false,
              where: { is_completed: false },
              attributes: [
                'id',
                'date',
                'appointment_quantity',
                'at_home_care',
                'picture_url',
              ],
              include: [
                {
                  association: 'medic',
                  attributes: ['id', 'name', 'surname', 'licence_code'],
                },
                {
                  association: 'affliction',
                  attributes: [
                    'id',
                    'name',
                    'insurance_code',
                    'description',
                    'insurance_code',
                  ],
                },
              ],
            },
          ],
        });

        checkPatientStatus(foundPatient);

        if (!foundPatient.prescriptions.length) {
          return res.status(200).json({ prescriptions: [] });
        } else {
          const prescriptions = foundPatient.prescriptions;
          res.status(200).json(prescriptions);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to add a new prescription by a patient
  addNewPrescription: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundPatient = await Patient.findByPk(patientId);

        checkPatientStatus(foundPatient);

        const appointmentQuantity = parseInt(req.body.appointment_quantity, 10);

        if (isNaN(appointmentQuantity)) {
          req.body.appointment_quantity = null;
        }

        const prescriptionSchema = Joi.object({
          medic_id: Joi.number().integer().required(),
          affliction_id: Joi.number().integer().required(),
          appointment_quantity: Joi.number().integer().optional().allow(null),
          at_home_care: Joi.boolean().required(),
          date: Joi.date().required(),
        });

        if (!req.body) {
          return res
            .status(400)
            .json({ message: 'Please provide the prescription details' });
        }

        const { error } = prescriptionSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const {
          medic_id,
          affliction_id,
          appointment_quantity,
          at_home_care,
          date,
        } = req.body;

        if (!req.file) {
          return res
            .status(400)
            .json({ message: 'Please upload a prescription scan' });
        }

        const { path, filename } = req.file;

        const picture_url = path;
        const picture_id = filename;

        const uploadedPrescription = await Prescription.create({
          medic_id,
          patient_id: patientId,
          affliction_id,
          appointment_quantity,
          is_new_prescription: true,
          is_completed: false,
          at_home_care,
          date,
          picture_url,
          picture_id,
        });

        res.status(201).json({
          message: 'Prescription added successfully!',
          uploadedPrescription,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Get one prescription
  getOnePrescription: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const prescriptionId = parseInt(req.params.id, 10);

    checkIsValidNumber(prescriptionId);

    const foundPrescription = await Prescription.findOne({
      where: { id: prescriptionId, patient_id: patientId, is_completed: false },
      attributes: [
        'id',
        'date',
        'appointment_quantity',
        'at_home_care',
        'picture_url',
      ],
      include: [
        {
          association: 'medic',
          attributes: ['id', 'name', 'surname', 'licence_code'],
        },
        {
          association: 'affliction',
          attributes: ['id', 'name', 'description', 'insurance_code'],
        },
      ],
    });

    if (!foundPrescription) {
      return res.status(400).json({ message: 'Prescription not found' });
    } else {
      return res.status(200).json(foundPrescription);
    }
  },
};

export default prescriptionController;
