interface ArticleRowProps {
  isReversed?: boolean;
  articleImage: string;
  articleTitle: string;
  articleParagraph: string;
  articleAlt: string;
}

export default function ArticleRow({
  isReversed,
  articleImage,
  articleTitle,
  articleParagraph,
  articleAlt,
}: ArticleRowProps) {
  return (
    <article className="mx-4 flex flex-col md:flex-row md:gap-4 md:justify-between md:items-center px-6 md:px-60">
      {isReversed ? (
        <>
          <img
            src={articleImage}
            alt={articleAlt}
            className="rounded-3xl shadow-xl w-72 hidden md:block lg:w-80 xl:w-1/3 mx-auto mb-6"
          />
          <div className="text-primaryBlue italic text-sm md:text-lg md:w-1/2 font-medium px-4">
            <h4 className="mb-6 font-semibold text-base">{articleTitle}</h4>
            <p className="mb-6">{articleParagraph}</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-primaryBlue italic text-sm md:text-lg md:w-1/2 font-medium px-4">
            <h4 className="mb-6 font-semibold text-base">{articleTitle}</h4>
            <p className="mb-6">{articleParagraph}</p>
          </div>
          <img
            src={articleImage}
            alt={articleAlt}
            className="rounded-3xl shadow-xl w-72 hidden md:block lg:w-80 xl:w-1/3 mx-auto mb-6"
          />
        </>
      )}
    </article>
  );
}
