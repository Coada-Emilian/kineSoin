// Purpose: The purpose of this component is to render the navigation bar of the website.
// The navigation bar is responsive and changes its layout depending on the screen size.
// The navigation bar is used in the public pages, the admin pages and the patient pages.
// The navigation bar is used to navigate between the different pages of the website. The navigation bar is also used to log in and log out of the website.

import { Link } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import LogoutIcon from '/icons/logout.png';
import Button from '../../../standaloneComponents/Button/CustomButton';
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

  const handlePatientLogout = () => {
    removePatientTokenFromLocalStorage();
    if (setIsPatientAuthenticated) {
      setIsPatientAuthenticated(false);
    }
    window.location.href = '/loginPatient';
  };

  // State to manage the patient notification quantity
  const [patientNotificationQuantity, setPatientNotificationQuantity] =
    useState(0);

  return (
    <header className="bg-white bg-opacity-70 sticky top-0 w-full py-1 z-10">
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
              <CustomButton
                btnText={<>Se déconnecter</>}
                navBarButton
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

          {isPatientNavBar && (
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
