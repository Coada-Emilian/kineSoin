import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { Patient, Appointment, Therapist } from '../../models/associations.js';

multer({ storage: therapistPhotoStorage });

const therapistController = {
  getTherapistDashboardData: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsIdNumber(therapistId);

    const currentDate = new Date().toISOString().split('T')[0];

    const sameDayAppointments = await Appointment.findAll({
      attributes: ['id', 'date', 'time'],
      where: {
        therapist_id: therapistId,
        is_accepted: true,
        is_canceled: false,
        date: { [Op]: currentDate },
      },
      order: [['time', 'ASC']],
      include: [
        {
          association: 'patient',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
      ],
    });

    let therapist_id = 0;
    let therapist_fullName = '';
    let therapist_picture_url = '';

    if (sameDayAppointments.length > 0) {
      therapist_id = sameDayAppointments[0].therapist.id;
      therapist_fullName = `${sameDayAppointments[0].therapist.name} ${sameDayAppointments[0].therapist.surname}`;
      therapist_picture_url = sameDayAppointments[0].therapist.picture_url;
    }

    res.status(200).json({
      sameDayAppointments,
      therapist: {
        id: therapist_id,
        fullName: therapist_fullName,
        picture_url: therapist_picture_url,
      },
    });
  },

  getPersonalTherapist: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'therapist',
          where: { status: 'active' },
          attributes: [
            'id',
            'name',
            'surname',
            'description',
            'diploma',
            'experience',
            'specialty',
            'picture_url',
          ],
        },
      ],
    });

    checkPatientStatus(foundPatient);

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      if (!foundPatient.therapist) {
        return res.status(200).json({
          message: "Ce patient n'a pas de praticien!",
          therapist: null,
        });
      } else {
        const therapist = foundPatient.therapist;
        res.status(200).json({
          therapist: {
            id: therapist.id,
            fullName: `${therapist.name} ${therapist.surname}`,
            picture_url: therapist.picture_url,
            description: therapist.description,
            diploma: therapist.diploma,
            experience: therapist.experience,
            specialty: therapist.specialty,
          },
        });
      }
    }
  },

  getConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsIdNumber(therapistId);

    const foundTherapist = await Therapist.findByPk(therapistId, {
      where: { status: 'active' },
      attributes: [
        'id',
        'name',
        'surname',
        'picture_url',
        'description',
        'diploma',
        'experience',
        'specialty',
        'email',
      ],
    });

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    const sentTherapist = {
      id: foundTherapist.id,
      surname: foundTherapist.surname,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      description: foundTherapist.description,
      diploma: foundTherapist.diploma,
      experience: foundTherapist.experience,
      specialty: foundTherapist.specialty,
      email: foundTherapist.email,
    };

    res.status(200).json(sentTherapist);
  },

  deleteConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsIdNumber(therapistId);

    const response = await Therapist.destroy({ where: { id: therapistId } });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  },

  updateConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsIdNumber(therapistId);

    const updateTherapistSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
      email: Joi.string().email({ minDomainSegments: 2 }).optional(),
      new_password: Joi.string().min(12).max(255).optional(),
      repeated_password: Joi.string().valid(Joi.ref('new_password')).optional(),
      old_password: Joi.string()
        .when('new_password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .optional(),
      picture_url: Joi.string().max(255).optional(),
      picture_id: Joi.string().max(255).optional(),
      description: Joi.string().max(50).optional(),
      diploma: Joi.string().max(50).optional(),
      experience: Joi.string().max(50).optional(),
      specialty: Joi.string().max(50).optional(),
    }).min(1);

    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Please provide the data to update the therapist' });
    }

    const { error } = updateTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const foundTherapist = await Therapist.findByPk(therapistId, {
      where: { status: 'active' },
    });

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    const {
      name,
      surname,
      email,
      new_password,
      old_password,
      picture_url,
      picture_id,
      description,
      diploma,
      experience,
      specialty,
    } = req.body;

    const newProfile = {
      name: name || foundTherapist.name,
      surname: surname || foundTherapist.surname,
      email: email || foundTherapist.email,
      picture_url: picture_url || foundTherapist.picture_url,
      picture_id: picture_id || foundTherapist.picture_id,
      description: description || foundTherapist.description,
      diploma: diploma || foundTherapist.diploma,
      experience: experience || foundTherapist.experience,
      specialty: specialty || foundTherapist.specialty,
    };

    if (new_password) {
      if (!old_password) {
        return res.status(400).json({
          message: 'Old password is required to change the password.',
        });
      }

      const isOldPasswordValid = Scrypt.compare(
        old_password,
        foundUser.password
      );

      if (!isOldPasswordValid) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      if (new_password !== repeated_password) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }

      const hashedNewPassword = Scrypt.hash(new_password);

      newProfile.password = hashedNewPassword;
    }

    await foundTherapist.update(newProfile);

    return res
      .status(200)
      .json({ message: 'Therapist updated successfully!', foundTherapist });
  },

  uploadTherapistPhoto: async (req, res) => {
    const therapistId = parseInt(req.therapist_id, 10);

    checkIsIdNumber(therapistId);

    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected. Please upload a file to continue.',
      });
    }

    const foundTherapist = await Therapist.findByPk(therapistId);

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      if (foundTherapist.picture_id) {
        try {
          await cloudinary.uploader.destroy(foundTherapist.picture_id);
        } catch (err) {
          console.error(
            'Error deleting old picture from Cloudinary:',
            err.message
          );
        }
        const { filePath, filename } = req.file;

        foundTherapist.picture_id = filename;

        foundTherapist.picture_url = filePath;

        await foundTherapist.save();

        return res.status(200).json({
          message: 'Picture uploaded successfully!',
          picture_url: filePath,
        });
      }
    }
  },

  getAllTherapists: async (req, res) => {
    const foundTherapists = await Therapist.findAll({
      attributes: ['id', 'name', 'surname', 'status'],
    });

    if (!foundTherapists) {
      return res.status(400).json({ message: 'No therapists found' });
    }

    const allTherapists = [];

    for (const therapist of foundTherapists) {
      const newTherapist = {
        id: therapist.id,
        fullName: `${therapist.name} ${therapist.surname}`,
        status: therapist.status,
      };
      allTherapists.push(newTherapist);
    }

    return res.status(200).json(allTherapists);
  },

  getOneTherapist: async (req, res) => {
    const therapistId = parseInt(req.params.therapist_id, 10);

    checkIsIdNumber(therapistId);

    const foundTherapist = await Therapist.findByPk(therapistId, {
      attributes: [
        'id',
        'name',
        'surname',
        'description',
        'diploma',
        'experience',
        'specialty',
        'picture_url',
        'status',
      ],
    });

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    const sentTherapist = {
      id: foundTherapist.id,
      name: foundTherapist.name,
      surname: foundTherapist.surname,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      description: foundTherapist.description,
      diploma: foundTherapist.diploma,
      experience: foundTherapist.experience,
      specialty: foundTherapist.specialty,
      status: foundTherapist.status,
    };

    return res.status(200).json(sentTherapist);
  },

  updateTherapist: async (req, res) => {
    const therapistId = parseInt(req.params.therapist_id, 10);

    const updateTherapistSchema = Joi.object({
      status: Joi.string().valid('active', 'inactive').optional(),
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
      diploma: Joi.string().max(50).optional(),
      experience: Joi.string().max(50).optional(),
      specialty: Joi.string().max(50).optional(),
      description: Joi.string().max(50).optional(),
      picture_url: Joi.string().max(255).optional(),
    }).min(1);

    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Please provide the data to update the therapist' });
    }

    const { error } = updateTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    } else {
      const foundTherapist = await Therapist.findByPk(therapistId);
      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      }
      const {
        status,
        name,
        surname,
        diploma,
        experience,
        specialty,
        description,
        picture_url,
      } = req.body;

      const newProfile = {
        status: status || foundTherapist.status,
        name: name || foundTherapist.name,
        surname: surname || foundTherapist.surname,
        diploma: diploma || foundTherapist.diploma,
        experience: experience || foundTherapist.experience,
        specialty: specialty || foundTherapist.specialty,
        description: description || foundTherapist.description,
        picture_url: picture_url || foundTherapist.picture_url,
      };

      const response = await foundTherapist.update(newProfile);

      if (!response) {
        return res.status(400).json({ message: 'Therapist not updated' });
      } else {
        return res
          .status(200)
          .json({ message: 'Therapist updated successfully!' });
      }
    }
  },

  deleteTherapist: async (req, res) => {
    const therapistId = parseInt(req.params.therapist_id, 10);

    checkIsIdNumber(therapistId);

    const response = await Therapist.destroy({ where: { id: therapistId } });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  },

  createTherapist: async (req, res) => {
    const adminId = parseInt(req.admin_id, 10);

    checkIsIdNumber(adminId);

    const createTherapistSchema = Joi.object({
      name: Joi.string().max(50).required(),
      surname: Joi.string().max(50).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(12).max(255).required(),
      repeated_password: Joi.string().valid(Joi.ref('password')).required(),
      description: Joi.string().max(50).required(),
      diploma: Joi.string().max(50).required(),
      experience: Joi.string().max(50).required(),
      specialty: Joi.string().max(50).required(),
      licence_code: Joi.string().max(255).required(),
    });

    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Please provide the data to create the therapist' });
    }

    const { error } = createTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const {
      name,
      surname,
      email,
      password,
      repeated_password,
      description,
      diploma,
      experience,
      specialty,
      licence_code,
    } = req.body;

    const foundTherapist = await Therapist.findOne({ where: { email } });

    if (foundTherapist) {
      return res.status(400).json({ message: 'Therapist already exists' });
    }

    if (password !== repeated_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    } else {
      const hashedPassword = Scrypt.hash(password);

      if (!req.file) {
        return res.status(400).json({
          message: 'No file detected. Please upload a file to continue.',
        });
      } else {
        picture_url = req.file.path;
        picture_id = req.file.filename;

        const newTherapist = {
          admin_id: adminId,
          name,
          surname,
          email,
          password: hashedPassword,
          picture_url,
          picture_id,
          description,
          diploma,
          experience,
          specialty,
          licence_code,
        };

        const createdTherapist = await Therapist.create(newTherapist);

        if (!createdTherapist) {
          return res
            .status(400)
            .json({ message: 'The therapist was not created' });
        }

        return res.status(200).json({
          message: 'Therapist created successfully!',
          createdTherapist: {
            id: createdTherapist.id,
            fullName: `${createdTherapist.name} ${createdTherapist.surname}`,
            picture_url: createdTherapist.picture_url,
            description: createdTherapist.description,
            diploma: createdTherapist.diploma,
            experience: createdTherapist.experience,
            specialty: createdTherapist.specialty,
            licence_code: createdTherapist.licence_code,
          },
        });
      }
    }
  },
};

export default therapistController;
