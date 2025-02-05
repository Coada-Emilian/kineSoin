// Purpose: The purpose of this component is to render the navigation bar of the website.
// The navigation bar is responsive and changes its layout depending on the screen size.
// The navigation bar is used in the public pages, the admin pages and the patient pages.
// The navigation bar is used to navigate between the different pages of the website. The navigation bar is also used to log in and log out of the website.

import { Link } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';
import { removePatientTokenFromLocalStorage } from '../../../../localStorage/patientLocalStorage';

interface NavBarProps {
  windowWidth: number;
  isAdminNavBar?: boolean;
  isAdminAuthenticated?: boolean;
  isPublicNavBar?: boolean;
  isPatientNavBar?: boolean;
  isPatientAuthenticated?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({
  windowWidth,
  isAdminNavBar,
  isAdminAuthenticated,
  isPublicNavBar,
  isPatientNavBar,
  isPatientAuthenticated,
  setIsAdminAuthenticated,
  setIsRegisterPageRendered,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsPatientAuthenticated,
}: NavBarProps) {
  // Function to handle the admin logout
  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }
    window.location.href = '/loginAdmin';
  };

  // Function to handle the patient logout
  const handlePatientLogout = () => {
    removePatientTokenFromLocalStorage();
    if (setIsPatientAuthenticated) {
      setIsPatientAuthenticated(false);
    }
    window.location.href = '/public/loginPatient';
  };

  // State to manage the patient notification quantity
  const [patientNotificationQuantity, setPatientNotificationQuantity] =
    useState(0);

  return (
    <header
      className={`bg-gradient-to-r from-white to-gray-300 bg-opacity-70 sticky top-0 w-full py-1 z-10`}
    >
      <nav
        className={`flex ${isPublicNavBar ? 'justify-center md:justify-between' : 'justify-between'} items-center w-full px-4 `}
      >
        <Link
          to="/public/home"
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

        <div
          className={`${isPublicNavBar && 'hidden md:block'} flex items-center`}
        >
          {/* Public navbar portion */}
          {isPublicNavBar && (
            <div className="flex gap-2">
              <Link
                to="/public/loginTherapist"
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
                to="/public/loginPatient"
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

          {/* Admin navbar portion */}
          {isAdminNavBar &&
            isAdminAuthenticated &&
            (windowWidth < 768 ? (
              <>
                <CustomButton adminLogoutButton onClick={handleAdminLogout} />
              </>
            ) : (
              <CustomButton
                btnText={<>Se déconnecter</>}
                navBarButton
                onClick={handleAdminLogout}
              />
            ))}

          {/* Patient navbar portion */}
          {isPatientNavBar && isPatientAuthenticated && (
            <div className="flex gap-2">
              <Link to="#">
                <CustomButton
                  btnText={<>Notifications</>}
                  patientNotificationButton
                  patientNotificationQuantity={patientNotificationQuantity}
                  setPatientNotificationQuantity={
                    setPatientNotificationQuantity
                  }
                />
              </Link>

              <Link to="/loginPatient" onClick={handlePatientLogout}>
                <CustomButton btnText={<>Déconnexion</>} patientLogoutButton />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
