import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-6">Page Introuvable</p>
      <p className="text-lg text-gray-600 mb-8">
        Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/admin/therapists"
        className="bg-primaryBlue hover:bg-secondaryBlue text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        Retour au Tableau de Bord Admin
      </Link>
    </div>
  );
}
