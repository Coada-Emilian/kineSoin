// Purpose: Provide a mobile navigation bar for the admin and public pages.

import afflictionIcon from '/icons/affliction.png';
import doctorIcon from '/icons/doctor.png';
import insuranceIcon from '/icons/insurance.png';
import patientIcon from '/icons/patient.png';
import therapistIcon from '/icons/therapist.png';
import mainLogo from '/logos/Main-Logo.png';
import appointmentLogo from '/icons/appointment.png';
import newFileLogo from '/icons/new-document.png';
import conversationLogo from '/icons/conversation.png';
import patientInfoLogo from '/icons/patient-info.png';
import { NavLink } from 'react-router-dom';

interface MobileNavProps {
  isAdminMobileNav?: boolean;
  isPublicMobileNav?: boolean;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  isPatientMobileNav?: boolean;
}

export default function MobileNav({
  isAdminMobileNav,
  isPublicMobileNav,
  setIsRegisterPageRendered,
  isPatientMobileNav,
}: MobileNavProps) {
  const adminLinks = [
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

  const publicLinks = [
    {
      name: 'Connexion kiné',
      path: '/loginTherapist',
      icon: therapistIcon,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(false),
    },
    {
      name: 'Inscription patient',
      path: '/registerPatient',
      icon: mainLogo,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(true),
    },
    {
      name: 'Connexion patient',
      path: '/loginPatient',
      icon: patientIcon,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(false),
    },
  ];

  const patientLinks = [
    {
      name: 'Nouvelle ordonnance',
      path: '/patient/new-prescription',
      icon: newFileLogo,
    },
    {
      name: 'Rendez-vous',
      path: '/patient/appointments',
      icon: appointmentLogo,
    },
    { name: 'Mon kine', path: '/patient/my-therapist', icon: therapistIcon },
    {
      name: 'Messages',
      path: '/patient/messages',
      icon: conversationLogo,
    },

    {
      name: 'Mes informations',
      path: '/patient/my-info',
      icon: patientInfoLogo,
    },
  ];

  return (
    <>
      {isAdminMobileNav && (
        <div className="flex gap-2 justify-around w-full">
          {adminLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                `flex flex-col w-16 items-center bg-gray-50 bg-opacity-50 justify-center text-center border rounded-lg p-1 ${
                  isActive
                    ? 'text-secondaryBlue font-bold italic ring-1 ring-secondaryBlue ring-offset-2'
                    : 'text-primaryBlue'
                }`
              }
            >
              <img src={link.icon} alt={link.name} className="w-8 mb-2" />
              <p className="text-xs font-medium">{link.name}</p>
            </NavLink>
          ))}
        </div>
      )}

      {isPublicMobileNav && (
        <div className="flex gap-2 justify-around w-full py-4 bg-container">
          {publicLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                `flex flex-col w-16 items-center bg-white bg-opacity-50 justify-center text-center border  rounded-lg p-2 ${
                  isActive
                    ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal'
                    : 'text-primaryBlue'
                }`
              }
            >
              <img src={link.icon} alt={link.name} className="w-8 mb-2" />
              <p className="text-xs font-medium">{link.name}</p>
            </NavLink>
          ))}
        </div>
      )}

      {isPatientMobileNav && (
        <div className="flex gap-2 justify-around w-full py-4 bg-container">
          {patientLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                `flex flex-col w-16 items-center bg-white bg-opacity-50 justify-center text-center border  rounded-lg p-2 ${
                  isActive
                    ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal'
                    : 'text-primaryBlue'
                }`
              }
            >
              <img src={link.icon} alt={link.name} className="w-8 mb-2" />
              <p className="text-xxs font-medium">{link.name}</p>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
