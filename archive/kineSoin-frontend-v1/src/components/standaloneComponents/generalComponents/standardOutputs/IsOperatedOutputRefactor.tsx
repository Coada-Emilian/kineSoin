import BaseOutput from '../BaseOutput';

interface IsOperatedOutputRefactorProps {
  is_operated: string | undefined;
}

export default function IsOperatedOutputRefactor({
  is_operated,
}: IsOperatedOutputRefactorProps) {
  if (is_operated === undefined) {
    return null;
  }

  return <BaseOutput value={is_operated} label="Est opérée?" isOneThirdWidth />;
}
