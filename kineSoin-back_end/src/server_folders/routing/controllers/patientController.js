import Joi from 'joi';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Op } from 'sequelize';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { Patient } from '../../models/associations.js';

multer({ storage: patientPhotoStorage });

const patientController = {
  getConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

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

    checkPatientStatus(foundPatient);

    const address = `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`;
    const fullName = `${foundPatient.name} ${foundPatient.surname}`;

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

    const { picture_url } = foundPatient;

    const sentPatientData = {
      fullName,
      surname: foundPatient.surname,
      picture_url,
      address,
      age: computeAge(foundPatient.birth_date),
      gender: foundPatient.gender,
      insurance: foundPatient.insurance,
      prescriptions: modifiedPrescriptions,
    };

    res.status(200).json(sentPatientData);
  },

  deleteConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 82;

    checkIsIdNumber(patientId);

    const response = await Patient.destroy({ where: { id: patientId } });

    if (!response) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      return res.status(200).json({ message: 'Patient deleted successfully!' });
    }
  },

  updateConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const updatePatientSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
      birth_date: Joi.date().optional(),
      gender: Joi.string().max(10).valid('male', 'female', 'other').optional(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().max(50).optional(),
      postal_code: Joi.string().max(10).optional(),
      city: Joi.string().max(100).optional(),
      phone_number: Joi.string().max(15).optional(),
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
    }).min(1);

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
      phone_number,
      email,
      old_password,
      new_password,
      repeated_password,
      picture_url,
      picture_id,
    } = req.body;

    const newProfile = {
      name: name || foundPatient.name,
      surname: surname || foundPatient.surname,
      birth_date: birth_date || foundPatient.birth_date,
      gender: gender || foundPatient.gender,
      street_number: street_number || foundPatient.street_number,
      street_name: street_name || foundPatient.street_name,
      postal_code: postal_code || foundPatient.postal_code,
      city: city || foundPatient.city,
      phone_number: phone_number || foundPatient.phone_number,
      email: email || foundPatient.email,
      picture_url: picture_url || foundPatient.picture_url,
      picture_id: picture_id || foundPatient.picture_id,
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

      // Hash the new password
      const hashedNewPassword = Scrypt.hash(new_password);
      // Update the new profile object with the new password
      newProfile.password = hashedNewPassword;
    }

    const foundPatient = await Patient.findByPk(patientId);

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      checkPatientStatus(foundPatient);

      await foundPatient.update(newProfile);

      return res.status(200).json({
        message: 'Profile updated successfully!',
        foundPatient: {
          id: foundPatient.id,
          name: foundPatient.name,
          surname: foundPatient.surname,
          birth_date: foundPatient.birth_date,
          gender: foundPatient.gender,
          street_number: foundPatient.street_number,
          street_name: foundPatient.street_name,
          postal_code: foundPatient.postal_code,
          city: foundPatient.city,
          email: foundPatient.email,
          picture_url: foundPatient.picture_url,
          age: computeAge(foundPatient.birth_date),
        },
      });
    }
  },

  uploadPatientPhoto: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsIdNumber(patientId);

    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected. Please upload a file to continue.',
      });
    }

    const { filePath, filename } = req.file;

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

        foundPatient.picture_id = filename;

        foundPatient.picture_url = filePath;

        const response = await foundPatient.save();

        if (!response) {
          return res.status(400).json({ message: 'Error saving the picture' });
        } else {
          return res.status(200).json({
            message: 'Picture uploaded successfully!',
            picture_url: foundPatient.picture_url,
          });
        }
      }
    }
  },
  
  getPendingPatients: async (req, res) => {
    const pendingPatients = await Patient.findAll({
      where: {
        status: 'pending',
      },
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
          'gender',
          'street_number',
          'street_name',
          'postal_code',
          'city',
          'phone_number',
          'email',
          'picture_url',
        ],
      },
    });

    if (!pendingPatients) {
      return res.status(400).json({ message: 'No pending patients found' });
    }
    const sentPatients = [];
    for (const patient of pendingPatients) {
      const newPatient = {
        id: patient.id,
        status: patient.status,
        fullName: `${patient.name} ${patient.surname}`,
        age: computeAge(patient.birth_date),
      };
      sentPatients.push(newPatient);
    }
    return res.status(200).json(sentPatients);
  },
  getAllMyPatients: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);
    const therapistId = 1;
    checkIsIdNumber(therapistId);

    const foundPatients = await Patient.findAll({
      where: { therapist_id: therapistId },
      attributes: ['id', 'name', 'surname', 'status', 'birth_date'],
    });

    if (!foundPatients) {
      return res.status(400).json({ message: 'No patients found' });
    }

    const sentPatients = [];

    for (const patient of foundPatients) {
      if (
        !(
          patient.status === 'pending' ||
          patient.status === 'banished' ||
          patient.status === 'inactive'
        )
      ) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
        };
        sentPatients.push(newPatient);
      }
    }

    return res.status(200).json(sentPatients);
  },
  getAllPatients: async (req, res) => {
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
      order: [['status', 'ASC']],
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
      };
      sentPatients.push(newPatient);
    }

    return res.status(200).json(sentPatients);
  },
  getOnePatient: async (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    checkIsIdNumber(patientId);

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
    checkPatientStatus(foundPatient);

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

    const newPrescriptions = [];
    for (const prescription of foundPatient.prescriptions) {
      const pastAppointments = [];
      const upcomingAppointments = [];
      for (const appointment of prescription.appointments) {
        if (appointment.date < currentDate && appointment.time < currentTime) {
          pastAppointments.push(appointment);
        } else {
          upcomingAppointments.push(appointment);
        }
      }
      const newPrescription = {
        id: prescription.id,
        appointment_quantity: prescription.appointment_quantity,
        is_completed: prescription.is_completed,
        at_home_care: prescription.at_home_care,
        date: prescription.date,
        past_appointments: pastAppointments,
        upcoming_appointments: upcomingAppointments,
      };
      newPrescriptions.push(newPrescription);
    }

    const sentPatient = {
      id: foundPatient.id,
      fullName: `${foundPatient.name} ${foundPatient.surname}`,
      age: computeAge(foundPatient.birth_date),
      gender: foundPatient.gender,
      address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
      phone_number: foundPatient.phone_number,
      therapist_name: foundPatient.therapist
        ? `${foundPatient.therapist.name} ${foundPatient.therapist.surname}`
        : null,
      status: foundPatient.status,
      picture_url: foundPatient.picture_url,
      prescriptions: newPrescriptions,
      medic: foundPatient.prescriptions[0].medic,
    };
    return res.status(200).json(sentPatient);
  },
  getActivePatients: async (req, res) => {
    const activePatients = await Patient.findAll({
      where: { status: 'active' },
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
    });

    if (!activePatients) {
      return res.status(400).json({ message: 'No active patients found' });
    } else {
      const sentPatients = [];
      for (const patient of activePatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
          address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
          phone_number: patient.phone_number,
        };
        sentPatients.push(newPatient);
      }

      return res.status(200).json(sentPatients);
    }
  },
  getPendingPatients: async (req, res) => {
    const pendingPatients = await Patient.findAll({
      where: { status: 'pending' },
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
    });

    if (!pendingPatients) {
      return res.status(400).json({ message: 'No pending patients found' });
    } else {
      const sentPatients = [];
      for (const patient of pendingPatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
          address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
          phone_number: patient.phone_number,
        };
        sentPatients.push(newPatient);
      }

      return res.status(200).json(sentPatients);
    }
  },
  getBannedPatients: async (req, res) => {
    const bannedPatients = await Patient.findAll({
      where: { status: 'banned' },
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
    });

    if (!bannedPatients) {
      return res.status(400).json({ message: 'No banned patients found' });
    } else {
      const sentPatients = [];
      for (const patient of bannedPatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
          address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
          phone_number: patient.phone_number,
        };
        sentPatients.push(newPatient);
      }

      return res.status(200).json(sentPatients);
    }
  },
  getInactivePatients: async (req, res) => {
    const inactivePatients = await Patient.findAll({
      where: { status: 'inactive' },
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
    });

    if (!inactivePatients) {
      return res.status(400).json({ message: 'No inactive patients found' });
    } else {
      const sentPatients = [];
      for (const patient of inactivePatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
          address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
          phone_number: patient.phone_number,
        };
        sentPatients.push(newPatient);
      }

      return res.status(200).json(sentPatients);
    }
  },
};

export default patientController;
