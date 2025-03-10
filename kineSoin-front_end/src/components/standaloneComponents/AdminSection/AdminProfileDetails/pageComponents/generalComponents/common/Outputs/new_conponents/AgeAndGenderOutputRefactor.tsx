import AgeOutputRefactor from './AgeOutputRefactor';
import BaseOutput from './BaseOutput';
import GenderOutputRefactor from './GenderOutputRefactor';

interface AgeAndGenderOutputRefactorProps {
  age: number | undefined;
  gender: string | undefined;
}

export default function AgeAndGenderOutputRefactor({
  age,
  gender,
}: AgeAndGenderOutputRefactorProps) {
  return (
    <div className="flex flex-row justify-between">
      <AgeOutputRefactor age={age} />
      <GenderOutputRefactor gender={gender} />
    </div>
  );
}
