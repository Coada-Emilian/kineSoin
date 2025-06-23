/**
 * @component NameOutputRefactor
 *
 * Combines first name and surname into a full name string and displays it using BaseOutput.
 *
 * @param {Object} props
 * @param {string | undefined} props.name - The first name of the entity.
 * @param {string | undefined} props.surname - The surname of the entity.
 *
 * @returns {JSX.Element} A BaseOutput component displaying the full name or just the name if surname is missing.
 *
 * @example
 * <NameOutputRefactor name="John" surname="Doe" />
 * <NameOutputRefactor name="Cher" surname={undefined} />
 */

import BaseOutput from './BaseOutput';

interface NameOutputRefactorProps {
  name: string | undefined;
  surname: string | undefined;
}

export default function NameOutputRefactor({
  name,
  surname,
}: NameOutputRefactorProps) {
  // Full name logic
  const fullName = name && surname ? `${name} ${surname}` : name;

  return <BaseOutput label="Nom" value={fullName} />;
}
