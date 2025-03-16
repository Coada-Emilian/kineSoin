/**
 * @function TherapistsStatusButtons
 *
 * A component that renders status filter buttons for therapists.
 * The buttons allow users to filter therapists by their status: "All", "Active", or "Inactive".
 * Each button triggers a state update with the corresponding status value when clicked.
 *
 * @param setStatus - A state setter function that updates the filter status.
 *
 * @returns {JSX.Element} - A set of buttons for selecting the therapist status filter.
 *
 * @example
 * <TherapistsStatusButtons setStatus={setFilterStatus} />
 *
 * @remarks
 * - The `CustomBtn` component is used for rendering each status button.
 * - Each button is styled based on its type (`basic`, `active`, `inactive`).
 * - Clicking a button updates the filter status in the parent component's state.
 */

import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';

interface TherapistsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
export default function TherapistsStatusButtons({
  setStatus,
}: TherapistsStatusButtonsProps) {
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
          text: 'Actifs',
          style: 'status',
          onClick: () => {
            setStatus('active');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'inactive',
          text: 'Inactifs',
          style: 'status',
          onClick: () => {
            setStatus('inactive');
          },
        }}
      />
    </div>
  );
}
