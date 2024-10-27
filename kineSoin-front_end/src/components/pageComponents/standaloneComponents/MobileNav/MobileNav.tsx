/**
 * @file MobileNav.tsx
 * @description A React functional component that renders a mobile navigation menu for the admin
 * section of the KineSoin application. The navigation includes links to various sections such as
 * therapists, patients, afflictions, medics, and insurances, each with an associated icon.
 *
 * @returns {JSX.Element} The rendered MobileNav component, which displays a series of
 * navigational links in a flexible layout for mobile devices.
 */

import { Icons } from 'react-toastify';
import afflictionIcon from '/icons/affliction.png';
import doctorIcon from '/icons/doctor.png';
import insuranceIcon from '/icons/insurance.png';
import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';
import mainLogo from '/logos/Main-Logo.png';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isAdminMobileNav?: boolean;
  isPublicMobileNav?: boolean;
}

export default function MobileNav({
  isAdminMobileNav,
  isPublicMobileNav,
}: MobileNavProps) {
  const adminLinks = [
    {
      name: 'Kinés',
      path: '/admin/therapists',
      icon: therapistIcon,
    },
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

  const publicLinks = [
    {
      name: 'Connexion kiné',
      path: '/loginTherapist',
      icon: therapistIcon,
    },
    {
      name: 'Inscription patient',
      path: '/registerPatient',
      icon: mainLogo,
    },
    {
      name: 'Connexion patient',
      path: '/loginPatient',
      icon: patientIcon,
    },
  ];

  return (
    <>
      {isAdminMobileNav && (
        <div className="flex gap-2 justify-around w-full">
          {adminLinks.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className=" flex flex-col items-center justify-center text-center"
            >
              <img src={link.icon} alt={link.name} className="w-8 mb-2" />
              <p className="text-xs font-medium">{link.name}</p>
            </Link>
          ))}
        </div>
      )}
      {isPublicMobileNav && (
        <div className="flex gap-2 justify-around w-full py-4 bg-container">
          {publicLinks.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className=" flex flex-col items-center justify-center text-center"
            >
              <img src={link.icon} alt={link.name} className="w-10 mb-2" />
              <p className="text-xs font-medium">{link.name}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
