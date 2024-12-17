/**
 * @file ErrorPage.tsx
 * @description A React component that displays a custom error page for a 404 Not Found error.
 * It informs the user that the requested page cannot be found and provides a link to return
 * to the admin dashboard.
 *
 * @returns {JSX.Element} The rendered ErrorPage component, including a title, message,
 * and a link for navigation back to the admin dashboard.
 */

import { Link } from 'react-router-dom';

interface ErrorPageProps {
  isAdminAuthenticated?: boolean;
}

export default function ErrorPage({ isAdminAuthenticated }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-6">Page Introuvable</p>
      <p className="text-lg text-gray-600 mb-8">
        Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to={isAdminAuthenticated ? '/admin/therapists' : '/loginAdmin'}
        className="bg-primaryBlue hover:bg-secondaryBlue text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        {isAdminAuthenticated
          ? 'Retour au Tableau de Bord Admin'
          : 'Retour à la Page de Connexion'}
      </Link>
    </div>
  );
}
