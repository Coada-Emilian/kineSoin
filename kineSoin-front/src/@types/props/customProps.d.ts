import {
  IButtonDetails,
  type IDateInput,
  type IDropdownInput,
  type IEmailInput,
  type IHomePageArticle,
  type IPasswordInput,
  type IPublicArticle,
  type ITextInput,
} from '../interfaces/customInterfaces';
import type { IAdminEntityTypes } from '../types/customTypes';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean;
  onClose?: () => void;
}

export interface PublicRouteDetailsProps {
  path?: string;
  element: ComponentType;
  index?: boolean;
}

export interface IHomePageArticleProps {
  article: IHomePageArticle;
}

export interface EmailInputProps {
  input: IEmailInput;
}

export interface PasswordInputProps {
  input: IPasswordInput;
}

export interface PublicArticleRowProps {
  article: IPublicArticle;
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

export interface ThirdPatientRegistrationFormSectionProps {
  setPatientImage:
    | React.Dispatch<React.SetStateAction<File | null>>
    | undefined;
}

export interface FileInputProps {
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
  input: IFileInput;
}

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  inputId: string;
  inputName: string;
  fileName: string;
  setIsFileAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HandleFileChangeFunctionProps {
  setFileName?: React.Dispatch<React.SetStateAction<string>>;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

interface GetFormElementFunctionProps {
  formOrder: IFormOrders;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface AdminPageProps {
  entityType: IAdminEntityTypes;
}

export interface FetchAdminTableDataFunctionProps {
  entityType: IAdminEntityTypes;
}

interface FetchAdminEntityDetailsFunctionProps {
  entityType: IAdminEntityTypes;
  entity_id: number | null;
}
