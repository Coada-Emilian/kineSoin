import conversationLogo from '/icons/conversation.png';
import patientsIcon from '/icons/patients.png';
import prescriptionIcon from '/icons/prescription.png';
import appointmentLogo from '/logos/appointment_192.webp';
import therapistIcon from '/logos/therapist_192.webp';

export const therapistMobileNavbarLinkDetails = [
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
    name: 'Ordos',
    path: '/therapist/prescriptions',
    icon: prescriptionIcon,
    onChange: () => {},
  },
];
