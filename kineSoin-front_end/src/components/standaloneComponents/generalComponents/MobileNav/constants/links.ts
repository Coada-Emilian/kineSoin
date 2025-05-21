import appointmentLogo from '/icons/appointment.png';
import conversationLogo from '/icons/conversation.png';
import newFileLogo from '/icons/new-document.png';
import patientInfoLogo from '/icons/patient-info.png';
import patientsIcon from '/icons/patients.png';
import prescriptionIcon from '/icons/prescription.png';
import therapistIcon from '/icons/therapist.png';

export const patientLinks = [
  {
    name: 'Ordonnance',
    path: '/patient/new-prescription',
    icon: newFileLogo,
    onChange: () => {},
  },
  {
    name: 'RDV',
    path: '/patient/appointments',
    icon: appointmentLogo,
    onChange: () => {},
  },
  {
    name: 'Mon kine',
    path: '/patient/my-therapist',
    icon: therapistIcon,
    onChange: () => {},
  },
  {
    name: 'Messages',
    path: '/patient/messages',
    icon: conversationLogo,
    onChange: () => {},
  },
  {
    name: 'Mes infos',
    path: '/patient/my-profile',
    icon: patientInfoLogo,
    onChange: () => {},
  },
];

export const therapistLinks = [
  {
    name: 'Patients',
    path: '/therapist/patients',
    icon: patientsIcon,
    onChange: () => {},
  },
  {
    name: 'RDV',
    path: '/therapist/appointments',
    icon: appointmentLogo,
    onChange: () => {},
  },
  {
    name: 'Messages',
    path: '/therapist/messages',
    icon: conversationLogo,
    onChange: () => {},
  },
  {
    name: 'Mes infos',
    path: '/therapist/my-profile',
    icon: therapistIcon,
    onChange: () => {},
  },
  {
    name: 'Ordonnances',
    path: '/therapist/prescriptions',
    icon: prescriptionIcon,
    onChange: () => {},
  },
];
