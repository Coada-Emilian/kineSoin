import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../ui/buttons/CustomButton';
import NavbarLogo from '../../ui/logos/navbarLogo';
import ConnectionModal from '../../ui/modals/ConnectionModal';

export default function PublicNavbar() {
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleConnectionClick = () => {
    setIsConnectionModalOpen(true);
  };

  const handleInscriptionClick = () => {
    setIsConnectionModalOpen(false);
    navigate('/registerPatient');
  };

  const handleLogoClick = () => {
    setIsConnectionModalOpen(false);
  };

  return (
    <>
      <header className="bg-white/60 backdrop-blur-md bg-opacity-70 sticky top-0 w-full py-1 z-10">
        <nav className="justify-center md:justify-between flex items-center w-full px-4">
          <NavbarLogo onClick={handleLogoClick} />

          <div className="hidden md:flex md:items-center ">
            <div className="flex gap-2">
              <CustomButton
                btn={{
                  type: 'basic',
                  text: 'Connexion',
                  style: 'nav',
                  onClick: handleConnectionClick,
                }}
              />

              <CustomButton
                btn={{
                  type: 'basic',
                  text: 'Inscription',
                  style: 'nav',

                  onClick: handleInscriptionClick,
                }}
              />
            </div>
          </div>
        </nav>
      </header>

      {isConnectionModalOpen && (
        <ConnectionModal
          isOpen={isConnectionModalOpen}
          onClose={() => setIsConnectionModalOpen(false)}
        />
      )}
    </>
  );
}
