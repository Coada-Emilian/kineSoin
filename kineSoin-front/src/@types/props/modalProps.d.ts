import type { IDeleteModalActiveEntity } from '../interfaces/customInterfaces';
import type { BaseModalSize, BaseModalVariant } from '../types/modalTypes';

export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type BaseModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  variant?: BaseModalVariant;
  size?: BaseModalSize;
};

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

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: IDeleteModalActiveEntity;
  entityType: string;
}

export interface FirstAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SecondAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ThirdAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
}
