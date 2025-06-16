import { NavLink } from 'react-router-dom';
import { adminMobileNavLinks } from '../../../../../../utils/constants/adminSection/adminMobileNavLinks';

export default function AdminMobileNav() {
  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {adminMobileNavLinks.map((link, index) => (
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
