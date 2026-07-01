/**
 * AdminNavBar.tsx
 *
 * Top navigation bar for the admin section of the app.
 *
 * Features:
 * - Displays a responsive logo (different versions for mobile and desktop)
 * - Includes a logout button when the admin is authenticated
 * - Sticks to the top of the page (`sticky top-0`) with slight transparency
 *
 * Behavior:
 * - On logout: clears token from local storage and resets auth context
 *
 * Styling:
 * - Full-width bar with gradient background and padding
 * - Responsive image visibility using Tailwind’s breakpoint utilities
 */

import { Link } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../../../localStorage/adminLocalStorage';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import CustomBtn from '../../../customButton/newComponents/CustomButtonRefactor';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function AdminNavBar() {
  // Import navigation
  const { navigate } = useGlobalContext();

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
    <header className="sticky top-0 z-10 w-full py-1 bg-gradient-to-r from-white to-gray-200 bg-opacity-70">
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
            <CustomBtn
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
