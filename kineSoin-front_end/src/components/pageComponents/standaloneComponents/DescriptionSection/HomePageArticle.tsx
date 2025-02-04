import type { HomePageArticle } from '../../../../@types/HomePageArticle';

interface HomePageArticleProps {
  article: HomePageArticle;
}

export default function HomePageArticle({ article }: HomePageArticleProps) {
  return (
    <div>
      <article className="flex flex-col gap-4 mb-6 w-24 md:w-32 xl:w-56 2xl:w-72">
        <img
          src={article.imgSrc}
          alt="graph"
          className="w-12 object-cover mx-auto md:w-16 lg:w-20 xl:w-24"
        />
        <div>
          <h4 className="font-bold text-center text-xxs mb-2 md:text-xs lg:text-sm xl:text-base">
            {article.title}
          </h4>
          <div className="text-gray-600 text-center text-xxxs mx-auto md:text-xs lg:text-sm xl:text-base md:font-semibold ">
            {article.description}
          </div>
        </div>
      </article>
    </div>
  );
}
