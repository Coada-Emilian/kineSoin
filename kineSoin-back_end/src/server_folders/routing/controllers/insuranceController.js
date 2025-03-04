// Purpose: Define the insurance controller, which contains the methods for getting, updating, and adding insurance information for patients.

import Joi from 'joi';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import { Patient, Patient_Insurance, Insurance } from '../../models/index.js';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';

const insuranceController = {
  // Function to get all insurances for a patient
  getInsurancesAsPatient: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundPatient = await Patient.findByPk(patientId);

        if (foundPatient) {
          const response = checkPatientStatus(foundPatient);
          if (response) {
            const foundInsurances = await Insurance.findAll({
              attributes: ['id', 'name'],
            });

            if (!foundInsurances) {
              return res.status(400).json({ message: 'No insurances found' });
            } else {
              return res.status(200).json(foundInsurances);
            }
          }
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching insurances.' });
      }
    }
  },

  // Function to update an insurance for a patient
  updateInsurance: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const updateInsuranceSchema = Joi.object({
          insurance_id: Joi.number().optional(),
          adherent_code: Joi.string().optional(),
          contract_number: Joi.string().optional(),
          start_date: Joi.date().iso().required(),
          end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
        }).min(1);

        if (!req.body) {
          return res.status(400).json({
            message:
              'Request body is missing. Please provide the necessary data.',
          });
        }

        const { error } = updateInsuranceSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const foundInsurance = await Patient_Insurance.findOne({
          where: { patient_id: patientId },
        });

        if (!foundInsurance) {
          return res.status(400).json({ message: 'Insurance not found' });
        } else {
          const updatedInsurance = {
            patient_id: patientId,
            insurance_id: req.body.insurance_id || foundInsurance.insurance_id,
            adherent_code:
              req.body.adherent_code || foundInsurance.adherent_code,
            contract_number:
              req.body.contract_number || foundInsurance.contract_number,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
          };

          const response = await foundInsurance.update(updatedInsurance);

          if (response) {
            return res
              .status(200)
              .json({ message: 'The insurance was updated', response });
          } else {
            return res
              .status(400)
              .json({ message: 'The insurance was not updated', response });
          }
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error updating insurance.' });
      }
    }
  },

  // Function to add an insurance to a patient
  addInsurance: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const addInsuranceSchema = Joi.object({
          insurance_id: Joi.number().required(),
          adherent_code: Joi.string().required(),
          contract_number: Joi.string().required(),
          start_date: Joi.date().iso().required(),
          end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
        });

        if (!req.body) {
          return res.status(400).json({
            message:
              'Request body is missing. Please provide the necessary data.',
          });
        }

        const { error } = addInsuranceSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const {
          insurance_id,
          adherent_code,
          contract_number,
          start_date,
          end_date,
        } = req.body;

        const sentInsurance = {
          patient_id: patientId,
          insurance_id,
          adherent_code,
          contract_number,
          start_date,
          end_date,
        };

        const addedInsurance = await Patient_Insurance.create(sentInsurance);

        if (!addedInsurance) {
          return res
            .status(400)
            .json({ message: 'The insurance was not added' });
        } else {
          return res
            .status(200)
            .json({ message: 'The insurance was added', addedInsurance });
        }
      } catch (error) {
        return res.status(500).json({
          message:
            'Error adding insurance. Contract number or adherent code already exists.',
        });
      }
    }
  },

  // Function to get all insurance organisms
  getAllInsuranceOrganisms: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const allInsurances = await Insurance.findAll({
          attributes: ['id', 'name', 'amc_code'],
        });

        if (!allInsurances) {
          return res.status(400).json({ message: 'No insurance found' });
        } else {
          return res.status(200).json(allInsurances);
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching insurances.' });
      }
    }
  },

  // Function to delete an insurance organism
  deleteInsuranceOrganism: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const insuranceId = parseInt(req.params.insurance_id, 10);

        checkIsValidNumber(insuranceId);

        const foundInsurance = await Insurance.findByPk(insuranceId);

        if (!foundInsurance) {
          return res.status(400).json({ message: 'Insurance not found' });
        } else {
          const response = await foundInsurance.destroy();

          if (response) {
            return res
              .status(200)
              .json({ message: 'The insurance was deleted', response });
          } else {
            return res
              .status(400)
              .json({ message: 'The insurance was not deleted', response });
          }
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting insurance.' });
      }
    }
  },

  // Function to create an insurance organism
  createInsuranceOrganism: async (req, res) => {
    const adminId = parseInt(req.admin_id, 10);

    checkIsValidNumber(adminId);

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        if (!req.body) {
          return res.status(400).json({
            message:
              'Request body is missing. Please provide the necessary data.',
          });
        }

        const {
          name,
          amc_code,
          street_number,
          street_name,
          postal_code,
          city,
          phone_number,
          prefix,
          full_phone_number,
        } = req.body;

        const sentInsurance = {
          admin_id: adminId,
          name,
          amc_code,
          street_number,
          street_name,
          postal_code,
          city,
          phone_number,
          prefix,
          full_phone_number,
        };

        const createInsuranceSchema = Joi.object({
          admin_id: Joi.number().optional(),
          name: Joi.string().optional(),
          amc_code: Joi.string().optional(),
          street_number: Joi.string().optional(),
          street_name: Joi.string().optional(),
          postal_code: Joi.string().optional(),
          city: Joi.string().optional(),
          phone_number: Joi.string().optional(),
          prefix: Joi.string().optional(),
          full_phone_number: Joi.string().optional(),
        }).min(1);

        const { error } = createInsuranceSchema.validate(sentInsurance);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const response = await Insurance.create(sentInsurance);

        if (response) {
          return res
            .status(200)
            .json({ message: 'Insurance organism created', response });
        } else {
          return res
            .status(400)
            .json({ message: 'Insurance organism not created', response });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error creating insurance.' });
      }
    }
  },

  // Function to get one insurance organism
  getOneInsuranceOrganism: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const insuranceId = parseInt(req.params.insurance_id, 10);

        checkIsValidNumber(insuranceId);

        const foundInsurance = await Insurance.findByPk(insuranceId, {
          attributes: [
            'id',
            'name',
            'amc_code',
            'street_number',
            'street_name',
            'postal_code',
            'city',
            'phone_number',
            'prefix',
            'full_phone_number',
          ],
        });

        const fullPhoneNumber =
          foundInsurance.prefix + foundInsurance.phone_number;
        const sentInsurance = {
          id: foundInsurance.id,
          name: foundInsurance.name,
          amc_code: foundInsurance.amc_code,
          street_number: foundInsurance.street_number,
          street_name: foundInsurance.street_name,
          postal_code: foundInsurance.postal_code,
          city: foundInsurance.city,
          address: `${foundInsurance.street_number} ${foundInsurance.street_name}, ${foundInsurance.postal_code} ${foundInsurance.city}`,
          phone_number: foundInsurance.phone_number,
          prefix: foundInsurance.prefix,
          full_phone_number: fullPhoneNumber,
        };

        if (!foundInsurance) {
          return res.status(400).json({ message: 'Insurance not found' });
        } else {
          return res.status(200).json(sentInsurance);
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching insurance.' });
      }
    }
  },

  // Function to update an insurance organism
  updateInsuranceOrganism: async (req, res) => {
    const adminId = parseInt(req.admin_id, 10);
    checkIsValidNumber(adminId);

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const insuranceId = parseInt(req.params.insurance_id, 10);
        checkIsValidNumber(insuranceId);

        if (!req.body) {
          return res.status(400).json({
            message:
              'Request body is missing. Please provide the necessary data.',
          });
        }

        const {
          name,
          amc_code,
          street_number,
          street_name,
          postal_code,
          city,
          prefix,
          phone_number,
        } = req.body;

        const foundInsurance = await Insurance.findByPk(insuranceId);

        const fullPhoneNumber = prefix + phone_number;

        if (!foundInsurance) {
          return res.status(400).json({ message: 'Insurance not found' });
        }

        const sentInsurance = {
          admin_id: adminId,
          name: name || foundInsurance.name,
          amc_code: amc_code || foundInsurance.amc_code,
          street_number: street_number || foundInsurance.street_number,
          street_name: street_name || foundInsurance.street_name,
          postal_code: postal_code || foundInsurance.postal_code,
          city: city || foundInsurance.city,
          phone_number: phone_number || foundInsurance.phone_number,
          prefix: prefix || foundInsurance.prefix,
          full_phone_number:
            fullPhoneNumber || foundInsurance.full_phone_number,
        };

        const updateInsuranceSchema = Joi.object({
          admin_id: Joi.number().optional(),
          name: Joi.string().optional(),
          amc_code: Joi.string().optional(),
          street_number: Joi.string().optional(),
          street_name: Joi.string().optional(),
          postal_code: Joi.string().optional(),
          city: Joi.string().optional(),
          phone_number: Joi.string().optional(),
          prefix: Joi.string().optional(),
          full_phone_number: Joi.string().optional(),
        }).min(1);

        const { error } = updateInsuranceSchema.validate(sentInsurance);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const response = await foundInsurance.update(sentInsurance);

        if (response) {
          return res
            .status(200)
            .json({ message: 'Insurance organism updated', response });
        } else {
          return res
            .status(400)
            .json({ message: 'Insurance organism not updated', response });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error updating insurance.' });
      }
    }
  },

  // Get the insurance information for a patient
  getInsurance: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 80;

    checkIsValidNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname'],
      include: [
        {
          association: 'insurance',
          attributes: [
            'id',
            'name',
            'amc_code',
            'street_number',
            'street_name',
            'postal_code',
            'city',
            'phone_number',
          ],
          through: {
            attributes: [
              'adherent_code',
              'contract_number',
              'start_date',
              'end_date',
            ],
          },
        },
      ],
    });

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      const sentInsurance = {
        patientName: `${foundPatient.name} ${foundPatient.surname}`,
        insurance: {
          id: foundPatient.insurance[0].id,
          name: foundPatient.insurance[0].name,
          amc_code: foundPatient.insurance[0].amc_code,
          address: `${foundPatient.insurance[0].street_number} ${foundPatient.insurance[0].street_name}, ${foundPatient.insurance[0].postal_code} ${foundPatient.insurance[0].city}`,
          phone_number: foundPatient.insurance[0].phone_number,
          details: {
            adherent_code:
              foundPatient.insurance[0].Patient_Insurance.adherent_code,
            contract_number:
              foundPatient.insurance[0].Patient_Insurance.contract_number,
            start_date: foundPatient.insurance[0].Patient_Insurance.start_date,
            end_date: foundPatient.insurance[0].Patient_Insurance.end_date,
          },
        },
      };
      return res.status(200).json(sentInsurance);
    }
  },
};

export default insuranceController;
