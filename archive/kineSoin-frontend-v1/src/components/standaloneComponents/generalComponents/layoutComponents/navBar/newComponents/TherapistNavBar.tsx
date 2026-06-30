import { Link } from 'react-router-dom';
import { removeTherapistTokenFromLocalStorage } from '../../../../../../localStorage/therapistLocalStorage';
import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import CustomBtn from '../../../customButton/newComponents/CustomButtonRefactor';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function TherapistNavBar() {
  const { navigate } = useGlobalContext();

  const {
    isTherapistAuthenticated,
    setIsTherapistAuthenticated,
    setTherapistProfileToken,
  } = useAuthentificationContext();

  const handleTherapistLogout = () => {
    removeTherapistTokenFromLocalStorage();
    setIsTherapistAuthenticated(false);
    setTherapistProfileToken(null);
    navigate('/loginTherapist');
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
          {isTherapistAuthenticated && (
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Déconnexion',
                style: 'nav',
                icon: 'logout',
                onClick: handleTherapistLogout,
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
