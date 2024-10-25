// Purpose: Define the insurance controller, which contains the methods for getting, updating, and adding insurance information for patients.

import Joi from 'joi';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Patient, Patient_Insurance, Insurance } from '../../models/index.js';

const insuranceController = {
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
};

export default insuranceController;
