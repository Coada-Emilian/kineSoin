/**
 * @function renderSideNavLinks
 *
 * A utility function that dynamically renders navigation links for side navigation based on the user type.
 * The `NavLink` component from `react-router-dom` is used to create links with active state styling.
 *
 * @param type - The type of user for which to render the side navigation links. It can be 'admin', 'patient', or 'therapist'.
 * @returns JSX.Element[] - An array of `NavLink` elements for the given user type.
 *
 * @example
 * const adminLinks = renderSideNavLinks('admin');
 *
 * @remarks
 * - This function maps over predefined links stored in the `SideNavLinks` constant, which is filtered by user type.
 */

import { NavLink } from 'react-router-dom';
import { SideNavLinks as links } from '../../constants/SideNav/SideNavLinks';

export const renderSideNavLinks = (type: 'admin' | 'patient' | 'therapist') => {
  // Get the links based on the type
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
