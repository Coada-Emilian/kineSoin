import BaseOutput from './BaseOutput';

interface InsuranceCodeOutputRefactorProps {
  insurance_code: string | undefined;
}

export default function InsuranceCodeOutputRefactor({
  insurance_code,
}: InsuranceCodeOutputRefactorProps) {
  return <BaseOutput value={insurance_code} label="Code Assurance" />;
}
