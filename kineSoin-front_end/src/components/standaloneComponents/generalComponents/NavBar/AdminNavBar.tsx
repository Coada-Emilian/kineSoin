// Purpose: The purpose of this component is to render the navigation bar of the website.
// The navigation bar is responsive and changes its layout depending on the screen size.
// The navigation bar is used in the public pages, the admin pages and the patient pages.
// The navigation bar is used to navigate between the different pages of the website. The navigation bar is also used to log in and log out of the website.

import { Link } from 'react-router-dom';
import { removeAdminTokenFromLocalStorage } from '../../../../localStorage/adminLocalStorage';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext';
import { useAuthentificationContext } from '../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import CustomBtn from '../CustomButton/CustomButtonRefactor';

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
                btnType: 'basicBtn',
                btnText: 'Déconnexion',
                isNavBtn: true,
                isLogoutBtn: true,
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
