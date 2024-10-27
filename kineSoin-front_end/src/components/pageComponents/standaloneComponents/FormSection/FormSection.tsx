import { Link } from 'react-router-dom';

export default function FormSection() {
  return (
    <section className="bg-homePage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] md:items-center gap-12 flex md:px-16 md:h-screen flex-1 md:relative">
      {' '}
      <div className=" font-normal text-sm h-fit my-auto xl:text-xl w-10/12 md:w-1/3 lg:w-2/3 text-primaryBlue bg-white p-6 rounded-3xl opacity-75 md:absolute md:top-40 md:left-40 italic">
        {' '}
        <p>Bienvenue sur kineSoin !</p>
        <p>
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
