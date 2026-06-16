/**
 * AdminMobileNav.tsx
 *
 * Bottom mobile navigation bar for the admin section.
 *
 * Features:
 * - Displays navigation icons/labels defined in `adminMobileNavLinks`
 * - Highlights the active link with animation and styling
 * - Only visible on small screens (hidden on `md` and up)
 *
 * Styling:
 * - Full-width horizontal layout with spacing and padding
 * - Active link: animated, highlighted with scale/ring/italic
 * - Inactive link: muted blue text
 */

import { NavLink } from 'react-router-dom';
import { adminMobileNavLinks } from '../../../../../../utils/constants/adminSection/adminMobileNavLinks';

export default function AdminMobileNav() {
  return (
    <div className="flex w-full justify-around gap-2 bg-primaryTeal px-4 py-3 md:hidden">
      {adminMobileNavLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex w-16 flex-col items-center justify-center rounded-2xl border bg-white bg-opacity-50 p-2 text-center shadow-2xl ${
              isActive
                ? 'text-md scale-105 font-bold italic animate-pulse text-secondaryBlue ring-1 ring-primaryTeal'
                : 'text-primaryBlue'
            }`
          }
        >
          <img src={link.icon} alt={link.name} className="mb-1 w-8" />

          <p className="text-xxs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
