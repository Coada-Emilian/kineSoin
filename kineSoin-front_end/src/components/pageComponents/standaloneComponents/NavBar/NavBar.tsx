/**
 * @file AdminNavBar.tsx
 * @description A React functional component that renders a navigation bar for the admin section
 * of the KineSoin application. The navigation bar includes a logo that changes based on the
 * window width and a logout button for the admin user.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to determine the
 * appropriate logo and layout.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsAdminAuthenticated - A state
 * setter function to update the authentication status of the admin user upon logout.
 *
 * @returns {JSX.Element} The rendered AdminNavBar component, including the logo and logout button.
 */

import { Link } from 'react-router-dom';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import LogoutIcon from '/icons/logout.png';
import Button from '../../../standaloneComponents/Button/CustomButton';
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface NavBarProps {
  windowWidth: number;
  isAdminNavBar?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicNavBar?: boolean;
}

export default function NavBar({
  windowWidth,
  isAdminNavBar,
  setIsAdminAuthenticated,
  isPublicNavBar,
}: NavBarProps) {
  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }
    window.location.href = '/loginAdmin';
  };

  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav
        className={`flex ${isPublicNavBar ? 'justify-center md:justify-between' : 'justify-between'} items-center w-full px-3 `}
      >
        <Link to="/">
          <img
            src={windowWidth < 768 ? Logo2 : Logo1}
            alt="Retour a l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div className={`${isPublicNavBar && 'hidden md:block'}`}>
          {isAdminNavBar &&
            (windowWidth < 768 ? (
              <Link to="#" onClick={handleAdminLogout}>
                <img
                  src={LogoutIcon}
                  alt="Se déconnecter"
                  className="w-6 mr-3"
                />
              </Link>
            ) : (
              <Button
                btnText="Se déconnecter"
                normalButton
                onClick={handleAdminLogout}
              />
            ))}

          {isPublicNavBar && (
            <div className="flex gap-2">
              <Link to="/loginTherapist" className="hidden md:block">
                <CustomButton
                  btnText={<>Connexion thérapeute</>}
                  navBarButton
                />
              </Link>
              <Link to="/loginPatient" className="hidden md:block">
                <CustomButton btnText={<>Connexion patient</>} navBarButton />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
