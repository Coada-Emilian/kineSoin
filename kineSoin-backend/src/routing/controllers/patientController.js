/**
 * @description Central controller export for admin‑side patient management.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all patient‑related admin
 *   operations, keeping routing clean and preventing scattered imports across
 *   the codebase.
 * - Clearly separates admin responsibilities from therapist and patient‑side
 *   logic, making the controller surface easier to maintain and extend.
 *
 * Notes:
 * - Delegates business logic to dedicated service modules, keeping this
 *   controller lightweight and focused on structure rather than implementation.
 */

import changePatientStatusAsAdmin from './handlers/patient/admin/changePatientStatusAsAdmin.js';
import deletePatientAsAdmin from './handlers/patient/admin/deletePatientAsAdmin.js';
import getAllPatientsAsAdmin from './handlers/patient/admin/getAllPatientsAsAdmin.js';
import getOnePatientAsAdmin from './handlers/patient/admin/getOnePatientAsAdmin.js';

const patientController = {
  // Function to get all patients as an admin
  getAllPatientsAsAdmin,

  // Function to get one patient as an admin
  getOnePatientAsAdmin,

  // Function to toggle the patient's status as an admin
  changePatientStatusAsAdmin,

  // Function to delete a patient as an admin
  deletePatientAsAdmin,

  // // Function to toggle patient status as therapist
  // togglePatientStatusAsTherapist,

  // // Function to get all patients as therapist
  // getAllPatientsAsTherapist,

  // // Function to get one patients data as a therapist
  // getOnePatientAsTherapist,

  // // Function to delete a patient as a therapist
  // deletePatientAsTherapist,

  // // Function to update a patient's status as a therapist
  // updatePatientAsTherapist,

  // // Function to get all the patients of a therapist
  // getAllAppointedPatientsAsTherapist,

  // Unused functions

  // // Function to get the connected patient's data
  // getConnectedPatientData,

  // // Function to update the connected patient's profile
  // updateConnectedPatient,

  // // Function to upload a patient photo
  // uploadPatientPhoto,

  // // Delete the patient's account
  // deleteConnectedPatient: async (req, res) => {
  //   // const patientId = parseInt(req.patient_id, 10);

  //   const patientId = 82;

  //   checkIsValidNumber(patientId);

  //   const response = await Patient.destroy({ where: { id: patientId } });

  //   if (!response) {
  //     return res.status(400).json({ message: 'Patient not found' });
  //   } else {
  //     return res.status(200).json({ message: 'Patient deleted successfully!' });
  //   }
  // },

  // // Get the patient's dashboard data
  // getPatientDashboardData: async (req, res) => {
  //   // const patientId = parseInt(req.patient_id, 10);

  //   const patientId = 1;

  //   checkIsValidNumber(patientId);

  //   const currentDate = new Date().toISOString().split('T')[0];
  //   const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

  //   const foundPatient = await Patient.findByPk(patientId, {
  //     attributes: {
  //       exclude: [
  //         'password',
  //         'old_password',
  //         'new_password',
  //         'repeated_password',
  //         'created_at',
  //         'updated_at',
  //         'picture_id',
  //         'birth_name',
  //       ],
  //     },
  //     include: [
  //       {
  //         association: 'prescriptions',
  //         where: { is_completed: false },
  //         required: false,
  //         attributes: [
  //           'id',
  //           'appointment_quantity',
  //           'at_home_care',
  //           'date',
  //           'picture_url',
  //         ],
  //         include: [
  //           {
  //             association: 'appointments',
  //             where: {
  //               [Op.and]: [{ is_canceled: false }, { is_accepted: true }],
  //             },
  //             required: false,
  //             attributes: ['id', 'date', 'time'],
  //           },
  //           { association: 'medic', attributes: ['name', 'surname'] },
  //           { association: 'affliction', attributes: ['name', 'description'] },
  //         ],
  //       },
  //     ],
  //   });

  //   checkPatientStatus(foundPatient);

  //   const modifiedPrescriptions = [];

  //   for (const prescription of foundPatient.prescriptions) {
  //     const past_appointments = [];
  //     const upcoming_appointments = [];

  //     for (const appointment of prescription.appointments) {
  //       if (appointment.date < currentDate && appointment.time < currentTime) {
  //         past_appointments.push(appointment);
  //       } else {
  //         upcoming_appointments.push(appointment);
  //       }
  //     }

  //     const modifiedPrescription = {
  //       id: prescription.id,
  //       appointment_quantity: prescription.appointment_quantity,
  //       at_home_care: prescription.at_home_care,
  //       date: prescription.date,
  //       picture_url: prescription.picture_url,
  //       past_appointments,
  //       upcoming_appointments,
  //     };

  //     modifiedPrescriptions.push(modifiedPrescription);
  //   }

  //   const sentPatientData = {
  //     fullName: `${foundPatient.name} ${foundPatient.surname}`,
  //     surname: foundPatient.surname,
  //     address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
  //     age: computeAge(foundPatient.birth_date),
  //     gender: foundPatient.gender,
  //     insurance: foundPatient.insurance,
  //     prescriptions: modifiedPrescriptions,
  //   };

  //   res.status(200).json(sentPatientData);
  // },
};

export default patientController;
