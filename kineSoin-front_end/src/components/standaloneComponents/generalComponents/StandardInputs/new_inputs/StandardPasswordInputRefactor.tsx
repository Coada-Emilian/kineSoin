/**
 * StandardPasswordInputRefactor Component
 *
 * This component represents a standard password input field, with the added feature of toggling the visibility
 * of the password. It provides an enhanced user experience by allowing users to toggle between the visible
 * and hidden states of their entered password.
 *
 * **Main Features:**
 * - Allows users to toggle between showing and hiding the password via an eye icon button.
 * - Displays a password input field with a label, optional help icon, and custom styling.
 * - Manages the password value and visibility state internally using React's `useState`.
 * 
 * **Props:**
 * - `passwordInput`: An object containing the following properties:
 *   - `id` (string): The `id` of the input field, used for the label's `htmlFor` attribute and the input's `id`.
 *   - `name` (string): The `name` of the input field.
 *   - `placeholder` (string): The placeholder text for the input field.
 *   - `value` (string): The default value for the password input field (optional).
 *   - `autoComplete` (string): The auto-completion type for the input field (optional).
 *   - `labelName` (string): The label text for the input field.
 *   - `hasInfoIcon` (boolean): If `true`, displays a help icon with a tooltip on the password input field.
 *   - `additionalDivClassName` (string): Optional additional class names for the container div for extra customization.
 *   - `additionalLabelClassName` (string): Optional additional class names for the label for extra customization.
 *   - `isFlexRow` (boolean): Determines whether the container should use `flex-row` or `flex-col` layout. Defaults to column layout (`flex-col`).
 *
 * **State Management:**
 * - The component uses the `useState` hook to manage the password input value (`password`) and the visibility of the password (`showPassword`).
 * - The `showPassword` state controls whether the password is shown as plain text or masked as `*` (password type).
 * - The password state is updated whenever the user types in the password input field.

 * **Toggle Functionality:**
 * - The "eye" button toggles the `showPassword` state when clicked. If the password is hidden, clicking the eye button will show the password as plain text, and vice versa.
 * - The button's label and icon change based on the state of the `showPassword` (open or closed eye icon).

 * **Styling:**
 * - The component uses Tailwind CSS for styling, providing flexibility and responsiveness across various devices.
 * - It allows additional custom classes to be passed via the `additionalDivClassName` and `additionalLabelClassName` props to further customize the appearance.
 * - The focus ring effect is applied to the input field when it is in focus, ensuring an accessible and visually distinct interaction.

 * **Help Icon:**
 * - When the `hasInfoIcon` prop is set to `true`, a help icon (question mark) is displayed next to the label. The icon provides a tooltip explaining the password requirements (e.g., minimum 12 characters with a mix of uppercase, lowercase, numbers, and special characters).

 * **Validation:**
 * - The password input field is marked as `required`, ensuring that the form cannot be submitted without providing a password.
 * - The password field type is set to `password`, ensuring the text is masked unless toggled by the user.

 * **Usage Example:**
 * ```tsx
 * <StandardPasswordInputRefactor
 *   passwordInput={{
 *     id: 'user-password',
 *     name: 'password',
 *     placeholder: 'Enter your password',
 *     value: '',
 *     autoComplete: 'current-password',
 *     labelName: 'Password',
 *     hasInfoIcon: true,
 *     additionalDivClassName: 'custom-class',
 *     isFlexRow: true,
 *   }}
 * />
 * ```
 *
 * @component
 */

import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';
import { useState } from 'react';
import questionIcon from '/icons/question-circle.svg';
import { IPasswordInput } from '../../../../../@types/inputInterfaces';

interface StandardPasswordInputProps {
  passwordInput: IPasswordInput;
}

export default function StandardPasswordInputRefactor({
  passwordInput,
}: StandardPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(
    typeof passwordInput.value === 'string' ? passwordInput.value : ''
  );

  return (
    <div
      className={`${
        passwordInput.additionalDivClassName &&
        passwordInput.additionalDivClassName
      } ${passwordInput.isFlexRow ? 'flex-row' : 'flex-col'} flex gap-1 italic text-xs md:text-sm xl:text-md 2xl:text-lg mb-4`}
    >
      <label
        htmlFor={passwordInput.id}
        className={`${
          passwordInput.additionalLabelClassName &&
          passwordInput.additionalLabelClassName
        } ${passwordInput.hasInfoIcon && 'flex-row items-center'} text-primaryBlue font-medium flex gap-1`}
      >
        {passwordInput.labelName}
        {passwordInput.hasInfoIcon && (
          <p
            className="text-sm text-center ml-4"
            title="12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1 caractère spécial"
          >
            <img src={questionIcon} alt="aide" className="w-6 cursor-help" />

            <span className="sr-only">
              12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1
              caractère spécial
            </span>
          </p>
        )}
      </label>

      <div className="flex rounded-md shadow-sm border">
        <input
          type={showPassword ? 'text' : 'password'}
          name={passwordInput.name}
          id={passwordInput.id}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md "
          placeholder={passwordInput.placeholder}
          autoComplete={passwordInput.autoComplete}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="bg-white rounded-tr-md rounded-br-md"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <img
            src={showPassword ? closedEyeIcon : openedEyeIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="h-6 my-auto px-2 w-auto opacity-90 bg-white"
          />
        </button>
      </div>
    </div>
  );
}
