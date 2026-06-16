import changePatientStatusAsAdmin from '../../utils/patient_controller_utils/admin_utils/changePatientStatusAsAdmin.js';
import deletePatientAsAdmin from '../../utils/patient_controller_utils/admin_utils/deletePatientAsAdmin.js';
import getAllPatientsAsAdmin from '../../utils/patient_controller_utils/admin_utils/getAllPatientsAsAdmin.js';
import getOnePatientAsAdmin from '../../utils/patient_controller_utils/admin_utils/getOnePatientAsAdmin.js';
import deletePatientAsTherapist from '../../utils/patient_controller_utils/therapist_utils/deletePatientAsTherapist.js';
import getAllAppointedPatientsAsTherapist from '../../utils/patient_controller_utils/therapist_utils/getAllAppointedPatientsAsTherapist.js';
import getAllPatientsAsTherapist from '../../utils/patient_controller_utils/therapist_utils/getAllPatientsAsTherapist.js';
import getOnePatientAsTherapist from '../../utils/patient_controller_utils/therapist_utils/getOnePatientAsTherapist.js';
import togglePatientStatusAsTherapist from '../../utils/patient_controller_utils/therapist_utils/togglePatientStatusAsTherapist.js';
import updatePatientAsTherapist from '../../utils/therapist_controller_utils/patient_utils/updatePatientAsTherapist.js';

const patientController = {
  // Function to get all patients as an admin
  getAllPatientsAsAdmin,

  // Function to get one patient as an admin
  getOnePatientAsAdmin,

  // Function to toggle the patient's status as an admin
  changePatientStatusAsAdmin,

  // Function to delete a patient as an admin
  deletePatientAsAdmin,

  // Function to toggle patient status as therapist
  togglePatientStatusAsTherapist,

  // Function to get all patients as therapist
  getAllPatientsAsTherapist,

  // Function to get one patients data as a therapist
  getOnePatientAsTherapist,

  // Function to delete a patient as a therapist
  deletePatientAsTherapist,

  // Function to update a patient's status as a therapist
  updatePatientAsTherapist,

  // Function to get all the patients of a therapist
  getAllAppointedPatientsAsTherapist,

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
