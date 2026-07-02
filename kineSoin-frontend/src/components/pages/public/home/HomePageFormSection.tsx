import { Link } from 'react-router-dom';

export default function HomePageFormSection() {
  return (
    <section className="bg-[url('/images/homepage_main_photo.webp')] md:p-96 bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative shadow-2xl">
      <div className=" opacity-75 md:absolute md:top-32 md:left-16 md:text-base lg:text-lg lg:left-20 lg:w-2/4 xl:top-32 xl:text-xl 2xl:top-52 2xl:text-2xl font-normal text-sm h-fit my-auto w-10/12 md:w-2/3 text-primaryBlue bg-linear-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <div className="indent-4">
          <p className="mb-2">
            Bienvenue sur <span className="font-bold">kineSoin</span> !
          </p>

          <p className="mb-2">
            Votre espace dédié à la kinésithérapie et à votre bien-être. Prenez
            soin de votre santé en toute simplicité en prenant rendez-vous avec
            nos professionnels qualifiés.
          </p>

          <p className="mb-2">
            Inscrivez-vous dès maintenant pour accéder à tous nos services
            personnalisés et planifier vos séances en ligne.
          </p>

          <p>
            <Link to="/registerPatient" className="font-bold text-primaryRed">
              Inscrivez-vous ici !
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
