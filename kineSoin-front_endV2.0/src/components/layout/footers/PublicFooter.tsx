import { publicFooterLinkDetails } from '../../../utils/constants/publicFooterLinkDetails';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  const links = publicFooterLinkDetails;

  return (
    <footer className=" p-4 flex flex-col font-semibold lg:justify-between items-center rounded-lg w-full mx-auto text-secondaryBlue text-xs md:text-sm lg:text-base mb-4 md:pb-4 static bottom-0">
      <div className="footer-assistance_container text-center mb-2">
        <p>
          Pour toute question ou assistance, veuillez nous contacter à
          l&apos;adresse suivante :{' '}
          <a href="mailto:support@kineSoin.fr">support@kineSoin.fr</a> ou nous
          appeler au <a href="tel:+330123456789">+33 (0)1 23 45 67 89</a>.
        </p>
      </div>

      <div className="footer-copyright_container text-center mb-2">
        <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
      </div>

      <div className="footer-links_container flex justify-center w-full">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
          {links.map((link) => (
            <li key={link.text} className="list-none text-center">
              <a
                href={link.href}
                className="text-primaryText hover:underline"
                rel="nofollow"
              >
                {link.text}
              </a>{' '}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
