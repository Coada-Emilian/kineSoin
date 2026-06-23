import type { IDeleteModalActiveEntity } from '../interfaces/customInterfaces';
import type { BaseModalSize, BaseModalVariant } from '../types/modalTypes';

export interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BaseModalProps extends BasicModalProps {
  children: ReactNode;
  className?: string;
  variant?: BaseModalVariant;
  size?: BaseModalSize;
}

export interface ImageModalProps extends BasicModalProps {
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  inputId: string;
  inputName: string;
  fileName: string;
  setIsFileAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ConfirmDeleteModalProps extends BasicModalProps {
  entity: IDeleteModalActiveEntity;
  entityType: string;
}

export interface FirstAddTherapistModalProps extends BasicModalProps {
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SecondAddTherapistModalProps extends BasicModalProps {
  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}
