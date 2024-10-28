import { Link } from 'react-router-dom';

export default function FormSection() {
  return (
    <section className="bg-homePage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-screen md:relative">
      {' '}
      <div className=" font-normal text-sm h-fit my-auto lg:text-base xl:text-xl w-10/12 md:w-1/3 text-primaryBlue bg-white p-6 rounded-3xl opacity-75 md:absolute md:top-32 md:left-16 lg:left-20 xl:top-16 italic">
        {' '}
        <p className="mb-2">Bienvenue sur kineSoin !</p>
        <p className="mb-2">
          Votre espace dédié à la kinésithérapie et à votre bien-être. Prenez
          soin de votre santé en toute simplicité en prenant rendez-vous avec
          nos professionnels qualifiés. Inscrivez-vous dès maintenant pour
          accéder à tous nos services personnalisés et planifier vos séances en
          ligne.
        </p>
        <p>
          Inscrivez-vous{' '}
          <Link to="#" className="font-bold">
            ici
          </Link>{' '}
          {''}!
        </p>
      </div>
    </section>
  );
}
