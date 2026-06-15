import type { PublicArticleRowProps } from '../../../@types/interfaces/customProps';

export default function ArticleRow({ article }: PublicArticleRowProps) {
  return (
    <article className="mx-4 flex flex-col md:flex-row md:gap-4 md:justify-between md:items-center px-6 md:px-20">
      {article.isReversed ? (
        <>
          <img
            src={article.image}
            alt={article.alt}
            className="rounded-3xl shadow-xl w-72 hidden md:block lg:w-80 xl:w-1/3 mx-auto mb-6"
          />

          <div className="text-primaryBlue italic text-sm md:text-lg md:w-1/2 font-medium px-4">
            <h4 className="mb-6 font-semibold text-base">{article.title}</h4>
            <p className="mb-6">{article.paragraph}</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-primaryBlue italic text-sm md:text-lg md:w-1/2 font-medium px-4">
            <h4 className="mb-6 font-semibold text-base">{article.title}</h4>
            <p className="mb-6">{article.paragraph}</p>
          </div>

          <img
            src={article.image}
            alt={article.alt}
            className="rounded-3xl shadow-xl w-72 md:block lg:w-80 xl:w-1/3 mx-auto mb-6"
          />
        </>
      )}
    </article>
  );
}
