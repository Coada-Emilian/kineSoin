// Purpose: The purpose of this component is to render the admin side navigation.

import { NavLink } from 'react-router-dom';
import { SideNavLinks as links } from './SideNavLinks';

interface SideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
  isTherapistSideNav?: boolean;
}

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
