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
  // Function to get the French gender
  const getFrenchGender = (gender: string | undefined): string => {
    if (gender === 'male') return 'Masculin';
    if (gender === 'female') return 'Féminin';
    return 'Autre';
  };

  return (
    <div className="flex flex-row justify-between">
      <BaseOutput value={age} label="Age" isOneThirdWidth />

      {gender && (
        <BaseOutput
          value={getFrenchGender(gender)}
          label="Genre"
          isOneThirdWidth
        />
      )}
    </div>
  );
}
