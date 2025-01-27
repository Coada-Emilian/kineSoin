// Purpose: The purpose of this component is to render the admin side navigation.

import { NavLink } from 'react-router-dom';

interface AdminSideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
}

export default function AdminSideNav({
  isAdminSideNav,
  isPatientSideNav,
}: AdminSideNavProps) {
  const adminLinks = [
    { name: 'Tous les kinésithérapeutes', path: '/admin/therapists' },
    { name: 'Tous les patients', path: '/admin/patients' },
    { name: 'Afflictions', path: '/admin/afflictions' },
    { name: 'Médecins', path: '/admin/medics' },
    { name: "Organismes d'assurance", path: '/admin/insurances' },
  ];

  const patientLinks = [
    { name: 'Tableau de bord', path: '/patient/dashboard' },
    { name: 'Nouvelle ordonnance', path: '/patient/new-prescription' },
    { name: 'Rendez-vous', path: '/patient/appointments' },
    { name: 'Messages', path: '/patient/messages' },
    { name: 'Mon kinésithérapeute', path: '/patient/my-therapist' },
    { name: 'Mes informations', path: '/patient/my-info' },
  ];

  return (
    <div className="mx-4">
      {isAdminSideNav &&
        adminLinks.map((link) => (
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
        ))}

      {isPatientSideNav &&
        patientLinks.map((link) => (
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
        ))}
    </div>
  );
}
