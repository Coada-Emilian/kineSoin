/**
 * @component AdminNavBar
 *
 * This component represents the navigation bar for the admin section. It includes:
 * - The logo that links to the homepage (`Logo1` for larger screens and `Logo2` for smaller screens).
 * - A logout button (`CustomBtn`), which allows the admin to log out. The button is only visible when the admin is authenticated.
 *
 * The `AdminNavBar` is sticky at the top of the screen, providing a consistent navigation experience for the admin across all pages.
 *
 * @returns {JSX.Element} The navigation bar structure for the admin, including logo and logout button.
 *
 * @example
 * <AdminNavBar />
 */

import { Link } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../../localStorage/adminLocalStorage';
import { useGlobalContext } from '../../../../../utils/contexts/GlobalContext';
import { useAuthentificationContext } from '../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import CustomBtn from '../../CustomButton/CustomButtonRefactor';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function AdminNavBar() {
  const { navigate } = useGlobalContext();
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
    <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
      <nav className={`justify-between flex items-center w-full px-4 `}>
        <Link to="/">
          <img
            src={Logo2}
            alt="Retour a l'accueil"
            className="max-w-32 lg:max-w-40 block md:hidden"
          />

          <img
            src={Logo1}
            alt="Retour a l'accueil"
            className="max-w-32 lg:max-w-40 hidden md:block"
          />
        </Link>

        <div className={`flex items-center`}>
          {isAdminAuthenticated && (
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Déconnexion',
                style: 'nav',
                icon: 'logout',
                onClick: () => {
                  handleAdminLogout();
                },
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
