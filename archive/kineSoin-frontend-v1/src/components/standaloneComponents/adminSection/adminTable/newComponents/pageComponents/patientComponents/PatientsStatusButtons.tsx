/**
 * @function PatientsStatusButtons
 *
 * A component that renders buttons to filter and set the status of patients.
 * Each button corresponds to a different patient status (all, active, inactive, pending, banned).
 * When a button is clicked, the `setStatus` function is called to update the state with the selected status.
 *
 * @param setStatus - A function to update the state of the patient status.
 *
 * @returns {JSX.Element} - A set of buttons for changing the patient status filter.
 *
 * @example
 * <PatientsStatusButtons setStatus={setPatientStatus} />
 *
 * @remarks
 * - Each button uses a `CustomBtn` component to apply specific styles and trigger status changes.
 * - The status options are: 'all', 'active', 'inactive', 'pending', and 'banned'.
 */

import CustomBtn from '../../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

interface PatientsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function PatientsStatusButtons({
  setStatus,
}: PatientsStatusButtonsProps) {
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

      <CustomBtn
        btn={{
          type: 'pending',
          text: 'En attente',
          style: 'status',
          onClick: () => {
            setStatus('pending');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'banned',
          text: 'Bannis',
          style: 'status',
          onClick: () => {
            setStatus('banned');
          },
        }}
      />
    </div>
  );
}
