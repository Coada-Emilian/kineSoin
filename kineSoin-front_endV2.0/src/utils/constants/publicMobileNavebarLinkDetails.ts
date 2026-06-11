import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';
import mainLogo from '/logos/Main-Logo.png';

export const publicMobileNavbarLinkDetails = [
  {
    name: 'Connexion Kiné',
    path: '/loginTherapist',
    icon: therapistIcon,
  },
  {
    name: 'Inscription Patient',
    path: '/registerPatient',
    icon: mainLogo,
  },
  {
    name: 'Connexion Patient',
    path: '/loginPatient',
    icon: patientIcon,
  },
];
