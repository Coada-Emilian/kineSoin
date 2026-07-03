import { useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../hooks/context/useAuthentificationContext';
import { removeTherapistTokenFromLocalStorage } from '../../../utils/localStorage/therapistLocalStorage';
import CustomButton from '../../ui/buttons/CustomButton';
import NavbarLogo from '../../ui/logos/navbarLogo';

export default function TherapistNavbar() {
  const navigate = useNavigate();

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
    <header className="bg-white/60 backdrop-blur-md bg-opacity-70 sticky top-0 w-full py-1">
      <nav className="justify-between flex items-center w-full px-4">
        <NavbarLogo />

        <div className="md:flex md:items-center">
          {isTherapistAuthenticated && (
            <CustomButton
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
