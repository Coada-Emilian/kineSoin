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
import { parse } from 'dotenv';

multer({ storage: patientPhotoStorage });

const patientController = {
  getConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
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
          'created_at',
          'updated_at',
          'picture_id',
          'gender',
          'birth_name',
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

    const address = `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`;
    const {
      name,
      surname,
      phone_number,
      email,
      status,
      picture_url,
      prescriptions,
    } = foundPatient;

    const sentPatientData = {
      name,
      surname,
      phone_number,
      email,
      status,
      picture_url,
      prescriptions,
      address,
      age: computeAge(foundPatient.birth_date),
    };

    res.status(200).json(sentPatientData);
  },
  getAllAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    if (isNaN(patientId)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'prescriptions',
          include: [
            {
              association: 'appointments',
            },
          ],
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

    const allAppointments = foundPatient.prescriptions
      .map((prescription) => prescription.appointments)
      .flat();

    const currentDate = new Date();

    // Combine appointment date and time into a Date object for comparison
    const futureAppointments = allAppointments.filter((appointment) => {
      // Create a Date object combining appointment.date and appointment.time
      const appointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );

      // Compare with the current date and time
      return appointmentDateTime > currentDate;
    });

    const pastAppointments = allAppointments.filter((appointment) => {
      const appointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );
      return appointmentDateTime < currentDate;
    });
    res
      .status(200)
      .json({ allAppointments, futureAppointments, pastAppointments });
  },
  getAllMessages: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;

    if (isNaN(patientId)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'sent_messages',
          include: [
            {
              association: 'sender',
              attributes: ['name', 'surname', 'picture_url'],
            },
            {
              association: 'receiver',
              attributes: ['name', 'surname', 'picture_url'],
            },
          ],
        },
        {
          association: 'received_messages',
          include: [
            {
              association: 'sender',
              attributes: ['name', 'surname', 'picture_url'],
            },
            {
              association: 'receiver',
              attributes: ['name', 'surname', 'picture_url'],
            },
          ],
        },
      ],
    });
    const sentMessages = foundPatient.sent_messages;
    const receivedMessages = foundPatient.received_messages;
    res.status(200).json({ sentMessages, receivedMessages });
  },
};

export default patientController;
