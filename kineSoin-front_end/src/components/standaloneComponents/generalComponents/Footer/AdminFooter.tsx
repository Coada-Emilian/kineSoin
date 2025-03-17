/**
 * @component AdminFooter
 *
 * This component represents the footer section for the admin interface. It displays:
 * - A copyright message indicating the current year, followed by the name of the platform ("KineSoin") and the statement "Tous droits réservés."
 *
 * The footer has a background color of `primaryBlue`, with white text centered both horizontally and vertically.
 *
 * @returns {JSX.Element} The footer structure for the admin, including the copyright information.
 *
 * @example
 * <AdminFooter />
 */

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primaryBlue text-white text-center py-4 md:py-2">
      <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
    </footer>
  );
}
