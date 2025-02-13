// Purpose: to handle requests from the medic routes and send responses back to the client.

import Joi from 'joi';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import { Medic } from '../../models/associations.js';

const medicController = {
  // Function to get all medics
  getAllMedics: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const foundMedics = await Medic.findAll({
          attributes: [
            'id',
            'name',
            'surname',
            'street_number',
            'street_name',
            'postal_code',
            'city',
            'phone_number',
            'licence_code',
          ],
        });

        if (!foundMedics) {
          return res.status(404).json({ message: 'No medics found.' });
        } else {
          const sentMedics = [];

          for (const medic of foundMedics) {
            const newMedic = {
              id: medic.id,
              fullName: `${medic.name} ${medic.surname}`,
              address: `${medic.street_number} ${medic.street_name}, ${medic.postal_code} ${medic.city}`,
              phone_number: medic.phone_number,
              licence_code: medic.licence_code,
            };

            sentMedics.push(newMedic);
          }
          return res.status(200).json(sentMedics);
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching medics.' });
      }
    }
  },

  // Function to get one medic
  getOneMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);

    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const medic_id = parseInt(req.params.medic_id, 10);

        checkIsValidNumber(medic_id);

        const foundMedic = await Medic.findByPk(medic_id, {
          attributes: [
            'id',
            'name',
            'surname',
            'street_number',
            'street_name',
            'postal_code',
            'city',
            'prefix',
            'phone_number',
            'licence_code',
          ],
        });

        const fullPhoneNumber = foundMedic.prefix + foundMedic.phone_number;
        if (!foundMedic) {
          return res.status(404).json({ message: 'No medic found.' });
        } else {
          const sentMedic = {
            id: foundMedic.id,
            name: foundMedic.name,
            surname: foundMedic.surname,
            street_number: foundMedic.street_number,
            street_name: foundMedic.street_name,
            postal_code: foundMedic.postal_code,
            city: foundMedic.city,
            fullName: `${foundMedic.name} ${foundMedic.surname}`,
            address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
            phone_number: foundMedic.phone_number,
            prefix: foundMedic.prefix,
            full_phone_number: fullPhoneNumber,
            licence_code: foundMedic.licence_code,
          };

          return res.status(200).json(sentMedic);
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching medic.' });
      }
    }
  },

  // Function to create a medic
  createMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const medicSchema = Joi.object({
          name: Joi.string().required(),
          surname: Joi.string().required(),
          street_number: Joi.string().optional(),
          street_name: Joi.string().required(),
          postal_code: Joi.string().required(),
          city: Joi.string().required(),
          phone_number: Joi.string().required(),
          licence_code: Joi.string().required(),
          prefix: Joi.string().required(),
          full_phone_number: Joi.string().required(),
        });

        if (!req.body) {
          return res.status(400).json({
            message:
              'The request body cannot be empty. Please provide the necessary data.',
          });
        }

        const { error } = medicSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const newMedic = {
          admin_id,
          ...req.body,
        };

        const createdMedic = await Medic.create(newMedic);

        if (!createdMedic) {
          return res
            .status(500)
            .json({ message: 'Error while creating medic because fuck you.' });
        } else {
          return res
            .status(201)
            .json({ message: 'Medic created.', createdMedic });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Error creating medic because reasons.' });
      }
    }
  },

  // Function to update a medic
  updateMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const medic_id = parseInt(req.params.medic_id, 10);
        checkIsValidNumber(medic_id);

        const foundMedic = await Medic.findByPk(medic_id);

        if (!foundMedic) {
          return res.status(404).json({ message: 'Medic not found.' });
        }

        const {
          name,
          surname,
          street_number,
          street_name,
          postal_code,
          city,
          phone_number,
          licence_code,
          prefix,
        } = req.body;

        const fullPhoneNumber = prefix + phone_number;

        const newMedic = {
          admin_id: admin_id || foundMedic.admin_id,
          name: name === '' ? foundMedic.name : name,
          surname: surname === '' ? foundMedic.surname : surname,
          street_number:
            street_number === '' ? foundMedic.street_number : street_number,
          street_name:
            street_name === '' ? foundMedic.street_name : street_name,
          postal_code:
            postal_code === '' ? foundMedic.postal_code : postal_code,
          city: city === '' ? foundMedic.city : city,
          phone_number:
            phone_number === '' ? foundMedic.phone_number : phone_number,
          licence_code:
            licence_code === '' ? foundMedic.licence_code : licence_code,
          prefix: prefix === '' ? foundMedic.prefix : prefix,
          full_phone_number:
            fullPhoneNumber === ''
              ? foundMedic.full_phone_number
              : fullPhoneNumber,
        };

        const medicUpdateSchema = Joi.object({
          admin_id: Joi.number().required(),
          name: Joi.string().optional(),
          surname: Joi.string().optional(),
          street_number: Joi.string().optional(),
          street_name: Joi.string().optional(),
          postal_code: Joi.string().optional(),
          city: Joi.string().optional(),
          phone_number: Joi.string().optional(),
          licence_code: Joi.string().optional(),
          prefix: Joi.string().optional(),
          full_phone_number: Joi.string().optional(),
        }).min(1);

        if (!req.body) {
          return res.status(400).json({
            message:
              'The request body cannot be empty. Please provide the necessary data.',
          });
        }

        const { error } = medicUpdateSchema.validate(newMedic);

        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const updatedMedic = await foundMedic.update(newMedic);

        if (!updatedMedic) {
          return res
            .status(500)
            .json({ message: 'Error while updating medic.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Medic updated successfully.', updatedMedic });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error updating medic.' });
      }
    }
  },

  // Function to delete a medic
  deleteMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin ID is required.' });
    } else {
      try {
        const medic_id = parseInt(req.params.medic_id, 10);

        checkIsValidNumber(medic_id);

        const foundMedic = await Medic.findByPk(medic_id);

        if (!foundMedic) {
          return res.status(404).json({ message: 'Medic not found.' });
        } else {
          const deletedMedic = await foundMedic.destroy();

          if (!deletedMedic) {
            return res
              .status(500)
              .json({ message: 'Error while deleting medic.' });
          } else {
            return res
              .status(200)
              .json({ message: 'Medic deleted successfully.' });
          }
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting medic.' });
      }
    }
  },

  getMedicNamesAsPatient: async (req, res) => {
    const patient_id = parseInt(req.patient_id, 10);
    checkIsValidNumber(patient_id);
    if (!patient_id) {
      return res.status(400).json({ message: 'Patient ID is required.' });
    } else {
      try {
        const foundMedics = await Medic.findAll({
          attributes: ['id', 'name', 'surname'],
        });

        if (!foundMedics) {
          return res.status(404).json({ message: 'No medics found.' });
        } else {
          const sentMedics = [];

          for (const medic of foundMedics) {
            const newMedic = {
              id: medic.id,
              fullName: `${medic.name} ${medic.surname}`,
            };

            sentMedics.push(newMedic);
          }
          return res.status(200).json(sentMedics);
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching medics.' });
      }
    }
  },
};

export default medicController;
