import type {
  IButtonDetails,
  IPublicArticle,
} from '../interfaces/componentInterfaces';

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
