import ReactModal from 'react-modal';
import type { BaseModalProps } from '../../../@types/props/modalProps';

const modalVariants = {
  form: 'p-6 md:p-8 gap-6',
  compact: 'p-5 gap-3',
  spacious: 'p-8 md:p-10 gap-8',
  tight: 'p-0 gap-0',
};

const modalMaxSizes = {
  xs: '20rem',
  sm: '26rem',
  md: '35rem',
  lg: '45rem',
  xl: '56rem',
  xxl: '67.5rem',
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
  className = '',
  variant = 'form',
  size = 'md',
  ...props
}: BaseModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',

          width: 'min(92vw, 800px)',
          maxWidth: modalMaxSizes[size],
          maxHeight: '90vh',

          margin: 0,
          padding: 0,

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',
          overflowY: 'auto',

          borderRadius: '20px',
          border: '1px solid rgba(226, 232, 240, 0.8)',

          backgroundColor: '#FDFDFD',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
        },
        overlay: {
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          zIndex: 1000,
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
