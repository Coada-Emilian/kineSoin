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
import prescriptionIcon from '/icons/prescription.png';
import patientsIcon from '/icons/patients.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface MobileNavProps {
  isAdminMobileNav?: boolean;
  isPublicMobileNav?: boolean;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  isPatientMobileNav?: boolean;
  isTherapistMobileNav?: boolean;
}

export default function MobileNav({
  isAdminMobileNav,
  isPublicMobileNav,
  setIsRegisterPageRendered,
  isPatientMobileNav,
  isTherapistMobileNav,
}: MobileNavProps) {
  interface Link {
    name: string;
    path: string;
    icon: string;
    onClick?: () => void;
  }

  const adminLinks = [
    {
      name: 'Patients',
      path: '/admin/patients',
      icon: patientIcon,
      onChange: () => {},
    },
    {
      name: 'Afflictions',
      path: '/admin/afflictions',
      icon: afflictionIcon,
      onChange: () => {},
    },
    {
      name: 'Kinés',
      path: '/admin/therapists',
      icon: therapistIcon,
      onChange: () => {},
    },
    {
      name: 'Médecins',
      path: '/admin/medics',
      icon: doctorIcon,
      onChange: () => {},
    },
    {
      name: 'Assurances',
      path: '/admin/insurances',
      icon: insuranceIcon,
      onChange: () => {},
    },
  ];

  const publicLinks = [
    {
      name: 'Connexion Kiné',
      path: '/loginTherapist',
      icon: therapistIcon,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(false),
    },
    {
      name: 'Inscription Patient',
      path: '/registerPatient',
      icon: mainLogo,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(true),
    },
    {
      name: 'Connexion Patient',
      path: '/loginPatient',
      icon: patientIcon,
      onClick: () =>
        setIsRegisterPageRendered && setIsRegisterPageRendered(false),
    },
  ];

  const patientLinks = [
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
      path: '/patient/my-info',
      icon: patientInfoLogo,
      onChange: () => {},
    },
  ];

  const therapistLinks = [
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
      path: '/therapist/my-info',
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

  const [activeLinks, setActiveLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (isAdminMobileNav) {
      setActiveLinks(adminLinks);
    } else if (isPublicMobileNav) {
      setActiveLinks(publicLinks);
    } else if (isPatientMobileNav) {
      setActiveLinks(patientLinks);
    } else if (isTherapistMobileNav) {
      setActiveLinks(therapistLinks);
    }
  }, []);

  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3">
      {activeLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex flex-col w-16 items-center bg-white bg-opacity-50 justify-center text-center border shadow-2xl rounded-2xl p-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal scale-105 text-md animate-pulse'
                : 'text-primaryBlue'
            }`
          }
        >
          <img src={link.icon} alt={link.name} className="w-8 mb-1" />
          <p className="text-xxs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
