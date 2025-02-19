// Purpose: The purpose of this component is to render the admin side navigation.

import { NavLink } from 'react-router-dom';

interface SideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
  isTherapistSideNav?: boolean;
}

const links = {
  admin: [
    { name: 'Tous les kinésithérapeutes', path: '/admin/therapists' },
    { name: 'Tous les patients', path: '/admin/patients' },
    { name: 'Afflictions', path: '/admin/afflictions' },
    { name: 'Médecins', path: '/admin/medics' },
    { name: "Organismes d'assurance", path: '/admin/insurances' },
  ],
  patient: [
    { name: 'Tableau de bord', path: '/patient/dashboard' },
    { name: 'Nouvelle ordonnance', path: '/patient/new-prescription' },
    { name: 'Rendez-vous', path: '/patient/appointments' },
    { name: 'Messages', path: '/patient/messages' },
    { name: 'Mon kinésithérapeute', path: '/patient/my-therapist' },
    { name: 'Mes informations', path: '/patient/my-info' },
  ],
  therapist: [
    { name: 'Tableau de bord', path: '/therapist/dashboard' },
    { name: 'Patients', path: '/therapist/patients' },
    { name: 'Rendez-vous', path: '/therapist/appointments' },
    { name: 'Messages', path: '/therapist/messages' },
    { name: 'Mes informations', path: '/therapist/my-profile' },
    { name: 'Ordonnances', path: '/therapist/prescriptions' },
  ],
};

export default function SideNav({
  isAdminSideNav,
  isPatientSideNav,
  isTherapistSideNav,
}: SideNavProps) {
  const renderLinks = (type: 'admin' | 'patient' | 'therapist') => {
    const currentLinks = links[type];

    return currentLinks.map((link) => (
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `flex items-center justify-start my-2 ${
            isActive
              ? 'text-secondaryBlue font-bold italic'
              : 'text-primaryBlue'
          }`
        }
        key={link.name}
      >
        <p className="hover:text-secondaryBlue focus:text-red-500 text-lg">
          {link.name}
        </p>
      </NavLink>
    ));
  };

  return (
    <div className="mx-4">
      {isAdminSideNav && renderLinks('admin')}
      {isPatientSideNav && renderLinks('patient')}
      {isTherapistSideNav && renderLinks('therapist')}
    </div>
  );
}
