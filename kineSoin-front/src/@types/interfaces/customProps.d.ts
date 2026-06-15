import { IButtonDetails, type IHomePageArticle } from './customInterfaces';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean;
  onClose?: () => void;
}

export interface PublicRouteDetailsProps {
  path?: string;
  element: ComponentType;
  index?: boolean;
}

export interface IHomePageArticleProps {
  article: IHomePageArticle;
}
