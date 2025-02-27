import BaseOutput from './BaseOutput';

interface IsOperatedOutputRefactorProps {
  is_operated: boolean | undefined;
}

export default function IsOperatedOutputRefactor({
  is_operated,
}: IsOperatedOutputRefactorProps) {
  if (!is_operated) {
    return null;
  }
  const operatedStatus = is_operated ? 'Oui' : 'Non';

  return (
    <BaseOutput value={operatedStatus} label="Est opérée?" isOneThirdWidth />
  );
}
