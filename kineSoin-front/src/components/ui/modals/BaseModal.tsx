import ReactModal from 'react-modal';
import type { BaseModalProps } from '../../../@types/props/modalProps';

const modalVariants = {
  default: 'p-6 md:p-8 gap-6',
  compact: 'p-5 gap-3',
  large: 'p-8 md:p-10 gap-8',
};

const modalMaxSizes = {
  sm: '400px',
  md: '500px',
  lg: '800px',
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}: BaseModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: modalMaxSizes[size],
          margin: 'auto',
          padding: '0px',
          borderRadius: '16px',
          backgroundColor: 'white/60',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          opacity: '95%',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      {...props}
    >
      <div
        className={`flex flex-col text-center ${modalVariants[variant]} ${className}`}
      >
        {children}
      </div>
    </ReactModal>
  );
}

