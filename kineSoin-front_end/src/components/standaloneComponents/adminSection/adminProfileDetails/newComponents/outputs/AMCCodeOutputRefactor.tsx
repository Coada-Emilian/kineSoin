import BaseOutput from './BaseOutput';

interface AMCCodeOutputRefactorProps {
  amc_code: string | undefined;
}

export default function AMCCodeOutputRefactor({
  amc_code,
}: AMCCodeOutputRefactorProps) {
  return <BaseOutput value={amc_code} label="Code AMC" />;
}
