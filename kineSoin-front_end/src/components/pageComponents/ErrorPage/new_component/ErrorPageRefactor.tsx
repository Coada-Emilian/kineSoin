import { Link } from 'react-router-dom';
import { IErrorPageRefactorProps } from '../../../../@types/interfaces/pageInterfaces';
import {
  getErrorPageErrorText,
  getErrorPageLinkDestination,
  getErrorPageLinkText,
  getErrorPageStatusCode,
} from '../../../../utils/componentUtils/pageComponents/functions/errorPageFunctions';

export default function ErrorPageRefactor(type: IErrorPageRefactorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {getErrorPageStatusCode(type)}
      </h1>

      <p className="text-2xl text-gray-800 mb-6">
        {getErrorPageErrorText(type)}
      </p>

      <Link
        to={getErrorPageLinkDestination(type) || '/'}
        className="bg-primaryBlue hover:bg-secondaryBlue text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        {getErrorPageLinkText(type)}
      </Link>
    </div>
  );
}
