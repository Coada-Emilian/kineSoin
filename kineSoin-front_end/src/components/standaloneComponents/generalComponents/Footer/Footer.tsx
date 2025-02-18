/**
 * @file Footer.tsx
 * @description A React functional component that renders the footer for the admin section
 * of the KineSoin application. The footer displays the current year and a copyright notice.
 *
 * @returns {JSX.Element} The rendered Footer component, which includes the copyright
 * information styled as a footer.
 */

interface FooterProps {
  isAdminFooter?: boolean;
}

export default function Footer({ isAdminFooter }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      text: 'Signaler une problème',
      href: '/signal',
    },
    {
      text: 'Politique de confidentialité',
      href: '/confidentiality',
    },
    {
      text: 'Conditions générales',
      href: '/conditions',
    },
    {
      text: 'Règles de communauté',
      href: '/guidelines',
    },
    {
      text: 'Charte d’utilisation des cookies',
      href: '/cookies',
    },
  ];
  return (
    <>
      {isAdminFooter ? (
        <footer className="bg-primaryBlue text-white text-center py-4 md:py-2">
          <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
        </footer>
      ) : (
        <footer className=" p-4 flex flex-col font-semibold lg:justify-between items-center rounded-lg w-full mx-auto text-secondaryBlue text-xs md:text-sm lg:text-base mb-4 md:pb-4 static bottom-0">
          <div className="footer-assistance_container text-center mb-2">
            <p>
              Pour toute question ou assistance, veuillez nous contacter à
              l&apos;adresse suivante :{' '}
              <a href="mailto:support@kineSoin.fr">support@kineSoin.fr</a> ou
              nous appeler au{' '}
              <a href="tel:+330123456789">+33 (0)1 23 45 67 89</a>.
            </p>
          </div>

          <div className="footer-copyright_container text-center mb-2">
            <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
          </div>

          <div className="footer-links_container flex justify-center w-full">
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
              {footerLinks.map((link) => (
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
      )}
    </>
  );
}
