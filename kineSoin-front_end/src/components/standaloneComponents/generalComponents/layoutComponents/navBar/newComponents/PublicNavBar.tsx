import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';
import CustomBtn from '../../../customButton/newComponents/CustomButtonRefactor';
import ConnectionModal from '../../../modals/imageModal/newComponents/ConnectionModal';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function PublicNavBar() {
 

  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const handleClick = () => {
    setIsConnectionModalOpen(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
        <nav className="justify-center md:justify-between flex items-center w-full px-4">
          <Link to="/" onClick={handleClick}>
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
              <CustomBtn
                btn={{
                  type: 'basic',
                  text: 'Connexion',
                  style: 'nav',
                  onClick: handleClick,
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
