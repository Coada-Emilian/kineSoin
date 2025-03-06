export interface IEmailInput {
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  oldEmail?: string;
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
  isFlexRow?: boolean;
  autoComplete?: string;
  hasInfoIcon?: boolean;
}
