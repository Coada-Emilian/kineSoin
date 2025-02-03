/**
 * @description Interface for representing an article on the home page.
 *
 * This interface:
 * - Defines the structure of a home page article object.
 * - Contains the following properties:
 *   - imgSrc: A string representing the source URL of the article's image.
 *   - title: A string representing the title of the article.
 *   - description: A string representing the description of the article.
 *
 * Example usage:
 * const article: HomePageArticle = {
 *   imgSrc: 'https://example.com/image.jpg',
 *   title: 'Sample Article Title',
 *   description: 'This is a sample description of the article.',
 * };
 */

export interface HomePageArticle {
  imgSrc: string;
  title: string;
  description: string;
}
