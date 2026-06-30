/**
 * @function AfflictionsStatusButtons
 *
 * A component that renders buttons to filter and set the status of afflictions.
 * Each button corresponds to a different status for afflictions (all, operated, non-operated).
 * When a button is clicked, the `setStatus` function is called to update the state with the selected status.
 *
 * @param setStatus - A function to update the state of the affliction status.
 *
 * @returns {JSX.Element} - A set of buttons for changing the affliction status filter.
 *
 * @example
 * <AfflictionsStatusButtons setStatus={setAfflictionStatus} />
 *
 * @remarks
 * - Each button uses a `CustomBtn` component to apply specific styles and trigger status changes.
 * - The status options are: 'all', 'operated', and 'non-operated'.
 */

import CustomBtn from '../../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

interface AfflictionsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function AfflictionsStatusButtons({
  setStatus,
}: AfflictionsStatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomBtn
        btn={{
          type: 'basic',
          text: 'Tous',
          style: 'status',
          onClick: () => {
            setStatus('all');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'active',
          text: 'Opérées',
          style: 'status',
          onClick: () => {
            setStatus('operated');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'inactive',
          text: 'Non-opérées',
          style: 'status',
          onClick: () => {
            setStatus('non-operated');
          },
        }}
      />
    </div>
  );
}
