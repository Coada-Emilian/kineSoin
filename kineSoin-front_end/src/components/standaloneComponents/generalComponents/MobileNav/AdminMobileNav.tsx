/**
 * @component AdminMobileNav
 *
 * This component represents the mobile navigation bar in the admin interface. It is displayed on small screen sizes (below the `md` breakpoint).
 *
 * It dynamically generates navigation links based on the `adminLinks` array. Each link consists of:
 * - An icon (represented by an image).
 * - A text label for the link.
 *
 * The component utilizes the `NavLink` component from `react-router-dom` to manage active and inactive states. Active links receive additional styling such as a bold font, italic text, and a visual ring effect.
 *
 * The `adminLinks` array contains the paths and names of the links to be displayed in the navigation, as well as the corresponding icons.
 *
 * @returns {JSX.Element} The mobile navigation bar for the admin interface, consisting of clickable navigation items.
 *
 * @example
 * <AdminMobileNav />
 */

import { NavLink } from 'react-router-dom';
import { adminLinks } from './constants/links';

export default function AdminMobileNav() {
  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {adminLinks.map((link, index) => (
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
