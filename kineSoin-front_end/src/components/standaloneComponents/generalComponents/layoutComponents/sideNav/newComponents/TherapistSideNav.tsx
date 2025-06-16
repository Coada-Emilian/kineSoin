import { NavLink } from 'react-router-dom';
import { therapistSideNavLinks } from '../../../../../../utils/constants/privateSection/therapistSection/therapistSideNavLinks';

export default function TherapistSideNav() {
  return (
    <div className="mx-4 ">
      {therapistSideNavLinks.map((link) => (
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
