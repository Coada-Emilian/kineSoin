import { NavLink } from 'react-router-dom';
import { usePatientRegistrationContext } from '../../../hooks/context/usePatientRegistrationContext';
import { publicMobileNavbarLinkDetails } from '../../../utils/config/public/config/publicMobileNavbarLinkDetails';

export default function PublicMobileNavbar() {
  const { setFormOrder } = usePatientRegistrationContext();

  const handleClick = () => {
    setFormOrder('first');
  };

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg md:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around">
        {publicMobileNavbarLinkDetails.map((link) => (
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
            onClick={handleClick}
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
