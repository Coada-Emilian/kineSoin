/**
 * @component EmailOutputRefactor
 *
 * Displays an email address using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.email - The email address to display.
 *
 * @returns {JSX.Element | null} The rendered email output or null if no email is provided.
 *
 * @example
 * <EmailOutputRefactor email="user@example.com" />
 */

import BaseOutput from '../../../../generalComponents/BaseOutput';

interface EmailOutputRefactorProps {
  email: string | undefined;
}

export default function EmailOutputRefactor({
  email,
}: EmailOutputRefactorProps) {
  return <BaseOutput label="E-mail" value={email} />;
}
