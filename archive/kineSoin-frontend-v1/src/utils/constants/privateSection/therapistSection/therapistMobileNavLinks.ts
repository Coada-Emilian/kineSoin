import appointmentLogo from '/icons/appointment.png';
import conversationLogo from '/icons/conversation.png';
import patientsIcon from '/icons/patients.png';
import prescriptionIcon from '/icons/prescription.png';
import therapistIcon from '/icons/therapist.png';

export const therapistMobileNavLinks = [
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
