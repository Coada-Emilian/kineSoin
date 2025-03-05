// Purpose: The purpose of this component is to render the navigation bar of the website.
// The navigation bar is responsive and changes its layout depending on the screen size.
// The navigation bar is used in the public pages, the admin pages and the patient pages.
// The navigation bar is used to navigate between the different pages of the website. The navigation bar is also used to log in and log out of the website.

import { Link, useNavigate } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import CustomButton from '../CustomButton/CustomButton';
import { useState } from 'react';
import { removePatientTokenFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { removeTherapistTokenFromLocalStorage } from '../../../../localStorage/therapistLocalStorage';

interface NavBarProps {
  isAdminNavBar?: boolean;
  isAdminAuthenticated?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;

  isPublicNavBar?: boolean;

  isPatientNavBar?: boolean;
  isPatientAuthenticated?: boolean;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  isTherapistNavBar?: boolean;
  isTherapistAuthenticated?: boolean;
  setIsTherapistAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({
  isAdminNavBar,
  isAdminAuthenticated,
  setAdminProfileToken,

  isPublicNavBar,

  isPatientNavBar,
  isPatientAuthenticated,
  setIsAdminAuthenticated,
  setIsRegisterPageRendered,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsPatientAuthenticated,

  isTherapistNavBar,
  setIsTherapistAuthenticated,
  isTherapistAuthenticated,
}: NavBarProps) {
  const navigate = useNavigate();
  // Function to handle the admin logout
  const handleAdminLogout = () => {
    removeAdminTokenFromLocalStorage();
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }
    if (setAdminProfileToken) {
      setAdminProfileToken(null);
    }
    navigate('/loginAdmin');
  };

  // Function to handle the patient logout
  const handlePatientLogout = () => {
    removePatientTokenFromLocalStorage();
    if (setIsPatientAuthenticated) {
      setIsPatientAuthenticated(false);
    }
    navigate('/loginPatient');
  };

  // function to handle the therapist logout
  const handleTherapistLogout = () => {
    if (setIsTherapistAuthenticated) {
      setIsTherapistAuthenticated(false);
    }
    removeTherapistTokenFromLocalStorage();
    navigate('/loginTherapist');
  };

  const onClickFunction = () => {
    setIsRegisterPageRendered &&
      (setIsFirstFormValidated
        ? setIsFirstFormValidated(false)
        : setIsSecondFormValidated
          ? setIsSecondFormValidated(false)
          : setIsThirdFormValidated
            ? setIsThirdFormValidated(false)
            : undefined);
  };
  // State to manage the patient notification quantity
  const [patientNotificationQuantity, setPatientNotificationQuantity] =
    useState(0);

  const [therapistNotificationQuantity, setTherapistNotificationQuantity] =
    useState(0);

  return (
    <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
      <nav
        className={`${isPublicNavBar ? 'justify-center md:justify-between' : 'justify-between'} flex items-center w-full px-4 `}
      >
        <Link
          to="/"
          onClick={() => {
            onClickFunction();
          }}
        >
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

        <div
          className={`${isPublicNavBar && 'hidden md:block'} flex items-center`}
        >
          {/* Public navbar portion */}
          {isPublicNavBar && (
            <div className="flex gap-2">
              <Link
                to="/loginTherapist"
                className="hidden md:block"
                onClick={() => {
                  onClickFunction();
                }}
              >
                <CustomButton btnText="Connexion thérapeute" navBarButton />
              </Link>

              <Link
                to="/loginPatient"
                className="hidden md:block"
                onClick={() => {
                  onClickFunction();
                }}
              >
                <CustomButton btnText="Connexion patient" navBarButton />
              </Link>

              <Link
                to="/loginAdmin"
                className="hidden md:block"
                onClick={() => {
                  onClickFunction();
                }}
              >
                {' '}
                <CustomButton btnText="Connexion admin" navBarButton />
              </Link>
            </div>
          )}

          {/* Admin navbar portion */}
          {isAdminNavBar && isAdminAuthenticated && (
            <>
              <CustomButton adminLogoutButton onClick={handleAdminLogout} />

              <CustomButton
                btnText="Se déconnecter"
                navBarButton
                onClick={handleAdminLogout}
              />
            </>
          )}

          {/* Patient navbar portion */}
          {(isPatientNavBar && isPatientAuthenticated) ||
          (isTherapistNavBar && isTherapistAuthenticated) ? (
            <div className="flex gap-2">
              {isPatientNavBar && isPatientAuthenticated && (
                <>
                  <CustomButton
                    btnText="Notifications"
                    patientNotificationButton
                    patientNotificationQuantity={patientNotificationQuantity}
                    setPatientNotificationQuantity={
                      setPatientNotificationQuantity
                    }
                  />

                  <CustomButton
                    btnText="Déconnexion"
                    patientLogoutButton
                    onClick={handlePatientLogout}
                  />
                </>
              )}

              {isTherapistNavBar && isTherapistAuthenticated && (
                <>
                  <CustomButton
                    btnText="Notifications"
                    therapistNotificationButton
                    therapistNotificationQuantity={
                      therapistNotificationQuantity
                    }
                    setTherapistNotificationQuantity={
                      setTherapistNotificationQuantity
                    }
                  />

                  <CustomButton
                    btnText="Déconnexion"
                    therapistLogoutButton
                    onClick={handleTherapistLogout}
                  />
                </>
              )}
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
