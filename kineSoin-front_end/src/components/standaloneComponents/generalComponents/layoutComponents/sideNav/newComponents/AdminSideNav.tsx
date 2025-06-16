import { NavLink } from 'react-router-dom';
import { adminSideNavLinks } from '../../../../../../utils/constants/adminSection/adminSideNavLinks';

export default function AdminSideNav() {
  return (
    <div className="mx-4 ">
      {adminSideNavLinks.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items-center justify-start my-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic'
                : 'text-primaryBlue'
            }`
          }
          key={link.name}
        >
          <p className="hover:text-secondaryBlue focus:text-red-500 text-lg">
            {link.name}
          </p>
        </NavLink>
      ))}
    </div>
  );
}
