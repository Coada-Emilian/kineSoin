import { Link } from 'react-router-dom';

import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import CustomButton from '../CustomButton/CustomButton';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext';

export default function PublicNavBar() {
  const {
    isFirstFormValidated,
    isSecondFormValidated,
    isThirdFormValidated,
    setIsFirstFormValidated,
    setIsSecondFormValidated,
    setIsThirdFormValidated,
    setIsRegisterPageRendered,
  } = usePatientRegisterContext();

  const onClickFunction = () => {
    isFirstFormValidated
      ? (setIsFirstFormValidated(false),
        console.log('first form set to false'),
        setIsRegisterPageRendered(false))
      : isSecondFormValidated
        ? (setIsSecondFormValidated(false),
          console.log('second form set to false'),
          setIsRegisterPageRendered(false))
        : isThirdFormValidated
          ? (setIsThirdFormValidated(false),
            console.log('third form set to false'),
            setIsRegisterPageRendered(false))
          : undefined;
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
