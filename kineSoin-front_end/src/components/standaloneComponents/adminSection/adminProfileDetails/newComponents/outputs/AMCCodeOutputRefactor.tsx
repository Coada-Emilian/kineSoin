/**
 * @component AMCCodeOutputRefactor
 *
 * Displays the AMC code using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.amc_code - The AMC code to display.
 *
 * @returns {JSX.Element | null} The rendered AMC code output or null if amc_code is undefined.
 *
 * @example
 * <AMCCodeOutputRefactor amc_code="12345" />
 */

import BaseOutput from './BaseOutput';

interface AMCCodeOutputRefactorProps {
  amc_code: string | undefined;
}

export default function AMCCodeOutputRefactor({
  amc_code,
}: AMCCodeOutputRefactorProps) {
  return <BaseOutput value={amc_code} label="Code AMC" />;
}
