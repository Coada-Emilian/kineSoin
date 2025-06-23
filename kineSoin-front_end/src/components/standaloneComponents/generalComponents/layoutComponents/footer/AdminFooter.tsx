/**
 * AdminFooter.tsx
 *
 * Footer component for the admin section.
 *
 * Features:
 * - Displays the current year and a copyright notice
 * - Styled with a primary blue background and centered white text
 *
 * Styling:
 * - Responsive vertical padding (`py-4` on mobile, `py-2` on medium+ screens)
 * - Center-aligned text with consistent branding
 */

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryBlue py-4 text-center text-white md:py-2">
      <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
    </footer>
  );
}
