import type {
  IButtonDetails,
  IHomePageArticle,
  IPublicArticle,
} from '../interfaces/componentInterfaces';
import type { ErrorPageType } from '../types/errorTypes';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export interface PublicRouteDetailsProps {
  path?: string;
  element: ComponentType;
  index?: boolean;
}

export interface IHomePageArticleProps {
  article: IHomePageArticle;
}

export interface PublicArticleRowProps {
  article: IPublicArticle;
}

export interface ErrorPageProps {
  type: ErrorPageType;
}

export interface AdminAddTherapistButtonSectionProps {
  onClose?: () => void;
}
