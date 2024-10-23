//  Purpose: Define the routes for the admin user.

import Joi from 'joi';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Affliction, Body_region } from '../../models/associations.js';

const afflictionController = {
  getAllAfflictions: async (req, res) => {
    const foundAfflictions = await Affliction.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'insurance_code',
        'is_operated',
        'body_region_id',
      ],
      order: [
        ['body_region_id', 'ASC'],
        ['name', 'ASC'],
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!foundAfflictions) {
      return res.status(404).json({ message: 'No afflictions found.' });
    } else {
      return res.status(200).json(foundAfflictions);
    }
  },

  createAffliction: async (req, res) => {
    const admin_id = parseInt(req.admin.id, 10);

    checkIsIdNumber(admin_id);

    const newAfflictionSchema = Joi.object({
      body_region_id: Joi.number().integer().required(),
      name: Joi.string().max(50).required(),
      description: Joi.string().required(),
      insurance_code: Joi.string().max(255).required(),
      is_operated: Joi.boolean().required(),
    });

    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const { error } = newAfflictionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const { body_region_id, name, description, insurance_code, is_operated } =
        req.body;

      const newAffliction = await Affliction.create({
        admin_id,
        body_region_id,
        name,
        description,
        insurance_code,
        is_operated,
      });

      if (!newAffliction) {
        return res
          .status(500)
          .json({ message: 'Error while creating affliction.' });
      } else {
        return res.status(201).json(newAffliction);
      }
    }
  },

  getOneAffliction: async (req, res) => {
    const affliction_id = parseInt(req.params.affliction_id, 10);

    checkIsIdNumber(affliction_id);

    const foundAffliction = await Affliction.findByPk(affliction_id, {
      attributes: [
        'id',
        'name',
        'description',
        'insurance_code',
        'is_operated',
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!foundAffliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    } else {
      return res.status(200).json(foundAffliction);
    }
  },

  updateAffliction: async (req, res) => {
    const admin_id = parseInt(req.admin.id, 10);

    checkIsIdNumber(admin_id);

    const affliction_id = parseInt(req.params.affliction_id, 10);

    checkIsIdNumber(affliction_id);

    const updatedAfflictionSchema = Joi.object({
      body_region_id: Joi.number().integer().optional(),
      name: Joi.string().max(50).optional(),
      description: Joi.string().optional(),
      insurance_code: Joi.string().max(255).optional(),
      is_operated: Joi.boolean().optional(),
    }).min(1);

    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const { error } = updatedAfflictionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const { body_region_id, name, description, insurance_code, is_operated } =
        req.body;

      const foundAffliction = await Affliction.findByPk(affliction_id);

      if (!foundAffliction) {
        return res.status(404).json({ message: 'Affliction not found.' });
      } else {
        const newAffliction = {
          body_region_id: body_region_id || foundAffliction.body_region_id,
          name: name || foundAffliction.name,
          description: description || foundAffliction.description,
          insurance_code: insurance_code || foundAffliction.insurance_code,
          is_operated: is_operated || foundAffliction.is_operated,
        };

        const updatedAffliction = await foundAffliction.update(newAffliction);

        if (!updatedAffliction) {
          return res
            .status(500)
            .json({ message: 'Error while updating affliction.' });
        } else {
          return res.status(200).json({
            message: 'Affliction updated successfully',
            updatedAffliction,
          });
        }
      }
    }
  },

  deleteAffliction: async (req, res) => {
    const afflictionId = parseInt(req.params.affliction_id, 10);

    checkIsIdNumber(afflictionId);

    const foundAffliction = await Affliction.findByPk(afflictionId);

    if (!foundAffliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    } else {
      const deletedAffliction = await foundAffliction.destroy();

      if (!deletedAffliction) {
        return res
          .status(500)
          .json({ message: 'Error while deleting affliction.' });
      } else {
        return res
          .status(200)
          .json({ message: 'Affliction deleted successfully.' });
      }
    }
  },

  getAllBodyRegions: async (req, res) => {
    const foundBodyRegions = await Body_region.findAll({
      attributes: ['id', 'name'],
    });

    if (!foundBodyRegions) {
      return res.status(404).json({ message: 'No body regions found.' });
    } else {
      return res.status(200).json(foundBodyRegions);
    }
  },
};

export default afflictionController;
