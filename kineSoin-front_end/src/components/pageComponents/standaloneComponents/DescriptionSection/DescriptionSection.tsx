import graphIcon from '/icons/health-graph.png';
import appointmentIcon from '/icons/appointment.png';
import healthcareIcon from '/icons/healthcare.png';
import priorityIcon from '/icons/priority.png';
import therapistIcon from '/icons/therapist.png';
import HomePageArticle from './HomePageArticle';

export default function DescriptionSection() {
  const firstArticles = [
    {
      imgSrc: graphIcon,
      title: 'Un suivi adapté à vos besoins',
      description:
        'Prenez rendez-vous à tout moment, gérez vos consultations en quelques clics, et retrouvez vos informations de soin en toute simplicité.',
    },
    {
      imgSrc: appointmentIcon,
      title: 'Des rendez-vous à portée de main',
      description:
        'Choisissez entre des consultations en cabinet ou à distance, selon vos préférences, et organisez votre emploi du temps sans stress.',
    },
    {
      imgSrc: healthcareIcon,
      title: 'Vos soins accessibles en un clic',
      description:
        'Consultez vos dossiers, recevez des rappels et accédez à vos prescriptions en ligne, où que vous soyez.',
    },
  ];
  const secondArticles = [
    {
      imgSrc: priorityIcon,
      title: 'Votre santé, notre priorité',
      description:
        'Profitez de conseils personnalisés, suivez vos progrès et restez connecté à vos praticiens pour des soins continus.',
    },
    {
      imgSrc: therapistIcon,
      title: 'Des praticiens à votre écoute',
      description:
        'Communiquez avec vos thérapeutes à tout moment, posez vos questions et recevez des réponses claires et rapides.',
    },
  ];

  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px]">
      <div className="flex flex-wrap justify-around">
        {' '}
        {firstArticles.map((article, index) => (
          <HomePageArticle key={index} article={article} />
        ))}
      </div>
      <div className="flex flex-wrap justify-around">
        {' '}
        {secondArticles.map((article, index) => (
          <HomePageArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
