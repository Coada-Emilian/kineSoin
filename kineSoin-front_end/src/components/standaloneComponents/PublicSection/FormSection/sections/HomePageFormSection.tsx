import { Link } from 'react-router-dom';

export default function HomePageFormSection() {
  return (
    <div className="indent-4">
      <p className="mb-2">
        Bienvenue sur <span className="font-bold">kineSoin</span> !
      </p>

      <p className="mb-2">
        Votre espace dédié à la kinésithérapie et à votre bien-être. Prenez soin
        de votre santé en toute simplicité en prenant rendez-vous avec nos
        professionnels qualifiés.
      </p>

      <p className="mb-2">
        Inscrivez-vous dès maintenant pour accéder à tous nos services
        personnalisés et planifier vos séances en ligne.
      </p>

      <p>
        <Link to="/registerPatient" className="font-bold text-primaryRed">
          Inscrivez-vous ici !
        </Link>{' '}
      </p>
    </div>
  );
}
