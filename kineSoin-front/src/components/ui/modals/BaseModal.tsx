import ReactModal from 'react-modal';
import type { BaseModalProps } from '../../@types/interfaces/customProps';

export default function BaseModal({
  isOpen,
  onClose,
  children,
  ...props
}: BaseModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '0px',
          borderRadius: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          opacity: '95%',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      {...props}
    >
      {children}
    </ReactModal>
  );
}
