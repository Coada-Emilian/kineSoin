import { Link } from 'react-router-dom';
import { publicNavbarButtonDetails } from '../../../../../../utils/constants/publicSection/standalone_components/publicNavbarButtonDetails';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';
import CustomBtn from '../../../customButton/newComponents/CustomButtonRefactor';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import Logo1 from '/logos/kinesoin-logo.webp';

export default function PublicNavBar() {
  const { setFormOrder } = usePatientRegisterContext();

  const handleClick = () => {
    setFormOrder('first');
  };

  const details = publicNavbarButtonDetails;

  return (
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
            {details.map((button, index) => (
              <Link
                key={index}
                to={button.to}
                onClick={handleClick}
                className="hidden md:block"
              >
                <CustomBtn
                  btn={{
                    type: 'basic',
                    text: button.text,
                    style: 'nav',
                    onClick: handleClick,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
