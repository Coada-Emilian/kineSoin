/**
 * @function ArticleRow
 *
 * A reusable component that displays an article section with an image and descriptive text.
 * This component supports an optional reversed layout for alternating content alignment.
 *
 * @param {boolean} [isReversed] - If `true`, the image appears on the left and text on the right (default is text first).
 * @param {string} articleImage - The source path of the article image.
 * @param {string} articleTitle - The title of the article.
 * @param {string} articleParagraph - The main text content of the article.
 * @param {string} articleAlt - The alt text for the article image.
 *
 * @returns {JSX.Element} - A flexible article section that enhances readability with alternating layouts.
 *
 * @example
 * <ArticleRow
 *   articleImage="/path/to/image.jpg"
 *   articleTitle="Discover our services"
 *   articleParagraph="Our platform offers easy access to healthcare professionals..."
 *   articleAlt="A person receiving therapy"
 * />
 */

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
    <article className="mx-4 flex flex-col md:flex-row md:gap-4 md:justify-between md:items-center px-6 md:px-20">
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
            className="rounded-3xl shadow-xl w-72 md:block lg:w-80 xl:w-1/3 mx-auto mb-6"
          />
        </>
      )}
    </article>
  );
}
