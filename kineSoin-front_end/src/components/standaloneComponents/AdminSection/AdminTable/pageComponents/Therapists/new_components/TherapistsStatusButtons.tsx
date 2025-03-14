/**
 * TherapistsStatusButtons Component
 *
 * This component renders a set of status buttons used to filter and manage the status of therapists in the admin section.
 * The buttons include options to view all therapists, only active therapists, or only inactive therapists.
 * When a button is clicked, it updates the entity status through the `setStatus` function passed as a prop.
 *
 * **Main Features:**
 * - Displays three buttons: "Tous", "Actifs", and "Inactifs" (All, Active, Inactive).
 * - Each button triggers a state change through the `setStatus` function.
 * - The `setStatus` function updates the entity's status, which is used to filter or display the corresponding therapists in the admin table.
 * - The `CustomBtn` component is used to render each button with customizable text, style, and click handler.
 *
 * **Parameters:**
 * - `setStatus` (`React.Dispatch<React.SetStateAction<string>>`): A setter function that updates the status of therapists
 *   when any of the status buttons are clicked. This function typically updates a state in a parent component to control the filtering.
 *
 * **Usage Example:**
 * ```tsx
 * <TherapistsStatusButtons setStatus={setStatus} />
 * ```
 * This will render the three status buttons, and when clicked, they will update the status state with the values "all", "active", or "inactive".
 *
 * **Returns:**
 * - This component renders a `div` containing three `CustomBtn` components, each corresponding to a different status button for the therapist entity.
 *
 * **Important Notes:**
 * - The `CustomBtn` component is used to render each button with the desired type, style, and click handler.
 * - Each button is associated with a specific status, which is set when clicked:
 *   - "Tous" (All) sets the status to 'all'.
 *   - "Actifs" (Active) sets the status to 'active'.
 *   - "Inactifs" (Inactive) sets the status to 'inactive'.
 *
 * **CustomBtn Component:**
 * - `CustomBtn` is used to render a button with configurable properties:
 *   - `btn.type`: Defines the type of the button (e.g., 'basic', 'active', 'inactive').
 *   - `btn.text`: Defines the text displayed on the button.
 *   - `btn.style`: Defines the style of the button (e.g., 'status').
 *   - `btn.onClick`: Defines the click handler that will update the entity's status.
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
