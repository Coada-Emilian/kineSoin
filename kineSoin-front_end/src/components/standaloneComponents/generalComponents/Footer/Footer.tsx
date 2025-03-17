/**
 * @component Footer
 *
 * This component renders the footer for the public-facing pages. It includes:
 * - Assistance contact details, such as email and phone number for users to reach out for support.
 * - A copyright notice displaying the current year and the company name.
 * - A list of footer links to important pages such as privacy policy, terms and conditions, and guidelines.
 *
 * The component is styled with responsive design in mind, ensuring proper layout on both mobile and desktop views.
 *
 * @returns {JSX.Element} The footer section of the page containing contact details, copyright notice, and useful links.
 *
 * @example
 * <Footer />
 */

export default function Footer() {
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
  );
}
