import { NavLink } from 'react-router-dom';
import { therapistSideNavbarLinkDetails } from '../../../utils/config/therapist/therapistSideNavbarLinkDetails';

export default function TherapistSideNavbar() {
  return (
    <div className="mx-4 ">
      {therapistSideNavbarLinkDetails.map((link) => (
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
