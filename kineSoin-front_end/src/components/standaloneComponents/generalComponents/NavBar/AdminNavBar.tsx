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
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext';
import { useAuthentificationContext } from '../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';

export default function NavBar() {
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
