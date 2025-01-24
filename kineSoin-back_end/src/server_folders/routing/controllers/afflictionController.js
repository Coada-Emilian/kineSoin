//  Purpose: Define the routes for the admin user.

import Joi from 'joi';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Affliction, Body_region } from '../../models/associations.js';

const afflictionController = {
  // Get all afflictions
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

  // Create a new affliction
  createAffliction: async (req, res) => {
    const admin_id = req.session.admin_id;

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

  // Get one affliction
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

  // Update an affliction
  updateAffliction: async (req, res) => {
    const adminId = parseInt(req.session.admin_id, 10);
    checkIsIdNumber(adminId);

    const affliction_id = parseInt(req.params.affliction_id, 10);
    checkIsIdNumber(affliction_id);

    const foundAffliction = await Affliction.findByPk(affliction_id);

    if (!foundAffliction) {
      console.error('Affliction not found');
      return res.status(404).json({ message: 'Affliction not found.' });
    }

    const { body_region_id, name, description, insurance_code, is_operated } =
      req.body;

    const newAffliction = {
      ...(body_region_id
        ? { body_region_id: parseInt(body_region_id, 10) }
        : {}),
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(insurance_code ? { insurance_code } : {}),
      ...(is_operated === 'true' || is_operated === 'false'
        ? { is_operated: is_operated === 'true' }
        : {}),
    };

    if (Object.keys(newAffliction).length > 5) {
      newAffliction.admin_id = foundAffliction.admin_id;
    }

    // Validate newAffliction object using Joi
    const updatedAfflictionSchema = Joi.object({
      body_region_id: Joi.number().integer().optional(),
      name: Joi.string().max(50).optional(),
      description: Joi.string().optional(),
      insurance_code: Joi.string().max(255).optional(),
      is_operated: Joi.boolean().optional(),
    }).min(1);

    if (!Object.keys(newAffliction).length) {
      console.error('Request body is empty or invalid');
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const { error } = updatedAfflictionSchema.validate(newAffliction);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Perform the update
    const updatedAffliction = await foundAffliction.update(newAffliction);

    if (!updatedAffliction) {
      console.error('Error while updating affliction');
      return res
        .status(500)
        .json({ message: 'Error while updating affliction.' });
    } else {
      console.log('Affliction updated successfully');
      return res.status(200).json({
        message: 'Affliction updated successfully',
      });
    }
  },

  // Delete an affliction
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

  // Get all body regions
  getAllBodyRegions: async (req, res) => {
    const foundBodyRegions = await Body_region.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });

    if (!foundBodyRegions) {
      return res.status(404).json({ message: 'No body regions found.' });
    } else {
      return res.status(200).json(foundBodyRegions);
    }
  },

  // Create a new body region
  createBodyRegion: async (req, res) => {
    const admin_id = req.session.admin_id;

    checkIsIdNumber(admin_id);

    const newBodyRegionSchema = Joi.object({
      name: Joi.string().max(50).required(),
    });

    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const { error } = newBodyRegionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const { name } = req.body;

      const newBodyRegion = await Body_region.create({
        admin_id,
        name,
      });

      if (!newBodyRegion) {
        return res
          .status(500)
          .json({ message: 'Error while creating body region.' });
      } else {
        return res.status(201).json(newBodyRegion);
      }
    }
  },

  // Get one body region
  deleteBodyRegion: async (req, res) => {
    const body_region_id = parseInt(req.params.body_region_id, 10);

    checkIsIdNumber(body_region_id);

    const foundBodyRegion = await Body_region.findByPk(body_region_id);

    if (!foundBodyRegion) {
      return res.status(404).json({ message: 'Body region not found.' });
    } else {
      const deletedBodyRegion = await foundBodyRegion.destroy();

      if (!deletedBodyRegion) {
        return res
          .status(500)
          .json({ message: 'Error while deleting body region.' });
      } else {
        return res
          .status(200)
          .json({ message: 'Body region deleted successfully.' });
      }
    }
  },
};

export default afflictionController;
