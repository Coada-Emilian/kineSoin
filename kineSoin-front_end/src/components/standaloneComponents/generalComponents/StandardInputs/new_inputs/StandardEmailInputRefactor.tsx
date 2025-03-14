/**
 * StandardEmailInputRefactor Component
 *
 * This component represents a standard email input field, providing the functionality
 * to input an email address with custom styling and behavior. It is a reusable form
 * component that accepts props to customize its appearance and functionality.
 *
 * **Main Features:**
 * - Displays an email input field with a label and custom styling.
 * - Accepts a set of props to customize the label, placeholder, value, and styling.
 * - The component internally manages the email input state using `useState`.
 *
 * **Props:**
 * - `emailInput`: An object containing the following properties:
 *   - `id` (string): The `id` of the input field, used for the label's `htmlFor` attribute and input's `id`.
 *   - `name` (string): The `name` of the input field.
 *   - `placeholder` (string): The placeholder text for the input field.
 *   - `value` (string): The default value for the input field (optional).
 *   - `autoComplete` (string): The auto-completion type for the input field (optional).
 *   - `additionalDivClassName` (string): Optional additional class names for the container div for extra customization.
 *   - `additionalLabelClassName` (string): Optional additional class names for the label for extra customization.
 *   - `isFlexRow` (boolean): Determines whether the container should use `flex-row` or `flex-col` layout. Defaults to column layout (`flex-col`).
 *
 * **State Management:**
 * - The component uses the `useState` hook to manage the value of the email input field. The email state is updated whenever the user types in the input.
 * - If a `value` is provided through the `emailInput` prop, it is used as the initial value for the email state.
 *
 * **Styling:**
 * - The component uses conditional classes for flexible layout (`flex-row` or `flex-col`), font sizes (`text-xs`, `text-sm`, etc.), and other styles based on the provided props and default styles.
 * - Focus states are enhanced with Tailwind CSS to provide a distinct ring effect when the input is focused.
 *
 * **Validation:**
 * - The email input is marked as `required`, meaning the form cannot be submitted without providing an email address.
 * - The input type is set to `email`, ensuring basic validation of the email format (e.g., `user@example.com`).
 *
 * **Usage Example:**
 * ```tsx
 * <StandardEmailInputRefactor
 *   emailInput={{
 *     id: 'user-email',
 *     name: 'email',
 *     placeholder: 'Enter your email address',
 *     value: '',
 *     autoComplete: 'email',
 *     additionalDivClassName: 'custom-class',
 *     isFlexRow: true,
 *   }}
 * />
 * ```
 *
 * @component
 */

import { useState } from 'react';
import { IEmailInput } from '../../../../../@types/inputInterfaces';

interface StandardEmailInputProps {
  emailInput: IEmailInput;
}

export default function StandardEmailInputRefactor({
  emailInput,
}: StandardEmailInputProps) {
  const [email, setEmail] = useState(emailInput.value || '');

  return (
    <div
      className={`${
        emailInput.additionalDivClassName && emailInput.additionalDivClassName
      } 
        ${emailInput.isFlexRow ? 'flex-row' : 'flex-col'}  flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
    >
      <label
        htmlFor={emailInput.id}
        className={`${emailInput.additionalLabelClassName && emailInput.additionalLabelClassName} text-primaryBlue font-medium italic `}
      >
        E-mail
      </label>

      <input
        type="email"
        name={emailInput.name}
        id={emailInput.id}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md w-full"
        placeholder={emailInput.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete={emailInput.autoComplete}
      />
    </div>
  );
}
