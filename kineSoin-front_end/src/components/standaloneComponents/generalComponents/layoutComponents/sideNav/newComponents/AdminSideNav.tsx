/**
 * Renders the admin side navigation menu with links.
 * Uses react-router-dom's NavLink to apply active styles dynamically.
 * Maps over the adminSideNavLinks array to display each navigation item with Tailwind CSS classes.
 */

import { NavLink } from 'react-router-dom';
import { adminSideNavLinks } from '../../../../../../utils/constants/adminSection/adminSideNavLinks';

export default function AdminSideNav() {
  return (
    <div className="mx-4">
      {adminSideNavLinks.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `my-2 flex justify-start items-center ${
              isActive
                ? 'font-bold italic text-secondaryBlue'
                : 'text-primaryBlue'
            }`
          }
          key={link.name}
        >
          <p className="text-lg hover:text-secondaryBlue focus:text-red-500">
            {link.name}
          </p>
        </NavLink>
      ))}
    </div>
  );
}
