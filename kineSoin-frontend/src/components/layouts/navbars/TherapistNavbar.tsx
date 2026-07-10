import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../../../hooks/context/useAuthenticationContext';
import CustomButton from '../../ui/buttons/CustomButton';
import NavbarLogo from '../../ui/logos/NavbarLogo';

export default function TherapistNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthenticationContext();

  const handleTherapistLogout = async () => {
    await logout();
    navigate('/loginTherapist');
  };

  return (
    <header className="bg-linear-to-r from-teal-50 to-white backdrop-blur-md bg-opacity-70 sticky top-0 w-full py-1">
      <nav className="justify-between flex items-center w-full px-4">
        <NavbarLogo />

        <div className="md:flex md:items-center">
          {user?.role === 'THERAPIST' && (
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Déconnexion',
                style: 'nav',
                icon: 'logout',
                onClick: handleTherapistLogout,
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
