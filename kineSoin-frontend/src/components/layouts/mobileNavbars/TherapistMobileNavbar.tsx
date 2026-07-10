import { NavLink } from 'react-router-dom';
import { therapistMobileNavbarLinkDetails } from '../../../utils/config/therapist/layout/therapistMobileNavbarLinkDetails';

export default function TherapistMobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg md:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around">
        {therapistMobileNavbarLinkDetails.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex h-full flex-1 flex-col items-center justify-center transition-colors ${
                isActive
                  ? 'text-teal-700'
                  : 'text-slate-500 hover:text-slate-700'
              }`
            }
          >
            <img
              src={link.icon}
              alt={link.name}
              className="mb-1 h-6 w-6 object-contain"
            />

            <span className="mt-1 text-[11px] font-medium">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
