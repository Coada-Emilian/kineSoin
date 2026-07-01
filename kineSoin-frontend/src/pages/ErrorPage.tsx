import { Link } from 'react-router-dom';
import type { ErrorPageProps } from '../@types/props/componentProps';
import {
  getErrorPageStatusCode,
  getErrorPageErrorText,
  getErrorPageLinkDestination,
  getErrorPageLinkText,
} from '../utils/config/errorPageDetails';

export default function ErrorPage({ type }: ErrorPageProps) {
  const errorPageProps: ErrorPageProps = { type };

  const statusCode = getErrorPageStatusCode(errorPageProps);
  const errorText = getErrorPageErrorText(errorPageProps);
  const linkDestination = getErrorPageLinkDestination(errorPageProps) || '/';
  const linkText = getErrorPageLinkText(errorPageProps);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 w-full">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 md:p-10 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-primaryRed mb-4">
          {statusCode}
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          Oups, une erreur est survenue
        </h2>

        <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
          {errorText}
        </p>

        <Link
          to={linkDestination}
          className="
            inline-flex
            items-center
            justify-center
            bg-primaryBlue
            hover:bg-secondaryBlue
            text-white
            font-medium
            px-6
            py-3
            rounded-xl
            shadow-sm
            transition-all
            duration-200
            hover:shadow-md
          "
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}
