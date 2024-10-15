import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import {
  Patient,
  Appointment,
  Prescription,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const appointmentController = {
  getAllProposedAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'prescriptions',
          where: { is_completed: false },
          include: [
            {
              association: 'appointments',
              where: { is_canceled: false } && { is_accepted: false },
              attributes: ['id', 'date', 'time'],
            },
            { association: 'medic', attributes: ['name', 'surname'] },
            { association: 'affliction', attributes: ['name', 'description'] },
          ],
        },
      ],
    });
    checkPatientStatus(foundPatient);

    const sentData = [];

    for (const prescription of foundPatient.prescriptions) {
      const medic = prescription.medic;
      const affliction = prescription.affliction;
      const allAppointments = prescription.appointments;
      if (!allAppointments.length) {
        return res.status(200).json({ proposedAppointments: [] });
      }
      const currentDate = new Date();
      const proposedAppointments = allAppointments.filter((appointment) => {
        const appointmentDateTime = new Date(
          `${appointment.date}T${appointment.time}`
        );
        return appointmentDateTime > currentDate;
      });
      const sentInformation = {
        proposedAppointments: proposedAppointments,
        medic: medic,
        affliction: affliction,
      };
      sentData.push(sentInformation);
    }

    res.status(200).json({ sentData });
  },
  getOneProposedAppointment: async (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    checkIsIdNumber(appointmentId);
    const foundAppointment = await Appointment.findByPk(appointmentId, {
      attributes: ['id', 'date', 'time'],
      include: [
        {
          association: 'prescription',
          attributes: [
            'id',
            'appointment_quantity',
            'at_home_care',
            'date',
            'picture_id',
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
          ],
        },
      ],
    });
    if (
      !foundAppointment ||
      foundAppointment.is_accepted === true ||
      foundAppointment.is_canceled === true
    ) {
      return res.status(400).json({
        message: 'Appointment not found, is already accepted or is canceled',
      });
    } else {
      return res.status(200).json(foundAppointment);
    }
  },
  acceptOneProposedAppointment: async (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    checkIsIdNumber(appointmentId);

    const foundAppointment = await Appointment.findByPk(appointmentId, {
      attributes: ['id', 'date', 'time'],
    });

    if (!foundAppointment) {
      return res.status(400).json({ message: 'Appointment not found' });
    } else {
      foundAppointment.is_accepted = true;
      await foundAppointment.save();
      return res.status(200).json({
        message: 'Appointment successfully accepted',
        foundAppointment,
      });
    }
  },
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
              where: { is_canceled: false },
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
  cancelOneAppointment: async (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    checkIsIdNumber(appointmentId);
    const foundAppointment = await Appointment.findByPk(appointmentId);
    if (!foundAppointment) {
      return res.status(400).json({ message: 'Appointment not found' });
    } else {
      foundAppointment.is_canceled = true;
      await foundAppointment.save();
      return res.status(200).json({
        message: 'Appointment successfully canceled',
        foundAppointment,
      });
    }
  },
  addNewAppointment: async (req, res) => {
    // const therapistId = parseInt(req.body.therapist_id, 10);
    // const prescriptionId = parseInt(req.body.prescription_id, 10);
    // const patientId = parseInt(req.patient_id, 10);
    const therapistId = 1;
    const prescriptionId = 1;
    const patientId = 1;

    checkIsIdNumber(therapistId);
    checkIsIdNumber(prescriptionId);
    checkIsIdNumber(patientId);

    const { date, time } = req.body;

    const allAppointments = await Appointment.findAll();
    const existingAppointment = allAppointments.find(
      (appointment) => appointment.date === date && appointment.time === time
    );
    if (existingAppointment) {
      return res.status(400).json({
        message: 'An appointment already exists at this date and time',
      });
    } else {
      const newAppointment = await Appointment.create({
        therapist_id: therapistId,
        prescription_id: prescriptionId,
        patient_id: patientId,
        is_canceled: false,
        date,
        time,
      });

      if (!newAppointment) {
        return res
          .status(400)
          .json({ message: 'The appointment was not created' });
      }

      const foundPrescription = await Prescription.findByPk(prescriptionId);
      if (!foundPrescription) {
        return res.status(400).json({ message: 'Prescription not found' });
      }
      foundPrescription.appointment_quantity -= 1;
      await foundPrescription.save();

      return res.status(201).json({
        message: 'The appointment was created successfully',
        newAppointment,
      });
    }
  },
};

export default appointmentController;
