/**
 * @component DiplomaOutputRefactor
 *
 * Displays the diploma information using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.diploma - The diploma text to display.
 *
 * @returns {JSX.Element | null} The rendered diploma output or null if diploma is undefined.
 *
 * @example
 * <DiplomaOutputRefactor diploma="Master of Science in Psychology" />
 */

import BaseOutput from './BaseOutput';

interface DiplomaOutputRefactorProps {
  diploma: string | undefined;
}

export default function DiplomaOutputRefactor({
  diploma,
}: DiplomaOutputRefactorProps) {
  return <BaseOutput value={diploma} label="Diplôme" />;
}
