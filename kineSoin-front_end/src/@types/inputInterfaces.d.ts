export interface IEmailInput {
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  inputValue?: string;
  isFlexRow?: boolean;
  autoComplete?: string;
}

export interface IPasswordInput {
  inputId: string;
  inputName: string;
  labelName: string;
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  oldPassword?: string;
  inputValue?: boolean;
  autoComplete?: string;
  hasInfoIcon?: boolean;
  isFlexRow?: boolean;
}

export interface ITextInput {
  inputId: string;
  labelName: string;
  inputName: string;
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  inputValue?: string;
  isFlexRow?: boolean;
  autoComplete?: string;
  isTextArea?: boolean;
  isRequired?: boolean;
}

export interface IDateInput {
  inputId: string;
  labelName: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  labelName?: string;
  inputName: string;
  inputValue?: string;
  isRequired?: boolean;
  autoComplete?: string;
}

export interface IDropdownInput {
  inputId: string;
  labelName: string;
  inputName: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  inputValue?: string;
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
  inputId: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  inputValue?: string;
  isFlexRow?: boolean;
  isRequired?: boolean;
  inputPlaceholder?: string;
  autoComplete?: string;
}

export interface IFileInput {
  inputId: string;
  labelName: string;
  inputName: string;
  isFlexRow?: boolean;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  inputValue?: string;
  isRequired?: boolean;
  autoComplete?: string;
}
