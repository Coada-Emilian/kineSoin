import { Link } from 'react-router-dom';

interface ErrorPageProps {
  isConnectedAdminErrorPage?: boolean;
  isUnconnectedAdminErrorPage?: boolean;
  isPublicErrorPage?: boolean;
  isConnectedPatientErrorPage?: boolean;
  isUnconnectedPatientErrorPage?: boolean;
  isUnconnectedTherapistErrorPage?: boolean;
  isConnectedTherapistErrorPage?: boolean;
}

export default function ErrorPage({
  isPublicErrorPage,
  isConnectedAdminErrorPage,
  isUnconnectedAdminErrorPage,
  isConnectedPatientErrorPage,
  isUnconnectedPatientErrorPage,
  isUnconnectedTherapistErrorPage,
  isConnectedTherapistErrorPage,
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
              : isConnectedTherapistErrorPage
                ? '/therapist/dashboard'
                : isUnconnectedTherapistErrorPage
                  ? '/public/loginTherapist'
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
              : isConnectedTherapistErrorPage
                ? 'Retour au Tableau de Bord'
                : isUnconnectedTherapistErrorPage
                  ? 'Retour à la Page de Connexion'
                  : '';
  };

  const getErrorText = () => {
    if (
      isUnconnectedAdminErrorPage ||
      isUnconnectedPatientErrorPage ||
      isUnconnectedTherapistErrorPage
    ) {
      return 'Accès refusé. Vous devez être connecté pour accéder à cette page.';
    }
    return "Page Introuvable. La page que vous recherchez n'existe pas ou a été déplacée.";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {isUnconnectedAdminErrorPage ||
        isUnconnectedPatientErrorPage ||
        isUnconnectedTherapistErrorPage
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
