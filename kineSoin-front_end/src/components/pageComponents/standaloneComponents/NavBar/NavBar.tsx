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
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import LogoutIcon from '/icons/logout.png';
import Button from '../../../standaloneComponents/Button/CustomButton';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface NavBarProps {
  windowWidth: number;
  isAdminNavBar?: boolean;
  isAdminAuthenticated?: boolean;
  isPublicNavBar?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({
  windowWidth,
  isAdminNavBar,
  isAdminAuthenticated,
  isPublicNavBar,
  setIsAdminAuthenticated,
  setIsRegisterPageRendered,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
}: NavBarProps) {
  // Function to handle the admin logout
  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }
    window.location.href = '/loginAdmin';
  };

  return (
    <header className="bg-white bg-opacity-90 sticky top-0 w-full py-1 z-10">
      <nav
        className={`flex ${isPublicNavBar ? 'justify-center md:justify-between' : 'justify-between'} items-center w-full px-4 `}
      >
        <Link
          to="/"
          onClick={() => {
            if (setIsRegisterPageRendered) {
              setIsRegisterPageRendered(false);
              if (setIsFirstFormValidated) {
                setIsFirstFormValidated(false);
              }
              if (setIsSecondFormValidated) {
                setIsSecondFormValidated(false);
              }
              if (setIsThirdFormValidated) {
                setIsThirdFormValidated(false);
              }
            }
          }}
        >
          <img
            src={windowWidth < 768 ? Logo2 : Logo1}
            alt="Retour a l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div className={`${isPublicNavBar && 'hidden md:block'}`}>
          {isAdminNavBar &&
            isAdminAuthenticated &&
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
              <Link
                to="/loginTherapist"
                className="hidden md:block"
                onClick={() => {
                  if (setIsRegisterPageRendered) {
                    setIsRegisterPageRendered(false);
                    if (setIsFirstFormValidated) {
                      setIsFirstFormValidated(false);
                    }
                    if (setIsSecondFormValidated) {
                      setIsSecondFormValidated(false);
                    }
                    if (setIsThirdFormValidated) {
                      setIsThirdFormValidated(false);
                    }
                  }
                }}
              >
                <CustomButton
                  btnText={<>Connexion thérapeute</>}
                  navBarButton
                />
              </Link>

              <Link
                to="/loginPatient"
                className="hidden md:block"
                onClick={() => {
                  if (setIsRegisterPageRendered) {
                    setIsRegisterPageRendered(false);
                    if (setIsFirstFormValidated) {
                      setIsFirstFormValidated(false);
                    }
                    if (setIsSecondFormValidated) {
                      setIsSecondFormValidated(false);
                    }
                    if (setIsThirdFormValidated) {
                      setIsThirdFormValidated(false);
                    }
                  }
                }}
              >
                <CustomButton btnText={<>Connexion patient</>} navBarButton />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
