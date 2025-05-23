import BaseOutput from './BaseOutput';

interface DiplomaOutputRefactorProps {
  diploma: string | undefined;
}

export default function DiplomaOutputRefactor({
  diploma,
}: DiplomaOutputRefactorProps) {
  return <BaseOutput value={diploma} label="Diplôme" />;
}
