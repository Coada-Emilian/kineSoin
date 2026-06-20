export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean;
  onClose?: () => void;
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

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: IDeleteModalActiveEntity;
  entityType: string;
}
