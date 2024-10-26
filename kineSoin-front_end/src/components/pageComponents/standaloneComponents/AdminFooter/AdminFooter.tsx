/**
 * @file AdminFooter.tsx
 * @description A React functional component that renders the footer for the admin section
 * of the KineSoin application. The footer displays the current year and a copyright notice.
 *
 * @returns {JSX.Element} The rendered AdminFooter component, which includes the copyright
 * information styled as a footer.
 */

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primaryBlue text-white text-center py-4 md:py-2">
      <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
    </footer>
  );
}
