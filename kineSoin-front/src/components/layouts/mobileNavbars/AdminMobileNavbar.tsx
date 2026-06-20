import { NavLink } from 'react-router-dom';
import { adminMobileNavbarLinkDetails } from '../../../utils/constants/admin/layout/adminMobileNavbarLinkDetails';

export default function AdminMobileNav() {
  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 rounded  md:hidden">
      {adminMobileNavbarLinkDetails.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex flex-col w-3/12 items-center bg-white/40 justify-center text-center border border-slate-200 shadow-2xl rounded-2xl p-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal scale-105 text-base animate-pulse'
                : 'text-primaryBlue'
            }`
          }
        >
          <img src={link.icon} alt={link.name} className="mb-1 w-8" />

          <p className="text-xs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
