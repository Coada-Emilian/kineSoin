import { Link } from 'react-router-dom';
import Logo1 from '/logos/kinesoin-logo.webp';
import Logo2 from '/logos/kinesoin-logo-2.webp';
import LogoutIcon from '/icons/logout.png';
import Button from '../../../standaloneComponents/Button/CustomButton';

interface AdminNavBarProps {
  windowWidth: number;
}

export default function AdminNavBar({ windowWidth }: AdminNavBarProps) {
  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav className="flex justify-between items-center w-full px-3">
        <Link to="#">
          <img
            src={windowWidth < 768 ? Logo2 : Logo1}
            alt="Retour a l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div>
          {windowWidth < 768 ? (
            <Link to="#">
              <img src={LogoutIcon} alt="Se déconnecter" className="w-6 mr-3" />
            </Link>
          ) : (
            <Button btnText="Se déconnecter" normalBtn />
          )}
        </div>
      </nav>
    </header>
  );
}
