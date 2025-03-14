/**
 * AfflictionsStatusButtons Component
 *
 * This component renders a set of status buttons used to filter and manage the status of afflictions in the admin section.
 * The buttons include options to view all afflictions, operated afflictions, and non-operated afflictions.
 * When a button is clicked, it updates the affliction status through the `setStatus` function passed as a prop.
 *
 * **Main Features:**
 * - Displays three buttons: "Tous", "Opérées", and "Non-opérées" (All, Operated, Non-operated).
 * - Each button triggers a state change through the `setStatus` function.
 * - The `setStatus` function updates the affliction's status, which is used to filter or display the corresponding afflictions in the admin table.
 * - The `CustomBtn` component is used to render each button with customizable text, style, and click handler.
 *
 * **Parameters:**
 * - `setStatus` (`React.Dispatch<React.SetStateAction<string>>`): A setter function that updates the status of afflictions
 *   when any of the status buttons are clicked. This function typically updates a state in a parent component to control the filtering.
 *
 * **Usage Example:**
 * ```tsx
 * <AfflictionsStatusButtons setStatus={setStatus} />
 * ```
 * This will render the three status buttons, and when clicked, they will update the status state with the values "all", "operated", or "non-operated".
 *
 * **Returns:**
 * - This component renders a `div` containing three `CustomBtn` components, each corresponding to a different status button for the affliction entity.
 *
 * **Important Notes:**
 * - The `CustomBtn` component is used to render each button with the desired type, style, and click handler.
 * - Each button is associated with a specific status, which is set when clicked:
 *   - "Tous" (All) sets the status to 'all'.
 *   - "Opérées" (Operated) sets the status to 'operated'.
 *   - "Non-opérées" (Non-operated) sets the status to 'non-operated'.
 *
 * **CustomBtn Component:**
 * - `CustomBtn` is used to render a button with configurable properties:
 *   - `btn.type`: Defines the type of the button (e.g., 'basic', 'active', 'inactive').
 *   - `btn.text`: Defines the text displayed on the button.
 *   - `btn.style`: Defines the style of the button (e.g., 'status').
 *   - `btn.onClick`: Defines the click handler that will update the entity's status.
 */

import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';

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
