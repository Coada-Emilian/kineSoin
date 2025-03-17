export interface IEmailInput {
  id: string;
  name: string;
  placeholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  value?: string;
  isFlexRow?: boolean;
  autoComplete?: string;
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
