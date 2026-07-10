import { NavLink } from 'react-router-dom';
import { therapistSideNavbarLinkDetails } from '../../../utils/config/therapist/therapistSideNavbarLinkDetails';

export default function TherapistSideNavbar() {
  return (
    <aside className="sticky top-6 px-4 py-6">
      <h2 className="mb-6 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Navigation
      </h2>

      <nav className="space-y-2">
        {therapistSideNavbarLinkDetails.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-teal-100 text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
