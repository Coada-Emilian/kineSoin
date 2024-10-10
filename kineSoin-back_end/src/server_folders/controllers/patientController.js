import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../utils/checkPatientStatus.js';
import computeAge from '../utils/computeAge.js';
import { Scrypt } from '../authentification/Scrypt.js';
import { patientPhotoStorage } from '../cloudinary/index.js';
import { Patient, Appointment } from '../models/associations.js';
import { application } from 'express';

multer({ storage: patientPhotoStorage });

const patientController = {
  getConnectedPatient: async (req, res) => {
    const patientId = 1;
    if (isNaN(patientId)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }
    const foundPatient = await Patient.findByPk(patientId, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
        ],
      },
      include: [
        {
          association: 'prescriptions',
        },
      ],
    });
    if (
      !foundPatient ||
      foundPatient.status === 'banned' ||
      foundPatient.status === 'pending' ||
      foundPatient.status === 'inactive'
    ) {
      return res.status(404).json({
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    let foundAppointments = [];
    for (const prescription of foundPatient.prescriptions) {
      const appointments = await Appointment.findAll({
        where: {
          prescription_id: prescription.id,
        },
      });
      foundAppointments = [...foundAppointments, ...appointments];
    }

    const currentDate = new Date();

    // Combine appointment date and time into a Date object for comparison
    const futureAppointments = foundAppointments.filter((appointment) => {
      // Create a Date object combining appointment.date and appointment.time
      const appointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );

      // Compare with the current date and time
      return appointmentDateTime > currentDate;
    });

    const sentPatientData = {
      ...foundPatient.toJSON(),
      age: computeAge(foundPatient.birth_date),
      appointments: foundAppointments,
      futureAppointments,
    };

    res.status(200).json(sentPatientData);
  },
};

export default patientController;
