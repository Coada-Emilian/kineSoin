/**
 * @component PublicMobileNav
 *
 * This component renders the mobile navigation for the public section of the app. It is intended to be displayed on smaller screens, ensuring responsive behavior with Tailwind CSS utilities.
 *
 * It consists of navigation links defined in the `publicLinks` constant, each of which is an object containing the path, name, and icon for the link. When clicked, each `NavLink` triggers the `setFormOrder('first')` function from the `PatientRegisterContext` to reset the form order.
 *
 * @returns {JSX.Element} The mobile navigation bar with dynamically styled links.
 *
 * @example
 * <PublicMobileNav />
 *
 * @see {@link https://reactrouter.com/web/api/NavLink} for more information about the `NavLink` component.
 */

import { NavLink } from 'react-router-dom';
import { publicLinks } from './constants/links';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext';

export default function PublicMobileNav() {
  const { setFormOrder } = usePatientRegisterContext();

  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {publicLinks.map((link, index) => (
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
          onClick={() => {
            setFormOrder('first');
          }}
        >
          <img src={link.icon} alt={link.name} className="w-8 mb-1" />
          <p className="text-xxs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
