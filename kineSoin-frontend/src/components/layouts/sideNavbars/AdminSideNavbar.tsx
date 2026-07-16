import { NavLink } from 'react-router-dom';
import { adminSideNavbarLinkDetails } from '../../../utils/config/admin/adminSideNavbarLinkDetails';

export default function AdminSideNavbar() {
  return (
    <aside className="mx-4 p-4 rounded-xl bg-white/60 backdrop-blur-md shadow-sm">
      <nav className="flex flex-col gap-1">
        {adminSideNavbarLinkDetails.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) =>
              `
              flex items-center px-4 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? 'bg-secondaryBlue/10 text-secondaryBlue font-semibold'
                  : 'text-primaryBlue hover:bg-gray-100'
              }
              `
            }
          >
            <span className="text-lg">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
