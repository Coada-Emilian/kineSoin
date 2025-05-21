import { Link } from 'react-router-dom';
import { IErrorPageRefactorProps } from '../../../../@types/interfaces/pageInterfaces';
import {
  getErrorPageErrorText,
  getErrorPageLinkDestination,
  getErrorPageLinkText,
  getErrorPageStatusCode,
} from '../../../../utils/functions/error_page/index';

export default function ErrorPageRefactor({ type }: IErrorPageRefactorProps) {
  const errorPageProps: IErrorPageRefactorProps = { type };

  const statusCode = getErrorPageStatusCode(errorPageProps);
  const errorText = getErrorPageErrorText(errorPageProps);
  const linkDestination = getErrorPageLinkDestination(errorPageProps) || '/';
  const linkText = getErrorPageLinkText(errorPageProps);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">{statusCode}</h1>
      <p className="text-2xl text-gray-800 mb-6">{errorText}</p>
      <Link
        to={linkDestination}
        className="bg-primaryBlue hover:bg-secondaryBlue text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        {linkText}
      </Link>
    </div>
  );
}
