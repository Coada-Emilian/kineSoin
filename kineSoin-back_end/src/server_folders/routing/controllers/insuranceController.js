// Purpose: Define the insurance controller, which contains the methods for getting, updating, and adding insurance information for patients.

import Joi from 'joi';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Patient, Patient_Insurance, Insurance } from '../../models/index.js';

const insuranceController = {
  // Get the insurance information for a patient
  getInsurance: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 80;

    checkIsIdNumber(patientId);

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

  // Update the insurance information for a patient
  updateInsurance: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const updateInsuranceSchema = Joi.object({
      insurance_id: Joi.number().optional(),
      adherent_code: Joi.string().optional(),
      contract_number: Joi.string().optional(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
    }).min(2);

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
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
        adherent_code: req.body.adherent_code || foundInsurance.adherent_code,
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
  },

  // Add insurance information for a patient
  addInsurance: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 81;

    checkIsIdNumber(patientId);

    const addInsuranceSchema = Joi.object({
      insurance_id: Joi.number().required(),
      adherent_code: Joi.string().required(),
      contract_number: Joi.string().required(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
    });

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }

    const { error } = addInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const addedInsurance = await Patient_Insurance.create({
      patient_id: patientId,
      insurance_id: req.body.insurance_id,
      adherent_code: req.body.adherent_code,
      contract_number: req.body.contract_number,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });

    if (!addedInsurance) {
      return res.status(400).json({ message: 'The insurance was not added' });
    } else {
      return res
        .status(200)
        .json({ message: 'The insurance was added', addedInsurance });
    }
  },

  // Get all insurance organisms
  getAllInsuranceOrganisms: async (req, res) => {
    const allInsurances = await Insurance.findAll({
      attributes: ['id', 'name', 'amc_code'],
    });

    if (!allInsurances) {
      return res.status(400).json({ message: 'No insurance found' });
    } else {
      return res.status(200).json(allInsurances);
    }
  },

  // Delete an insurance organism
  deleteInsuranceOrganism: async (req, res) => {
    const insuranceId = parseInt(req.params.insurance_id, 10);

    checkIsIdNumber(insuranceId);

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
  },

  // Create an insurance organism
  createInsuranceOrganism: async (req, res) => {
    const adminId = req.session.admin_id;
    checkIsIdNumber(adminId);

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
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
  },

  // Get one insurance organism
  getOneInsuranceOrganism: async (req, res) => {
    const insuranceId = parseInt(req.params.insurance_id, 10);

    checkIsIdNumber(insuranceId);

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
      ],
    });

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
    };

    if (!foundInsurance) {
      return res.status(400).json({ message: 'Insurance not found' });
    } else {
      return res.status(200).json(sentInsurance);
    }
  },

  // Update an insurance organism
  updateInsuranceOrganism: async (req, res) => {
    const adminId = req.session.admin_id;
    checkIsIdNumber(adminId);
    const insuranceId = parseInt(req.params.insurance_id, 10);
    checkIsIdNumber(insuranceId);

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
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
    } = req.body;

    const foundInsurance = await Insurance.findByPk(insuranceId);

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
  },
};

export default insuranceController;
