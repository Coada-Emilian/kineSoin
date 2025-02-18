import { Link } from 'react-router-dom';

interface ErrorPageProps {
  isAdminAuthenticated?: boolean;
  isConnectedAdminErrorPage?: boolean;
  isUnconnectedAdminErrorPage?: boolean;
  isPublicErrorPage?: boolean;
  isConnectedPatientErrorPage?: boolean;
  isUnconnectedPatientErrorPage?: boolean;
}

export default function ErrorPage({
  isAdminAuthenticated,
  isPublicErrorPage,
  isConnectedAdminErrorPage,
  isUnconnectedAdminErrorPage,
  isConnectedPatientErrorPage,
  isUnconnectedPatientErrorPage,
}: ErrorPageProps) {
  const getLinkDestination = () => {
    return isConnectedAdminErrorPage
      ? '/admin/therapists'
      : isUnconnectedAdminErrorPage
        ? '/loginAdmin'
        : isPublicErrorPage
          ? '/public/home'
          : isConnectedPatientErrorPage
            ? '/patient/dashboard'
            : isUnconnectedPatientErrorPage
              ? '/public/loginPatient'
              : undefined;
  };

  const getLinkText = () => {
    return isConnectedAdminErrorPage
      ? 'Retour au Tableau de Bord'
      : isUnconnectedAdminErrorPage
        ? 'Retour à la Page de Connexion'
        : isPublicErrorPage
          ? "Retour à l'Accueil"
          : isConnectedPatientErrorPage
            ? 'Retour au Tableau de Bord'
            : isUnconnectedPatientErrorPage
              ? 'Retour à la Page de Connexion'
              : '';
  };

  const getErrorText = () => {
    if (isUnconnectedAdminErrorPage || isUnconnectedPatientErrorPage) {
      return 'Accès refusé. Vous devez être connecté pour accéder à cette page.';
    }
    return "Page Introuvable. La page que vous recherchez n'existe pas ou a été déplacée.";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {isUnconnectedAdminErrorPage || isUnconnectedPatientErrorPage
          ? '403'
          : '404'}
      </h1>
      <p className="text-2xl text-gray-800 mb-6">{getErrorText()}</p>
      <Link
        to={getLinkDestination() || '/'}
        className="bg-primaryBlue hover:bg-secondaryBlue text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        {getLinkText()}
      </Link>
    </div>
  );
}
