import clsx from 'clsx';
import type { PublicArticleRowProps } from '../../../@types/interfaces/customProps';

export default function ArticleRow({ article }: PublicArticleRowProps) {
  const imageStyle = 'rounded-2xl shadow-lg w-72 md:w-80 xl:w-1/3 mx-auto mb-6';

  const contentStyle =
    'text-primaryBlue text-sm md:text-lg md:w-1/2 font-medium px-4';
  const titleStyle = 'mb-6 font-semibold text-base';

  return (
    <article className="italic mx-4 flex flex-col md:flex-row md:gap-4 md:justify-between md:items-center px-6 md:px-20">
      {article.isReversed ? (
        <>
          <img
            src={article.image}
            alt={article.alt}
            className={clsx(imageStyle, 'hidden md:block')}
          />

          <div className={contentStyle}>
            <h4 className={titleStyle}>{article.title}</h4>
            <p className="mb-6">{article.paragraph}</p>
          </div>
        </>
      ) : (
        <>
          <div className={contentStyle}>
            <h4 className={titleStyle}>{article.title}</h4>
            <p className="mb-6">{article.paragraph}</p>
          </div>

          <img src={article.image} alt={article.alt} className={imageStyle} />
        </>
      )}
    </article>
  );
}
