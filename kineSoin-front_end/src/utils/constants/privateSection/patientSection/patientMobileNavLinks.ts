import appointmentLogo from '/icons/appointment.png';
import conversationLogo from '/icons/conversation.png';
import newFileLogo from '/icons/new-document.png';
import patientInfoLogo from '/icons/patient-info.png';
import therapistIcon from '/icons/therapist.png';

export const patientMobileNavLinks = [
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
