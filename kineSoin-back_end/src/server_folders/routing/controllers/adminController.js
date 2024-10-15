import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import jsonwebtoken from 'jsonwebtoken';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { Patient, Appointment, Admin } from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const adminController = {
  loginAdmin: async (req, res) => {
    const loginSchema = Joi.object({
      email: Joi.string()
        .max(255)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
      password: Joi.required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({ where: { email } });

    if (!foundAdmin) {
      return res.status(401).json({
        message: `Invalid email or password. Please try again.`,
      });
    }

    const isPasswordValid = Scrypt.compare(password, foundAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    const jwtContent = { admin_id: foundAdmin.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      message: 'Admin logged in successfully.',
      id: foundAdmin.id,
      name: foundAdmin.name,
      token,
    });
  },
};

export default adminController;
