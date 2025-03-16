/**
 * @component CreateButtonsSection
 *
 * A component that renders the 'Create' and 'Cancel' buttons. The 'Create' button triggers form submission,
 * while the 'Cancel' button calls a provided `onClose` function to close the form/modal.
 *
 * @param {() => void} [onClose] - Function to close the form/modal (optional).
 *
 * @returns {JSX.Element} - The rendered buttons for creating or canceling the form submission.
 *
 * @example
 * <CreateButtonsSection onClose={handleClose} />
 *
 * @remarks
 * - The 'Create' button submits the form.
 * - The 'Cancel' button triggers the `onClose` function if provided.
 */

import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';

interface CreateButtonsSectionProps {
  onClose?: () => void;
}
export default function CreateButtonsSection({
  onClose,
}: CreateButtonsSectionProps) {
  return (
    <div className="flex gap-2 mt-6 w-fit mx-auto">
      <CustomBtn
        btn={{
          type: 'basic',
          text: 'Créer',
          style: 'normal',
        }}
        type="submit"
      />

      <CustomBtn
        btn={{
          type: 'cancel',
          text: 'Annuler',
          style: 'normal',
          onClick: () => {
            onClose && onClose();
          },
        }}
      />
    </div>
  );
}
