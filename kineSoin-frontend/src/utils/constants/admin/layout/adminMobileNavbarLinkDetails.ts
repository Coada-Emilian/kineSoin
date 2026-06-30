import afflictionIcon from '/icons/affliction.png';
import doctorIcon from '/icons/doctor.png';
import insuranceIcon from '/icons/insurance.png';
import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';

export const adminMobileNavbarLinkDetails = [
  {
    name: 'Patients',
    path: '/admin/patients',
    icon: patientIcon,
  },
  {
    name: 'Afflictions',
    path: '/admin/afflictions',
    icon: afflictionIcon,
  },
  {
    name: 'Kinés',
    path: '/admin/therapists',
    icon: therapistIcon,
  },
  {
    name: 'Médecins',
    path: '/admin/medics',
    icon: doctorIcon,
  },
  {
    name: 'Assurances',
    path: '/admin/insurances',
    icon: insuranceIcon,
  },
];
