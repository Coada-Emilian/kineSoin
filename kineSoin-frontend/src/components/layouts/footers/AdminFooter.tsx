export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryBlue py-4 text-center text-white w-full text-xs md:text-base md:py-2">
      <p>&copy; {currentYear} KineSoin. Tous droits réservés.</p>
    </footer>
  );
}
