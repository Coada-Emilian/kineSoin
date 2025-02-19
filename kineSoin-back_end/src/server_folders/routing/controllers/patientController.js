// Purpose: Define the patient controller, which contains the functions that are used to handle the patient routes.

import Joi from 'joi';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Op } from 'sequelize';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { Patient } from '../../models/associations.js';

multer({ storage: patientPhotoStorage });

const patientController = {
  // Function to get all patients
  getAllPatients: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);

    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const foundPatients = await Patient.findAll({
          attributes: [
            'id',
            'name',
            'surname',
            'status',
            'birth_date',
            'phone_number',
            'city',
            'street_name',
            'street_number',
            'postal_code',
          ],
          order: [
            ['status', 'ASC'],
            ['name', 'ASC'],
          ],

          include: [
            {
              association: 'therapist',
              attributes: ['id', 'name', 'surname'],
            },
          ],
        });

        if (!foundPatients) {
          return res.status(400).json({ message: 'No patients found' });
        }

        const sentPatients = [];

        for (const patient of foundPatients) {
          const newPatient = {
            id: patient.id,
            status: patient.status,
            fullName: `${patient.name} ${patient.surname}`,
            age: computeAge(patient.birth_date),
            address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
            phone_number: patient.phone_number,
            therapist: patient.therapist
              ? `${patient.therapist.name} ${patient.therapist.surname}`
              : null,
          };
          sentPatients.push(newPatient);
        }

        return res.status(200).json(sentPatients);
      } catch (error) {
        return res
          .status(500)
          .json('Error getting patients :', { message: error.message });
      }
    }
  },

  // Function to get one patient
  getOnePatient: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const patientId = parseInt(req.params.patient_id, 10);

        checkIsValidNumber(patientId);

        const foundPatient = await Patient.findByPk(patientId, {
          attributes: {
            exclude: [
              'password',
              'old_password',
              'new_password',
              'repeated_password',
              'created_at',
              'updated_at',
              'picture_id',
            ],
          },
          include: [
            {
              association: 'prescriptions',
              attributes: [
                'id',
                'appointment_quantity',
                'is_completed',
                'at_home_care',
                'date',
              ],
              include: [
                {
                  association: 'medic',
                  attributes: ['id', 'name', 'surname'],
                },
                {
                  association: 'affliction',
                  attributes: ['id', 'name', 'description'],
                },
                {
                  association: 'appointments',
                  attributes: ['id', 'is_canceled', 'date', 'time'],
                },
              ],
            },
            { association: 'therapist' },
          ],
        });

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date()
          .toISOString()
          .split('T')[1]
          .split('.')[0];

        const newPrescriptions =
          foundPatient.prescriptions?.map((prescription) => {
            const pastAppointments = [];
            const upcomingAppointments = [];

            prescription.appointments?.forEach((appointment) => {
              if (
                appointment.date < currentDate ||
                (appointment.date === currentDate &&
                  appointment.time < currentTime)
              ) {
                pastAppointments.push(appointment);
              } else {
                upcomingAppointments.push(appointment);
              }
            });

            return {
              id: prescription.id,
              appointment_quantity: prescription.appointment_quantity,
              is_completed: prescription.is_completed,
              at_home_care: prescription.at_home_care,
              date: prescription.date,
              past_appointments: pastAppointments,
              upcoming_appointments: upcomingAppointments,
            };
          }) || []; // Default to an empty array if no prescriptions

        const fullPhoneNumber = foundPatient.prefix + foundPatient.phone_number;
        const sentPatient = {
          id: foundPatient.id,
          fullName: `${foundPatient.name} ${foundPatient.surname}`,
          age: computeAge(foundPatient.birth_date),
          gender: foundPatient.gender,
          address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
          full_phone_number: fullPhoneNumber,
          therapist: foundPatient.therapist
            ? `${foundPatient.therapist.name} ${foundPatient.therapist.surname}`
            : null,
          status: foundPatient.status,
          picture_url: foundPatient.picture_url,
          prescriptions: newPrescriptions,
          medic: foundPatient.prescriptions?.[0]?.medic || null,
          email: foundPatient.email,
        };

        return res.status(200).json(sentPatient);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  // Function to toggle the patient's status
  togglePatientStatus: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const patientId = parseInt(req.params.patient_id, 10);

        checkIsValidNumber(patientId);

        const updatePatientStatusSchema = Joi.object({
          status: Joi.string().valid('active', 'pending', 'banned', 'inactive'),
        });

        if (!req.body) {
          return res.status(400).json({
            message:
              'Request body is missing. Please provide the necessary data.',
          });
        }

        const { error } = updatePatientStatusSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const { status } = req.body;

        const foundPatient = await Patient.findByPk(patientId);

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          await foundPatient.update({ status });

          return res.status(200).json({
            message: 'Patient status updated successfully!',
          });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  // Function to delete a patient
  deletePatient: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsValidNumber(admin_id);
    if (!admin_id) {
      return res.status(400).json({ message: 'Admin not found' });
    } else {
      try {
        const patientId = parseInt(req.params.patient_id, 10);

        checkIsValidNumber(patientId);

        const response = await Patient.destroy({ where: { id: patientId } });

        if (!response) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          return res
            .status(200)
            .json({ message: 'Patient deleted successfully!' });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  // Function to get the connected patient's data
  getConnectedPatientData: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundPatient = await Patient.findByPk(patientId, {
          attributes: {
            exclude: [
              'password',
              'created_at',
              'updated_at',
              'picture_id',
              'birth_name',
            ],
          },
          include: [
            {
              association: 'prescriptions',
              where: { is_completed: false },
              required: false,
              attributes: [
                'id',
                'appointment_quantity',
                'at_home_care',
                'date',
                'picture_url',
              ],
              include: [
                {
                  association: 'appointments',
                  where: {
                    [Op.and]: [{ is_canceled: false }, { is_accepted: true }],
                  },
                  required: false,
                  attributes: ['id', 'date', 'time'],
                },
                { association: 'medic', attributes: ['name', 'surname'] },
                {
                  association: 'affliction',
                  attributes: ['name', 'description'],
                },
              ],
            },
            {
              association: 'insurance',
              required: false,
              attributes: [
                'id',
                'name',
                'amc_code',
                'street_number',
                'street_name',
                'postal_code',
                'city',

                'full_phone_number',
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

        checkPatientStatus(foundPatient);

        const address = `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`;
        const fullName = `${foundPatient.name} ${foundPatient.surname}`;

        const sentPatientData = {
          fullName,
          surname: foundPatient.surname,
          name: foundPatient.name,
          birth_date: foundPatient.birth_date,
          picture_url: foundPatient.picture_url,
          picture_id: foundPatient.picture_id,
          street_number: foundPatient.street_number,
          street_name: foundPatient.street_name,
          postal_code: foundPatient.postal_code,
          city: foundPatient.city,
          prefix: foundPatient.prefix,
          phone_number: foundPatient.phone_number,
          full_phone_number: foundPatient.prefix + foundPatient.phone_number,
          address,
          age: computeAge(foundPatient.birth_date),
          gender: foundPatient.gender,
          email: foundPatient.email,
          insurance: foundPatient.insurance,
          prescriptions: foundPatient.prescriptions,
        };

        res.status(200).json(sentPatientData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to upload a patient photo
  uploadPatientPhoto: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        if (!req.file) {
          return res.status(400).json({
            message: 'No file detected. Please upload a file to continue.',
          });
        }

        const { path, filename } = req.file;

        const foundPatient = await Patient.findByPk(patientId);

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          if (foundPatient.picture_id) {
            try {
              await cloudinary.uploader.destroy(foundPatient.picture_id);
            } catch (err) {
              console.error(
                'Error deleting old picture from Cloudinary:',
                err.message
              );
            }
          }

          foundPatient.picture_id = filename;

          foundPatient.picture_url = path;

          const response = await foundPatient.save();

          if (!response) {
            return res
              .status(400)
              .json({ message: 'Error saving the picture' });
          } else {
            return res.status(200).json({
              message: 'Picture uploaded successfully!',
              picture_url: foundPatient.picture_url,
            });
          }
        }
      } catch (error) {
        console.error('Error uploading patient photo:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Get the patient's dashboard data
  getPatientDashboardData: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
          'birth_name',
        ],
      },
      include: [
        {
          association: 'prescriptions',
          where: { is_completed: false },
          required: false,
          attributes: [
            'id',
            'appointment_quantity',
            'at_home_care',
            'date',
            'picture_url',
          ],
          include: [
            {
              association: 'appointments',
              where: {
                [Op.and]: [{ is_canceled: false }, { is_accepted: true }],
              },
              required: false,
              attributes: ['id', 'date', 'time'],
            },
            { association: 'medic', attributes: ['name', 'surname'] },
            { association: 'affliction', attributes: ['name', 'description'] },
          ],
        },
      ],
    });

    checkPatientStatus(foundPatient);

    const modifiedPrescriptions = [];

    for (const prescription of foundPatient.prescriptions) {
      const past_appointments = [];
      const upcoming_appointments = [];

      for (const appointment of prescription.appointments) {
        if (appointment.date < currentDate && appointment.time < currentTime) {
          past_appointments.push(appointment);
        } else {
          upcoming_appointments.push(appointment);
        }
      }

      const modifiedPrescription = {
        id: prescription.id,
        appointment_quantity: prescription.appointment_quantity,
        at_home_care: prescription.at_home_care,
        date: prescription.date,
        picture_url: prescription.picture_url,
        past_appointments,
        upcoming_appointments,
      };

      modifiedPrescriptions.push(modifiedPrescription);
    }

    const sentPatientData = {
      fullName: `${foundPatient.name} ${foundPatient.surname}`,
      surname: foundPatient.surname,
      address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
      age: computeAge(foundPatient.birth_date),
      gender: foundPatient.gender,
      insurance: foundPatient.insurance,
      prescriptions: modifiedPrescriptions,
    };

    res.status(200).json(sentPatientData);
  },

  // Delete the patient's account
  deleteConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 82;

    checkIsValidNumber(patientId);

    const response = await Patient.destroy({ where: { id: patientId } });

    if (!response) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      return res.status(200).json({ message: 'Patient deleted successfully!' });
    }
  },

  // Update the patient's profile
  updateConnectedPatient: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    const updatePatientSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
      birth_date: Joi.date().optional(),
      gender: Joi.string().max(10).valid('male', 'female', 'other').optional(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().max(50).optional(),
      postal_code: Joi.string().max(10).optional(),
      city: Joi.string().max(100).optional(),
      prefix: Joi.string().max(10).optional(),
      phone_number: Joi.string().max(15).optional(),
      email: Joi.string().email({ minDomainSegments: 2 }).optional(),
      new_password: Joi.string().min(12).max(255).optional(),
      picture_url: Joi.string().max(255).optional(),
      picture_id: Joi.string().max(255).optional(),
    }).min(0);

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }

    const { error } = updatePatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const {
      name,
      surname,
      birth_date,
      gender,
      street_number,
      street_name,
      postal_code,
      city,
      prefix,
      phone_number,
      email,
      new_password,
      picture_url,
      picture_id,
    } = req.body;

    const foundPatient = await Patient.findByPk(patientId);

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      checkPatientStatus(foundPatient);

      const newProfile = {
        name: name || foundPatient.name,
        surname: surname || foundPatient.surname,
        birth_date: birth_date || foundPatient.birth_date,
        gender: gender || foundPatient.gender,
        street_number: street_number || foundPatient.street_number,
        street_name: street_name || foundPatient.street_name,
        postal_code: postal_code || foundPatient.postal_code,
        city: city || foundPatient.city,
        prefix: prefix || foundPatient.prefix,
        phone_number: phone_number || foundPatient.phone_number,
        full_phone_number: prefix + phone_number,
        email: email || foundPatient.email,
        picture_url: picture_url || foundPatient.picture_url,
        picture_id: picture_id || foundPatient.picture_id,
      };

      if (new_password) {
        const hashedNewPassword = Scrypt.hash(new_password);

        newProfile.password = hashedNewPassword;
      }

      await foundPatient.update(newProfile);

      return res.status(200).json({
        message: 'Profile updated successfully!',
        foundPatient: {
          id: foundPatient.id,
          name: foundPatient.name,
          surname: foundPatient.surname,
          gender: foundPatient.gender,
          address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
          email: foundPatient.email,
          picture_url: foundPatient.picture_url,
          age: computeAge(foundPatient.birth_date),
        },
      });
    }
  },

  // Get all the therapist's patients
  getAllMyPatients: async (req, res) => {
    const therapist_id = parseInt(req.therapist_id, 10);
    checkIsValidNumber(therapist_id);

    try {
      const foundPatients = await Patient.findAll({
        where: { therapist_id: therapistId },
        order: [['status', 'ASC']],
        attributes: ['id', 'name', 'surname', 'status'],
      });

      if (!foundPatients) {
        return res.status(400).json({ message: 'No patients found' });
      } else {
        const sentPatients = [];

        for (const patient of foundPatients) {
          const newPatient = {
            id: patient.id,
            status: patient.status,
            fullName: `${patient.name} ${patient.surname}`,
          };
          sentPatients.push(newPatient);
        }
        if (sentPatients.length === 0) {
          return res.status(400).json({ message: 'No patients found' });
        } else {
          return res.status(200).json(sentPatients);
        }
      }
    } catch (error) {
      console.error('Error retrieving patients:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default patientController;
