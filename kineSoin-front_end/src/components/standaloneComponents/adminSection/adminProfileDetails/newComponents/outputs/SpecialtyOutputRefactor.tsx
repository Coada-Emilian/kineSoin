/**
 * @component SpecialtyOutputRefactor
 *
 * Displays the specialty information using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.specialty - The specialty text to display.
 *
 * @returns {JSX.Element | null} The rendered specialty output or null if specialty is undefined.
 *
 * @example
 * <SpecialtyOutputRefactor specialty="Cardiology" />
 */

import BaseOutput from './BaseOutput';

interface SpecialtyOutputRefactorProps {
  specialty: string | undefined;
}

export default function SpecialtyOutputRefactor({
  specialty,
}: SpecialtyOutputRefactorProps) {
  return <BaseOutput value={specialty} label="Spécialité" />;
}
