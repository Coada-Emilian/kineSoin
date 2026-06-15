import {
  IButtonDetails,
  type IEmailInput,
  type IHomePageArticle,
  type IPasswordInput,
  type IPublicArticle,
} from './customInterfaces';

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

export interface EmailInputProps {
  emailInput: IEmailInput;
}

export interface PasswordInputProps {
  passwordInput: IPasswordInput;
}

export interface PublicArticleRowProps {
  article: IPublicArticle;
}
