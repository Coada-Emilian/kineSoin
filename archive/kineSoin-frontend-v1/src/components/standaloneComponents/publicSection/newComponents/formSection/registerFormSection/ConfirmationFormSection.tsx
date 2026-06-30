import { Link } from 'react-router-dom';

export default function ConfirmationFormSection() {
  return (
    <div className="text-base">
      <p className="mb-4 indent-4">
        Votre inscription a bien été enregistrée !
      </p>

      <p className="mb-4 indent-4">
        Merci de vous être inscrit sur KineSoin. Votre compte est en cours de
        validation et sera activé prochainement. Vous recevrez une confirmation
        dès son activation.
      </p>

      <p className="indent-4">
        <Link to="/" className="font-bold text-primaryRed">
          Retour à l'accueil
        </Link>
      </p>
    </div>
  );
}
