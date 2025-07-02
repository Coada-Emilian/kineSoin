/**
 * @component ExperienceOutputRefactor
 *
 * Displays the experience information using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.experience - The experience text to display.
 *
 * @returns {JSX.Element | null} The rendered experience output or null if experience is undefined.
 *
 * @example
 * <ExperienceOutputRefactor experience="5 years in pediatrics" />
 */

import BaseOutput from '../BaseOutput';

interface ExperienceOutputRefactorProps {
  experience: string | undefined;
}

export default function ExperienceOutputRefactor({
  experience,
}: ExperienceOutputRefactorProps) {
  return <BaseOutput value={experience} label="Experience" />;
}
