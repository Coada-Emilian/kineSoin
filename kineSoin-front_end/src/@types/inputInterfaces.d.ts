export interface IEmailInput {
  inputId: string;
  inputPlaceholder: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  isFlexRow?: boolean;
  old_email?: string;
}

export interface IPasswordInput {
  inputId: string;
  inputName?: string;
  inputPlaceholder?: string;
  labelContent?: string;
  autoComplete?: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
  hasInfoIcon?: boolean;
}
