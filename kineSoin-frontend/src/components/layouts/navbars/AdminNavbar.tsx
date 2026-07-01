import { Link, useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../utils/functions/contextUtils/useAuthentificationContext';
import { removeAdminTokenFromLocalStorage } from '../../../utils/localStorageUtils/adminLocalStorage';
import CustomButton from '../../ui/buttons/CustomButton';
import Logo2 from '/logos/new-kinesoin-logo-2.webp';
import Logo1 from '/logos/new-kinesoin-logo.webp';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const {
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    setAdminProfileToken,
  } = useAuthentificationContext();

  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    setIsAdminAuthenticated(false);
    setAdminProfileToken(null);
    navigate('/loginAdmin');
  };

  const handleLogoClick = () => {
    removeAdminTokenFromLocalStorage();
    setIsAdminAuthenticated(false);
    setAdminProfileToken(null);
  };

  return (
    <header className="bg-white/60 backdrop-blur-md bg-opacity-70 sticky top-0 w-full py-1">
      <nav className="justify-between flex items-center w-full px-4">
        <Link to="/" onClick={handleLogoClick}>
          <img
            src={Logo2}
            alt="Retour a l'accueil"
            className="max-w-32 lg:max-w-40 block md:hidden"
          />

          <img
            src={Logo1}
            alt="Retour a l'accueil"
            className="max-w-40 lg:max-w-48 hidden md:block transition-transform duration-200 hover:scale-105"
          />
        </Link>

        <div className="md:flex md:items-center">
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
