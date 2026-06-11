import { ButtonDetailsInterface } from './customInterfaces';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: ButtonDetailsInterface;
}

export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean;
  onClose?: () => void;
}
