import { NavLink } from 'react-router-dom';
import { therapistMobileNavLinks } from '../../../../../../utils/constants/privateSection/therapistSection/therapistMobileNavLinks';

export default function TherapistMobileNav() {
  return (
    <div className="flex w-full justify-around gap-2 bg-primaryTeal px-4 py-3 md:hidden">
      {therapistMobileNavLinks.map((link, index) => (
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
