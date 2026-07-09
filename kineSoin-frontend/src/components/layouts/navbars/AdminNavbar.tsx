import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../../../hooks/context/useAuthenticationContext';
import CustomButton from '../../ui/buttons/CustomButton';
import NavbarLogo from '../../ui/logos/NavbarLogo';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthenticationContext();

  const handleAdminLogout = async () => {
    await logout();
    navigate('/loginAdmin');
  };

  return (
    <header className="bg-white/60 backdrop-blur-md bg-opacity-70 sticky top-0 w-full py-1">
      <nav className="justify-between flex items-center w-full px-4">
        <NavbarLogo />

        <div className="md:flex md:items-center">
          {user?.role === 'ADMIN' && (
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Déconnexion',
                style: 'nav',
                icon: 'logout',
                onClick: handleAdminLogout,
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
