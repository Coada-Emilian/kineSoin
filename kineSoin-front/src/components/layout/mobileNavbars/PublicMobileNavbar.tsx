import { NavLink } from 'react-router-dom';
import { publicMobileNavbarLinkDetails } from '../../../utils/constants/publicMobileNavebarLinkDetails';
import { usePatientRegistrationContext } from '../../../utils/contexts/PatientRegistrationContext/usePatientRegistrationContext';

export default function PublicMobileNavbar() {
  const { setFormOrder } = usePatientRegistrationContext();

  const handleClick = () => {
    setFormOrder('first');
  };

  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {publicMobileNavbarLinkDetails.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex flex-col w-auto items-center bg-white/50 justify-center text-center border shadow-2xl rounded-2xl p-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal scale-105 text-base animate-pulse'
                : 'text-primaryBlue'
            }`
          }
          onClick={handleClick}
        >
          <img src={link.icon} alt={link.name} className="w-8 mb-1" />
          <p className="text-xs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
