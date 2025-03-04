export interface IEmailInput {
  inputId: string;
  inputPlaceholder?: string;
  additionalDivClassName?: string;
  additionalLabelClassName?: string;
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
