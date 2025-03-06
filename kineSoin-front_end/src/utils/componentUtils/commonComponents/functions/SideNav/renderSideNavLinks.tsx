import { NavLink } from 'react-router-dom';
import { SideNavLinks as links } from '../../constants/SideNav/SideNavLinks';

export const renderSideNavLinks = (type: 'admin' | 'patient' | 'therapist') => {
  const currentLinks = links[type];

  return currentLinks.map((link) => (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `flex items-center justify-start my-2 ${
          isActive ? 'text-secondaryBlue font-bold italic' : 'text-primaryBlue'
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
