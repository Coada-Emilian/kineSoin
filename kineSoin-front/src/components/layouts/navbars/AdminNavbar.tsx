import { Link, useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../utils/contexts/AuthentificationContext/useAuthentificationContext';
import { removeAdminTokenFromLocalStorage } from '../../../utils/localStorageUtils/adminLocalStorage';
import CustomButton from '../../ui/buttons/CustomButton';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function AdminNavBar() {
  // Import navigation
  const navigate = useNavigate();

  // Import authentication context
  const {
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    setAdminProfileToken,
  } = useAuthentificationContext();

  // Function to handle the admin logout
  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    setIsAdminAuthenticated(false);
    setAdminProfileToken(null);
    navigate('/loginAdmin');
  };

  return (
    <header className="sticky top-0 z-10 w-full py-1 bg-linear-to-r from-white to-gray-200 bg-opacity-70">
      <nav className="flex w-full items-center justify-between px-4">
        <Link to="/">
          <img
            src={Logo2}
            alt="Retour a l'accueil"
            className="block max-w-32 md:hidden lg:max-w-40"
          />

          <img
            src={Logo1}
            alt="Retour a l'accueil"
            className="hidden max-w-32 md:block lg:max-w-40"
          />
        </Link>

        <div className="flex items-center">
          {isAdminAuthenticated && (
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
