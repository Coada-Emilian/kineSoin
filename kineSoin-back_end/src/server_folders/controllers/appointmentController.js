import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../utils/checkIsIdNumber.js';
import computeAge from '../utils/computeAge.js';
import { Scrypt } from '../authentification/Scrypt.js';
import { patientPhotoStorage } from '../cloudinary/index.js';
import { Patient, Appointment } from '../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const appointmentController = {
  getAllAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

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
    checkPatientStatus(foundPatient);

    const allAppointments = foundPatient.prescriptions
      .map((prescription) => prescription.appointments)
      .flat();

    if (!allAppointments.length) {
      return res.status(200).json({
        allAppointments: [],
        futureAppointments: [],
        pastAppointments: [],
      });
    }

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
  getOneAppointment: async (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    checkIsIdNumber(appointmentId);
    const foundAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          association: 'prescription',
          include: [
            { association: 'medic', attributes: ['id', 'name', 'surname'] }, // Example: Medic attributes
            {
              association: 'affliction',
              attributes: ['id', 'name', 'insurance_code'],
            },
          ],
        },
      ],
    });
    if (!foundAppointment) {
      return res.status(400).json({ message: 'Appointment not found' });
    } else {
      return res.status(200).json(foundAppointment);
    }
  },
};

export default appointmentController;
