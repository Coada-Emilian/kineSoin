import { Link } from 'react-router-dom';
import type { NavbarLogoProps } from '../../../@types/props/componentProps';

export default function NavbarLogo({ onClick }: NavbarLogoProps) {
  return (
    <Link to="/" onClick={onClick}>
      <img
        src="/logos/kineLogo2_160.webp"
        srcSet="/logos/kineLogo2_160.webp 160w, /logos/kineLogo2_320.webp 320w, /logos/kineLogo2_480.webp 480w"
        sizes="160px"
        alt="Retour a l'accueil"
        className="max-w-32 lg:max-w-40 block md:hidden"
      />

      <img
        src="/logos/kineLogo_160.webp"
        srcSet="/logos/kineLogo_160.webp 160w, /logos/kineLogo_320.webp 320w, /logos/kineLogo_480.webp 480w"
        sizes="160px"
        alt="Retour a l'accueil"
        className="max-w-40 lg:max-w-48 hidden md:block transition-transform duration-200 hover:scale-105"
      />
    </Link>
  );
}
