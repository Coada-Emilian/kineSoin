/**
 * @component InsuranceCodeOutputRefactor
 *
 * Displays the insurance code using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.insurance_code - The insurance code to display.
 *
 * @returns {JSX.Element | null} The rendered insurance code output or null if insurance_code is undefined.
 *
 * @example
 * <InsuranceCodeOutputRefactor insurance_code="INS-98765" />
 */

import BaseOutput from '../BaseOutput';

interface InsuranceCodeOutputRefactorProps {
  insurance_code: string | undefined;
}

export default function InsuranceCodeOutputRefactor({
  insurance_code,
}: InsuranceCodeOutputRefactorProps) {
  return <BaseOutput value={insurance_code} label="Code Assurance" />;
}
