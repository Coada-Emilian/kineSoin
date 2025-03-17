/**
 * @component PublicNavBar
 *
 * This component renders the navigation bar for the public-facing pages. It contains:
 * - The logo that navigates back to the homepage. Two logos are used for mobile and desktop views.
 * - Links for therapist, patient, and admin logins, each rendered with a custom button (`CustomBtn`).
 * - The `setFormOrder` function from the `PatientRegisterContext` is used to reset the form order whenever any of the navigation links is clicked.
 *
 * The layout adapts for mobile and desktop views, with the mobile version showing a simplified navigation and the desktop version showing additional options.
 *
 * @returns {JSX.Element} The public navigation bar with logo and login options.
 *
 * @example
 * <PublicNavBar />
 */

import { Link } from 'react-router-dom';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext';
import CustomBtn from '../CustomButton/CustomButtonRefactor';

export default function PublicNavBar() {
  // Get the setFormOrder function from the PatientRegisterContext
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
                  type: 'basic',
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
                  type: 'basic',
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
                  type: 'basic',
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
