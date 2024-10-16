import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import {
  Patient,
  Appointment,
  Prescription,
} from '../../models/associations.js';

const appointmentController = {
  getAllProposedAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 81;

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'prescriptions',
          where: { is_completed: false },
          required: false,
          include: [
            {
              association: 'appointments',
              where: { is_canceled: false } && { is_accepted: false },
              required: false,
              attributes: ['id', 'date', 'time'],
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
        prescription_id: prescription.id,
        proposedAppointments: proposedAppointments,
        medic: medic,
        affliction: affliction,
      };
      sentData.push(sentInformation);
    }

    res.status(200).json(sentData);
  },

  getOneProposedAppointment: async (req, res) => {
    // const patient_id = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsIdNumber(appointmentId);

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

  acceptOneProposedAppointment: async (req, res) => {
    // const patientId=parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsIdNumber(appointmentId);

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

      checkIsIdNumber(prescriptionId);

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

  getAllAppointments: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const foundAppointments = await Appointment.findAll({
      where: { patient_id: patientId, is_canceled: false },
      attributes: ['id', 'is_accepted', 'date', 'time'],
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

    if (!foundAppointments.length) {
      return res.status(200).json({
        pastAppointments: [],
        futureAppointments: [],
      });
    }

    const currentDate = new Date();

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
  },

  getOneAppointment: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsIdNumber(appointmentId);

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

  cancelOneAppointment: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);

    const patientId = 1;

    checkIsIdNumber(patientId);

    const appointmentId = parseInt(req.params.id, 10);

    checkIsIdNumber(appointmentId);

    const foundAppointment = await Appointment.findOne({
      where: { patient_id: patientId, id: appointmendId, is_canceled: false },
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
  getAllMyAppointments: async (req, res) => {
    // const therapist_id = parseInt(req.therapist_id, 10);
    const therapist_id = 1;
    checkIsIdNumber(therapist_id);

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
