import BaseOutput from './BaseOutput';

interface LicenceCodeOutputRefactorProps {
  licence_code: string | undefined;
}

export default function LicenceCodeOutputRefactor({
  licence_code,
}: LicenceCodeOutputRefactorProps) {
  return <BaseOutput value={licence_code} label="Code ADELI" />;
}
