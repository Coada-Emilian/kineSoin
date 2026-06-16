import { NavLink } from 'react-router-dom';
import { patientSideNavLinks } from '../../../../../../utils/constants/privateSection/patientSection/patientSideNavLinks';

export default function PatientSideNav() {
  return (
    <div className="mx-4 ">
      {patientSideNavLinks.map((link) => (
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
