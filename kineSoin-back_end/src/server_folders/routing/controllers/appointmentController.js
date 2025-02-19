// Purpose: Define the appointment controller, which contains the methods for getting, accepting, and canceling appointments for patients.

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';
import {
  Patient,
  Appointment,
  Prescription,
} from '../../models/associations.js';

const appointmentController = {
  // Function to get all appointments for a patient
  getAllAppointments: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsValidNumber(patientId);

    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundAppointments = await Appointment.findAll({
          where: { patient_id: patientId, is_canceled: false },
          attributes: ['id', 'is_accepted', 'date', 'time'],
          include: [
            {
              association: 'therapist',
              attributes: ['name', 'surname', 'specialty'],
            },
            {
              association: 'prescription',
              attributes: [
                'appointment_quantity',
                'at_home_care',
                'date',
                'picture_url',
              ],
              include: [
                {
                  association: 'affliction',
                  attributes: [
                    'id',
                    'name',
                    'description',
                    'is_operated',
                    'insurance_code',
                  ],
                },
                {
                  association: 'medic',
                  attributes: ['id', 'name', 'surname', 'licence_code'],
                },
              ],
            },
          ],
        });

        if (!foundAppointments.length) {
          return res.status(200).json({
            pastAppointments: [],
            futureAppointments: [],
          });
        }

        const currentDate = new Date();

        const futureAppointments = foundAppointments
          .filter((appointment) => {
            const appointmentDateTime = new Date(
              `${appointment.date}T${appointment.time}`
            );
            return appointmentDateTime > currentDate;
          })
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB; // Ascending order
          });

        const pastAppointments = foundAppointments
          .filter((appointment) => {
            const appointmentDateTime = new Date(
              `${appointment.date}T${appointment.time}`
            );
            return appointmentDateTime < currentDate;
          })
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateB - dateA; // Descending order
          });

        res.status(200).json({ futureAppointments, pastAppointments });
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to get all appointments for a prescription
  getAllAppointmentsForPrescription: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);
    checkIsValidNumber(patientId);
    if (!patientId) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const prescriptionId = parseInt(req.params.prescription_id, 10);

        checkIsValidNumber(prescriptionId);

        const currentDate = new Date();

        const foundAppointments = await Appointment.findAll({
          where: {
            patient_id: patientId,
            prescription_id: prescriptionId,
            is_canceled: false,
          },
          attributes: ['id', 'is_accepted', 'date', 'time'],
          include: [
            {
              association: 'therapist',
              attributes: ['name', 'surname', 'specialty'],
            },
            {
              association: 'prescription',
              attributes: [
                'appointment_quantity',
                'at_home_care',
                'date',
                'picture_url',
              ],
              include: [
                {
                  association: 'affliction',
                  attributes: [
                    'id',
                    'name',
                    'description',
                    'is_operated',
                    'insurance_code',
                  ],
                },
                {
                  association: 'medic',
                  attributes: ['id', 'name', 'surname', 'licence_code'],
                },
              ],
            },
          ],
          order: [
            ['date', 'ASC'],
            ['time', 'ASC'],
          ],
        });

        if (!foundAppointments.length) {
          return res.status(200).json({ message: 'No appointments found' });
        } else {
          const futureAppointments = foundAppointments.filter((appointment) => {
            const appointmentDateTime = new Date(
              `${appointment.date}T${appointment.time}`
            );
            return appointmentDateTime > currentDate;
          });

          const pastAppointments = foundAppointments.filter((appointment) => {
            const appointmentDateTime = new Date(
              `${appointment.date}T${appointment.time}`
            );
            return appointmentDateTime < currentDate;
          });

          res.status(200).json({ futureAppointments, pastAppointments });
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Function to delete an appointment as a therapist
  deleteAppointment: async (req, res) => {
    const therapist_id = parseInt(req.therapist_id, 10);
    checkIsValidNumber(therapist_id);
    if (!therapist_id) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      try {
        const appointmentId = parseInt(req.params.appointment_id, 10);
        checkIsValidNumber(appointmentId);
        const foundAppointment = await Appointment.destroy({
          where: { id: appointmentId, therapist_id: therapist_id },
        });

        if (!foundAppointment) {
          return res.status(400).json({ message: 'Appointment not found' });
        } else {
          return res
            .status(200)
            .json({ message: 'Appointment successfully deleted' });
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  // Get all proposed appointments for a patient
  getAllProposedAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;

    checkIsValidNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'prescriptions',
          where: { is_completed: false },
          attributes: ['id', 'appointment_quantity', 'at_home_care', 'date'],
          required: false,
          include: [
            {
              association: 'appointments',
              where: { is_canceled: false } && { is_accepted: false },
              required: false,
              attributes: ['id', 'date', 'time'],
              include: [
                {
                  association: 'therapist',
                  required: false,
                  attributes: ['name', 'surname'],
                },
              ],
            },
            {
              association: 'medic',
              required: false,
              attributes: ['name', 'surname'],
            },
            {
              association: 'affliction',
              required: false,
              attributes: ['name', 'description'],
            },
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

      const currentDate = new Date();

      const proposedAppointments = allAppointments.filter((appointment) => {
        const appointmentDateTime = new Date(
          `${appointment.date}T${appointment.time}`
        );

        return appointmentDateTime > currentDate;
      });

      const sentInformation = {
        prescription_id: prescription.id,
        proposedAppointments: proposedAppointments,
        medic: medic,
        affliction: affliction,
      };
      sentData.push(sentInformation);
    }

    res.status(200).json(sentData);
  },

  // Get one proposed appointment for a patient
  getOneProposedAppointment: async (req, res) => {
    // const patient_id = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsValidNumber(appointmentId);

    const foundProposedAppointments = await Appointment.findAll({
      where: { patient_id: patientId, is_canceled: false, is_accepted: false },
      attributes: ['id', 'date', 'time'],
      association: 'therapist',
      include: [
        {
          association: 'prescription',
          attributes: [
            'id',
            'appointment_quantity',
            'at_home_care',
            'date',
            'picture_url',
          ],
          include: [
            {
              association: 'medic',
              attributes: ['id', 'name', 'surname', 'licence_code'],
            },
            {
              association: 'affliction',
              attributes: [
                'id',
                'name',
                'description',
                'is_operated',
                'insurance_code',
              ],
            },
          ],
        },
      ],
    });

    const foundAppointment = foundProposedAppointments.find(
      (appointment) => appointment.id === appointmentId
    );

    if (!foundAppointment) {
      return res.status(400).json({
        message: 'Appointment not found',
      });
    } else {
      return res.status(200).json(foundAppointment);
    }
  },

  // Accept one proposed appointment for a patient
  acceptOneProposedAppointment: async (req, res) => {
    // const patientId=parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsValidNumber(appointmentId);

    const foundProposedAppointments = await Appointment.findAll({
      where: { patient_id: patientId, is_canceled: false, is_accepted: false },
      attributes: ['id', 'date', 'time'],
      include: [
        {
          association: 'prescription',
          attributes: [
            'id',
            'appointment_quantity',
            'at_home_care',
            'date',
            'picture_url',
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

    const foundAppointment = foundProposedAppointments.find(
      (appointment) => appointment.id === appointmentId
    );

    if (!foundAppointment) {
      return res.status(400).json({ message: 'Appointment not found' });
    } else {
      foundAppointment.is_accepted = true;

      await foundAppointment.save();

      const prescriptionId = foundAppointment.prescription.id;

      checkIsValidNumber(prescriptionId);

      const foundPrescription = await Prescription.findByPk(prescriptionId);

      if (!foundPrescription) {
        return res.status(400).json({ message: 'Prescription not found' });
      } else {
        foundPrescription.appointment_quantity -= 1;

        await foundPrescription.save();
        return res.status(200).json({
          message: 'Appointment successfully accepted',
          foundAppointment,
        });
      }
    }
  },

  // Get one appointment for a patient
  getOneAppointment: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsValidNumber(appointmentId);

    const foundAppointment = await Appointment.findOne({
      where: { patient_id: patientId, id: appointmentId, is_canceled: false },
      attributes: ['id', 'is_accepted', 'date', 'time', 'is_canceled'],
      include: [
        {
          association: 'prescription',
          attributes: [
            'appointment_quantity',
            'at_home_care',
            'date',
            'picture_url',
          ],
          include: [
            {
              association: 'affliction',
              attributes: [
                'id',
                'name',
                'description',
                'is_operated',
                'insurance_code',
              ],
            },
            {
              association: 'medic',
              attributes: ['id', 'name', 'surname', 'licence_code'],
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

  // Cancel one appointment for a patient
  cancelOneAppointment: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsValidNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsValidNumber(appointmentId);

    const foundAppointment = await Appointment.findOne({
      where: { patient_id: patientId, id: appointmentId, is_canceled: false },
    });

    if (!foundAppointment) {
      return res
        .status(400)
        .json({ message: 'Appointment not found or already canceled' });
    } else {
      foundAppointment.is_canceled = true;

      const response = await foundAppointment.save();

      if (!response) {
        return res
          .status(400)
          .json({ message: 'Appointment was not canceled' });
      } else {
        return res.status(200).json({
          message: 'Appointment successfully canceled',
          foundAppointment,
        });
      }
    }
  },

  // Get all appointments for a therapist
  addNewAppointment: async (req, res) => {
    // const therapistId = parseInt(req.body.therapist_id, 10);

    // const prescriptionId = parseInt(req.body.prescription_id, 10);

    // const patientId = parseInt(req.patient_id, 10);

    const therapistId = 1;

    checkIsValidNumber(therapistId);

    const newAppointmentSchema = Joi.object({
      date: Joi.date().required(),
      time: Joi.string().required(),
      patientId: Joi.number().required(),
      prescriptionId: Joi.number().required(),
    });

    const { date, time, patientId, prescriptionId } = req.body;

    checkIsValidNumber(prescriptionId);

    checkIsValidNumber(patientId);

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
        is_accepted: false,
        date,
        time,
      });

      if (!newAppointment) {
        return res
          .status(400)
          .json({ message: 'The appointment was not created' });
      }

      return res.status(201).json({
        message: 'The appointment was created successfully',
        newAppointment,
      });
    }
  },

  //  Get all appointments for a therapist
  getAllMyAppointments: async (req, res) => {
    // const therapist_id = parseInt(req.therapist_id, 10);

    const therapist_id = 1;

    checkIsValidNumber(therapist_id);

    const { day, month, year } = req.body;

    const searchedDate = `${year}-${month}-${day}`;

    const foundAppointments = await Appointment.findAll({
      where: {
        therapist_id: therapist_id,
        is_canceled: false,
        is_accepted: true,
        date: searchedDate,
      },
      attributes: ['id', 'date', 'time'],
      include: [
        {
          association: 'prescription',
          where: { is_completed: false },
          attributes: [
            'id',
            'appointment_quantity',
            'at_home_care',
            'picture_url',
          ],
          include: [
            { association: 'medic', attributes: ['name', 'surname'] },
            { association: 'affliction', attributes: ['name', 'description'] },
          ],
        },
      ],
      order: [
        ['date', 'ASC'],
        ['time', 'ASC'],
      ],
    });

    if (!foundAppointments.length) {
      return res.status(200).json({ message: 'No appointments found' });
    }

    res.status(200).json({ foundAppointments });
  },
};

export default appointmentController;
