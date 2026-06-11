import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectionModal from '../../standalone/ConnectionModal';
import CustomButton from '../../standalone/CustomButton';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function PublicNavbar() {
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const handleConnectionClick = () => {
    setIsConnectionModalOpen(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
        <nav className="justify-center md:justify-between flex items-center w-full px-4">
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

          <div className="hidden md:flex md:items-center">
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
                  to: '/registerPatient',
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
