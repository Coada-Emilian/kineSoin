import { Link } from 'react-router-dom';

import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import CustomButton from '../CustomButton/CustomButton';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext';

export default function PublicNavBar() {
  const { setFormOrder } = usePatientRegisterContext();

  const onClickFunction = () => {
    setFormOrder('first');
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-200 bg-opacity-70 sticky top-0 w-full py-1 z-10">
      <nav className="justify-center md:justify-between flex items-center w-full px-4">
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

        <div className="hidden md:flex md:items-center">
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
              <CustomButton btnText="Connexion admin" navBarButton />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
