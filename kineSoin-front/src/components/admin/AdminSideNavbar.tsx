import { NavLink } from 'react-router-dom';
import { adminSideNavbarLinkDetails } from '../../utils/constants/admin/adminSideNavbarLinkDetails';

export default function AdminSideNavbar() {
  return (
    <div className="mx-4">
      {adminSideNavbarLinkDetails.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `my-2 flex justify-start items-center ${
              isActive
                ? 'font-bold italic text-secondaryBlue'
                : 'text-primaryBlue'
            }`
          }
          key={link.name}
        >
          <p className="text-lg hover:text-secondaryBlue focus:text-red-500">
            {link.name}
          </p>
        </NavLink>
      ))}
    </div>
  );
}
