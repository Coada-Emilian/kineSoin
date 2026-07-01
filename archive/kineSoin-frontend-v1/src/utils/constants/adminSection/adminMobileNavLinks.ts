/**
 * adminMobileNavLinks.ts
 *
 * Defines the navigation links used in the admin mobile navigation bar.
 * Each link object includes:
 * - name: Label displayed under the icon
 * - path: React Router path for navigation
 * - icon: Image source for the link icon
 *
 * These links correspond to key admin sections:
 * Patients, Afflictions, Therapists, Medics, and Insurances.
 */

import afflictionIcon from '/icons/affliction.png';
import doctorIcon from '/icons/doctor.png';
import insuranceIcon from '/icons/insurance.png';
import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';

export const adminMobileNavLinks = [
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
