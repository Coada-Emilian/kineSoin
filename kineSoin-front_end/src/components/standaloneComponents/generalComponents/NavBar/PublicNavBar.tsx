import { Link } from 'react-router-dom';

import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import CustomButton from '../CustomButton/CustomButton';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext';
import CustomBtn from '../CustomButton/CustomButtonRefactor';

export default function PublicNavBar() {
  const { setFormOrder } = usePatientRegisterContext();

  return (
    <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
      <nav className="justify-center md:justify-between flex items-center w-full px-4">
        <Link
          to="/"
          onClick={() => {
            setFormOrder('first');
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

        <div className="hidden md:flex md:items-center">
          <div className="flex gap-2">
            <Link to="/loginTherapist" className="hidden md:block">
              <CustomBtn
                btn={{
                  type: 'basicBtn',
                  text: 'Connexion thérapeute',
                  style: 'nav',
                  onClick: () => {
                    setFormOrder('first');
                  },
                }}
              />
            </Link>

            <Link to="/loginPatient" className="hidden md:block">
              <CustomBtn
                btn={{
                  type: 'basicBtn',
                  text: 'Connexion patient',
                  style: 'nav',
                  onClick: () => {
                    setFormOrder('first');
                  },
                }}
              />
            </Link>

            <Link to="/loginAdmin" className="hidden md:block">
              <CustomBtn
                btn={{
                  type: 'basicBtn',
                  text: 'Connexion admin',
                  style: 'nav',
                  onClick: () => {
                    setFormOrder('first');
                  },
                }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
