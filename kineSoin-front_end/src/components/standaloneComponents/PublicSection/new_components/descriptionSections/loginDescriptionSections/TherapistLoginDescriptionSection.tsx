/**
 * @function TherapistLoginDescriptionSection
 *
 * This component displays an informative section for therapists logging into the platform.
 * It consists of two `ArticleRow` components that introduce KineSoin's benefits, such as:
 * - Expanding professional practice.
 * - Enhancing communication with clients.
 * - Providing tools for better appointment management and patient follow-ups.
 *
 * @returns {JSX.Element} - A description section containing informative articles for therapists.
 *
 * @example
 * <TherapistLoginDescriptionSection />
 */

import ArticleRow from '../articles/ArticleRow';
import firstTherapistLoginPhoto from '/images/therapistConnexionPage_right.webp';
import secondTherapistLoginPhoto from '/images/therapistConnexionPage_left.webp';

export default function TherapistLoginDescriptionSection() {
  const article = {
    image: firstTherapistLoginPhoto,
    alt: 'Kinésithérapeute faisant du massage plantaire',
    paragraph:
      "KineSoin est conçu pour les thérapeutes souhaitant élargir leur pratique et améliorer la communication avec leurs clients. Profitez d’une plateforme intuitive qui vous offre des ressources précieuses et un réseau de professionnels engagés. Ensemble, transformons des vies par le biais d'une thérapie bienveillante.",
    title: 'Bienvenue sur KineSoin',
  };

  const reverseArticle = {
    image: secondTherapistLoginPhoto,
    alt: 'Portrait Kinésithérapeute',
    paragraph:
      'Grâce à KineSoin, découvrez des outils pour simplifier votre gestion de cabinet et enrichir vos interactions avec les clients. Notre plateforme facilite la prise de rendez-vous et le suivi des progrès, vous permettant de vous concentrer sur ce qui compte vraiment - le bien-être de vos patients. Rejoignez-nous pour créer un impact positif dans votre communauté.',
    title: 'Optimisez votre pratique',
  };

  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col md:gap-4">
        <ArticleRow
          articleImage={article.image}
          articleAlt={article.alt}
          articleParagraph={article.paragraph}
          articleTitle={article.title}
        />

        <ArticleRow
          isReversed
          articleImage={reverseArticle.image}
          articleAlt={reverseArticle.alt}
          articleParagraph={reverseArticle.paragraph}
          articleTitle={reverseArticle.title}
        />
      </div>
    </div>
  );
}
