/**
 * @component LicenceCodeOutputRefactor
 *
 * Displays the ADELI license code using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.licence_code - The ADELI license code to display.
 *
 * @returns {JSX.Element | null} The rendered licence code output or null if licence_code is undefined.
 *
 * @example
 * <LicenceCodeOutputRefactor licence_code="ADELI-123456" />
 */

import BaseOutput from '../BaseOutput';

interface LicenceCodeOutputRefactorProps {
  licence_code: string | undefined;
}

export default function LicenceCodeOutputRefactor({
  licence_code,
}: LicenceCodeOutputRefactorProps) {
  return <BaseOutput value={licence_code} label="Code ADELI" />;
}
