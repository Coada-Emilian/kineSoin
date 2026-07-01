/**
 * @component DescriptionOutputRefactor
 *
 * Displays a description text area using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.description - The description text to display.
 *
 * @returns {JSX.Element | null} The rendered description output as a read-only textarea, or null if description is undefined.
 *
 * @example
 * <DescriptionOutputRefactor description="Detailed description about the entity." />
 */

import BaseOutput from '../BaseOutput';

interface DescriptionOutputRefactorProps {
  description: string | undefined;
}

export default function DescriptionOutputRefactor({
  description,
}: DescriptionOutputRefactorProps) {
  return <BaseOutput value={description} label="Description" isTextArea />;
}
