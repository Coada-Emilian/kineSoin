export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primaryBlue text-white text-center py-4">
      <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
    </footer>
  );
}
