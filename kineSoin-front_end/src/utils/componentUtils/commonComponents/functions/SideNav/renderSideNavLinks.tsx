/**
 * renderSideNavLinks Function
 *
 * This function is responsible for rendering a list of navigation links based on the provided user role type. 
 * It retrieves the links from a predefined list of side navigation links (SideNavLinks) and generates `NavLink` elements 
 * for each link. The rendered `NavLink` components will be styled according to whether they are active or not.
 *
 * The function supports three different user role types: 'admin', 'patient', and 'therapist'. The correct links for the 
 * given role type are selected dynamically, ensuring that users see only the relevant navigation options.
 *
 * **Main Features:**
 * - Accepts a `type` parameter to determine which set of navigation links to render.
 * - Dynamically applies styling to the links based on their active state (`isActive`), changing the text color and font weight.
 * - Returns a list of `NavLink` components that can be used within a sidebar or navigation menu.
 *
 * **Parameters:**
 * - `type` (`'admin' | 'patient' | 'therapist'`): The role type used to determine which navigation links to display.
 *
 * **Usage Example:**
 * ```tsx
 * const adminLinks = renderSideNavLinks('admin');
 * ```
 * This will return the navigation links for the admin role.
 *
 * **Important Notes:**
 * - The function relies on a `SideNavLinks` constant which stores predefined links for different user roles.
 * - The `NavLink` component from `react-router-dom` is used to enable navigation with automatic active state management.
 * - The active link is styled with the classes `text-secondaryBlue`, `font-bold`, and `italic`, while inactive links use `text-primaryBlue`.
 *
 * @param {string} type - The type of user role (either 'admin', 'patient', or 'therapist').
 * @returns {JSX.Element[]} - An array of `NavLink` components representing the navigation links.
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
