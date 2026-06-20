// Interface for custom button details
export interface IButtonDetails {
  type: ButtonInterfaceTypes;
  style: ButtonInterfaceStyles;
  icon?: ButtonInterfaceIcons;
  text: string | JSX.Element;
  hasBorder?: boolean;
  onClick?: () => void;
  to?: string;
}

export interface IHomePageArticle {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export interface IPublicArticle {
  isReversed?: boolean;
  image: string;
  title: string;
  paragraph: string;
  alt: string;
}

export interface IErrorPageDetails {
  link: string;
  linkText: string;
  status: number;
  errorText: string;
}
