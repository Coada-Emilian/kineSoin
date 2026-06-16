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

export interface IPatientRegistrationData {
  name?: string;
  birth_name?: string;
  surname?: string;
  gender?: string;
  birth_date?: string;
  street_number?: string;
  street_name?: string;
  postal_code?: string;
  city?: string;
  prefix?: string;
  phone_number?: string;
  email?: string;
  password?: string;
  picture?: File;
}

export interface ITextInput {
  id: string;
  labelName: string;
  name: string;
  placeholder?: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isFlexRow?: boolean;
  autoComplete?: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDateInput {
  id: string;
  labelName: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  labelName?: string;
  name: string;
  value?: string;
  isRequired?: boolean;
  autoComplete?: string;
}

export interface IDropdownInput {
  id: string;
  labelName: string;
  name: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isRequired?: boolean;
  isLabelNormal?: boolean;
  autoComplete?: string;
  allOptions: {
    startingOption?: {
      value: string;
      text: string;
    };
    options: {
      key?: string;
      value: string;
      text: string;
    }[];
  };
}

export interface ITelephoneInput {
  id: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isFlexRow?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFileInput {
  id: string;
  labelName: string;
  name: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isRequired?: boolean;
  autoComplete?: string;
}
