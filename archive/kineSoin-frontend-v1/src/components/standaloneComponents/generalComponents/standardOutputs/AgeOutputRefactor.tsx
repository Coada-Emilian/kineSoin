import BaseOutput from '../BaseOutput';

interface AgeOutputRefactorProps {
  age: number | undefined;
}

export default function AgeOutputRefactor({ age }: AgeOutputRefactorProps) {
  return <BaseOutput value={age} label="Age" isOneThirdWidth />;
}
