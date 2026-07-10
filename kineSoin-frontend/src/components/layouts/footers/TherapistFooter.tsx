export default function TherapistFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryBlue py-4 text-center text-white w-full text-xs md:text-base md:py-2">
      <div
        className="flex flex-col items-center justify-between gap-3 text-center text-sm md:flex-row md:justify-center
       "
      >
        <p>© {currentYear} KineSoin. Tous droits réservés.</p>

        <div className="flex items-center gap-4">
          <button className="transition-colors hover:text-teal-700">
            Support
          </button>

          <span className="text-white">•</span>

          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
