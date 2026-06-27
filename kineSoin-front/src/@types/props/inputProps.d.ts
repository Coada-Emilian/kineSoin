import type {
  IDateInput,
  IDropdownInput,
  IEmailInput,
  IFileInput,
  IPasswordInput,
  ITelephoneInput,
  ITextInput,
} from '../interfaces/inputInterfaces';

export interface EmailInputProps {
  input: IEmailInput;
}

export interface PasswordInputProps {
  input: IPasswordInput;
}

export interface TextInputProps {
  input: ITextInput;
}

export interface DateInputProps {
  input: IDateInput;
}

export interface DropdownInputProps {
  input: IDropdownInput;
}

export interface TelephoneInputProps {
  input: ITelephoneInput;
}

export interface FileInputProps {
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
  input: IFileInput;
}
