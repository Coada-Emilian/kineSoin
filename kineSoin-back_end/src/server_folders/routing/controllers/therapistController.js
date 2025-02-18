import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { Patient, Appointment, Therapist } from '../../models/associations.js';

multer({ storage: therapistPhotoStorage });

const therapistController = {
  // Function to get a patient's personal therapist
  getPersonalTherapist: async (req, res) => {
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
              association: 'therapist',
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
                surname: therapist.surname,
                name: therapist.name,
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
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to get all therapists
  getAllTherapists: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);

    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const foundTherapists = await Therapist.findAll({
          attributes: ['id', 'name', 'surname', 'status'],
          order: [
            ['status', 'ASC'],
            ['name', 'ASC'],
          ],
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
      } catch (err) {
        console.error('Error fetching therapists:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to get one therapist
  getOneTherapist: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const therapistId = parseInt(req.params.therapist_id, 10);
        checkIsValidNumber(therapistId);

        const foundTherapist = await Therapist.findByPk(therapistId, {
          attributes: [
            'id',
            'name',
            'surname',
            'email',
            'description',
            'diploma',
            'experience',
            'specialty',
            'phone_number',
            'picture_url',
            'status',
            'licence_code',
            'prefix',
            'full_phone_number',
            'phone_number',
          ],
        });

        if (!foundTherapist) {
          return res.status(400).json({ message: 'Therapist not found' });
        }

        const fullPhoneNumber = `${foundTherapist.prefix}${foundTherapist.phone_number}`;
        const sentTherapist = {
          id: foundTherapist.id,
          name: foundTherapist.name,
          surname: foundTherapist.surname,
          fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
          email: foundTherapist.email,
          picture_url: foundTherapist.picture_url,
          description: foundTherapist.description,
          diploma: foundTherapist.diploma,
          experience: foundTherapist.experience,
          specialty: foundTherapist.specialty,
          phone_number: foundTherapist.phone_number,
          status: foundTherapist.status,
          licence_code: foundTherapist.licence_code,
          prefix: foundTherapist.prefix,
          full_phone_number: fullPhoneNumber,
          phone_number: foundTherapist.phone_number,
        };

        return res.status(200).json(sentTherapist);
      } catch (err) {
        console.error('Error fetching therapist:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to update a therapist by
  updateTherapist: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const therapistId = parseInt(req.params.therapist_id, 10);
        checkIsValidNumber(therapistId);

        const updateTherapistSchema = Joi.object({
          status: Joi.string().valid('active', 'inactive').optional(),
          name: Joi.string().max(50).allow('').optional(),
          surname: Joi.string().max(50).allow('').optional(),
          diploma: Joi.string().max(50).allow('').optional(),
          experience: Joi.string().max(50).allow('').optional(),
          specialty: Joi.string().max(50).allow('').optional(),
          phone_number: Joi.string().max(15).allow('').optional(),
          description: Joi.string().allow('').optional(),
          licence_code: Joi.string().max(9).allow('').optional(),
          prefix: Joi.string().max(10).allow('').optional(),
        }).min(1);

        if (!req.body) {
          return res.status(400).json({
            message: 'Please provide the data to update the therapist',
          });
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
            phone_number,
            description,
            licence_code,
            prefix,
          } = req.body;

          const fullPhoneNumber = `${prefix}${phone_number}`;
          const newProfile = {
            status: status || foundTherapist.status,
            name: name || foundTherapist.name,
            surname: surname || foundTherapist.surname,
            diploma: diploma || foundTherapist.diploma,
            experience: experience || foundTherapist.experience,
            specialty: specialty || foundTherapist.specialty,
            phone_number: phone_number || foundTherapist.phone_number,
            description: description || foundTherapist.description,
            licence_code: licence_code || foundTherapist.licence_code,
            prefix: prefix || foundTherapist.prefix,
            full_phone_number: fullPhoneNumber,
          };

          if (req.file) {
            if (foundTherapist.picture_id) {
              try {
                await cloudinary.uploader.destroy(foundTherapist.picture_id);
              } catch (err) {
                console.error(
                  'Error deleting old picture from Cloudinary:',
                  err.message
                );
              }
            }
            const { path, filename } = req.file;

            newProfile.picture_id = filename;

            newProfile.picture_url = path;
          }
          const response = await foundTherapist.update(newProfile);

          if (!response) {
            return res.status(400).json({ message: 'Therapist not updated' });
          } else {
            return res
              .status(200)
              .json({ message: 'Therapist updated successfully!' });
          }
        }
      } catch (err) {
        console.error('Error updating therapist:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to delete a therapist
  deleteTherapist: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const therapistId = parseInt(req.params.therapist_id, 10);

        checkIsValidNumber(therapistId);

        const response = await Therapist.destroy({
          where: { id: therapistId },
        });

        if (!response) {
          return res.status(400).json({ message: 'Therapist not found' });
        } else {
          return res
            .status(200)
            .json({ message: 'Therapist deleted successfully!' });
        }
      } catch (err) {
        console.error('Error deleting therapist:', err);
      }
    }
  },

  // Function to create a therapist
  createTherapist: async (req, res) => {
    const adminId = parseInt(req.admin_id, 10);

    checkIsValidNumber(adminId);

    if (!adminId) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
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
          prefix: Joi.string().max(10).required(),
          phone_number: Joi.string().max(15).required(),
          full_phone_number: Joi.string().max(15).optional(),
          licence_code: Joi.string().max(25).required(),
          status: Joi.string().valid('active', 'inactive').optional(),
        });

        if (!req.body) {
          return res.status(400).json({
            message: 'Please provide the data to create the therapist',
          });
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
          prefix,
          phone_number,
          licence_code,
          status,
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
            const picture_url = req.file.path;
            const picture_id = req.file.filename;

            const fullPhoneNumber = `${prefix}${phone_number}`;

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
              prefix,
              phone_number,
              full_phone_number: fullPhoneNumber,
              licence_code,
              status: status || 'active',
            };

            const createdTherapist = await Therapist.create(newTherapist);

            if (!createdTherapist) {
              try {
                await cloudinary.uploader.destroy(picture_id);
              } catch (err) {
                console.error(
                  'Error deleting old picture from Cloudinary:',
                  err.message
                );
              }
              return res
                .status(400)
                .json({ message: 'The therapist was not created' });
            } else {
              return res.status(201).json({
                message: 'Therapist created successfully!',
              });
            }
          }
        }
      } catch (err) {
        console.error('Error creating therapist:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to toggle therapist status
  toggleTherapistStatus: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const therapistId = parseInt(req.params.therapist_id, 10);
        checkIsValidNumber(therapistId);

        const foundTherapist = await Therapist.findByPk(therapistId);
        if (!foundTherapist) {
          return res.status(400).json({ message: 'Therapist not found' });
        }

        const newStatus =
          foundTherapist.status === 'active' ? 'inactive' : 'active';

        foundTherapist.status = newStatus;

        await foundTherapist.save();

        return res
          .status(200)
          .json({ message: 'Therapist status updated successfully!' });
      } catch (error) {
        console.error('Error toggling therapist status:', error);
      }
    }
  },

  // Get therapist dashboard data
  getTherapistDashboardData: async (req, res) => {
    try {
      const therapistId = parseInt(req.therapist_id, 10);

      if (!checkIsValidNumber(therapistId)) {
        return res.status(400).json({ message: 'Invalid therapist ID' });
      }

      const currentDate = new Date().toISOString().split('T')[0];

      const sameDayAppointments = await Appointment.findAll({
        attributes: ['id', 'date', 'time'],
        where: {
          therapist_id: therapistId,
          is_accepted: true,
          is_canceled: false,
          date: currentDate,
        },
        order: [['time', 'ASC']],
        include: [
          {
            association: 'patient',
            attributes: ['id', 'name', 'surname', 'picture_url'],
            include: [
              {
                association: 'prescription',
                attributes: ['id', 'date'],
                where: { is_completed: false },
                include: [
                  {
                    association: 'affliction',
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
          {
            association: 'therapist',
            attributes: ['id', 'name', 'surname', 'picture_url'],
          },
        ],
      });

      if (sameDayAppointments.length > 0) {
        return res.status(200).json({ sameDayAppointments });
      } else {
        return res.status(200).json({ message: 'No appointments today' });
      }
    } catch (error) {
      console.error('Error fetching therapist dashboard data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get therapist's data
  getConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsValidNumber(therapistId);

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

  // Delete therapist
  deleteConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsValidNumber(therapistId);

    const response = await Therapist.destroy({ where: { id: therapistId } });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  },

  // Update therapist's data
  updateConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);

    const therapistId = 1;

    checkIsValidNumber(therapistId);

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

  // Upload therapist's photo
  uploadTherapistPhoto: async (req, res) => {
    const therapistId = parseInt(req.therapist_id, 10);

    checkIsValidNumber(therapistId);

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
};

export default therapistController;
