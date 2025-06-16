import { NavLink } from 'react-router-dom';
import { publicMobileNavLinks } from '../../../../../../utils/constants/public_section/standalone_components/publicMobileNavLinks';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';

export default function PublicMobileNav() {
  const { setFormOrder } = usePatientRegisterContext();

  const handleClick = () => {
    setFormOrder('first');
  };

  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {publicMobileNavLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex flex-col w-16 items-center bg-white bg-opacity-50 justify-center text-center border shadow-2xl rounded-2xl p-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal scale-105 text-md animate-pulse'
                : 'text-primaryBlue'
            }`
          }
          onClick={handleClick}
        >
          <img src={link.icon} alt={link.name} className="w-8 mb-1" />
          <p className="text-xxs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
