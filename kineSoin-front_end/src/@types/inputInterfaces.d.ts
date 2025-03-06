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
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  oldPassword?: string;
  inputValue?: boolean;
  autoComplete?: string;
  hasInfoIcon?: boolean;
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
