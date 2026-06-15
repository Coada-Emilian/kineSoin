import { ButtonInterfaceStyles } from './customTypes';

export interface ICountryPrefix {
  flag_url?: string;
  prefix: string;
  name: string;
}

// Type for the country data coming from https://restcountries.com/v3.1/all?fields=name,idd when fetching prefixes data
export interface RestCountry {
  name: {
    common: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}

// Interface for custom button details
export interface IButtonDetails {
  type: ButtonInterfaceTypes;
  text: string | JSX.Element;
  style: ButtonInterfaceStyles;
  icon?: ButtonInterfaceIcons;
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

export interface IEmailInput {
  id: string;
  name: string;
  labelName: string;
  placeholder?: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isFlexRow?: boolean;
  autoComplete?: string;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IPasswordInput {
  id: string;
  name: string;
  labelName: string;
  placeholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  oldPassword?: string;
  value?: boolean;
  autoComplete?: string;
  hasInfoIcon?: boolean;
  isFlexRow?: boolean;
}

export interface IPublicArticle {
  isReversed?: boolean;
  image: string;
  title: string;
  paragraph: string;
  alt: string;
}
