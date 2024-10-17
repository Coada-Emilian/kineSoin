import { Link } from 'react-router-dom';
import Logo from '/logos/kinesoin-logo.webp';
import Button from '../Button/Button';

interface AdminNavBarProps {
  isAdminAuthenticated: boolean;
}

export default function AdminNavBar({
  isAdminAuthenticated,
}: AdminNavBarProps) {
  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav className="flex justify-center md:justify-between items-center w-full px-3">
        <Link to="#">
          <img
            src={Logo}
            alt="Retour a l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div>
          {isAdminAuthenticated ? (
            <Button btnText="Se déconnecter" normalBtn />
          ) : (
            <Button btnText="Se connecter" normalBtn />
          )}
        </div>
      </nav>
    </header>
  );
}
