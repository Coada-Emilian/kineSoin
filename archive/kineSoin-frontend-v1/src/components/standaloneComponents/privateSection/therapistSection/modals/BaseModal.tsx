/**
 * @function BaseModal
 *
 * A modal component built on top of `ReactModal` for displaying content in a dialog box.
 * It includes a customizable overlay, a close handler, and customizable modal styles.
 *
 * @param isOpen - A boolean that determines whether the modal is open or closed.
 * @param onClose - A callback function that is triggered when the modal is closed.
 * @param children - The content to be rendered inside the modal.
 * @param props - Additional props passed to `ReactModal`.
 *
 * @returns {JSX.Element} - A `ReactModal` component with custom styling and close functionality.
 *
 * @example
 * <BaseModal isOpen={isModalOpen} onClose={handleCloseModal}>
 *   <div>Your modal content here</div>
 * </BaseModal>
 *
 * @remarks
 * - The `BaseModal` uses default styling but can be customized further with additional props.
 * - The modal will close when the overlay or close button is clicked (if `onClose` is provided).
 */

import ReactModal from 'react-modal';

interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean;
  onClose?: () => void;
}

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
        onClose && onClose();
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
