import BaseOutput from './BaseOutput';

interface AgeAndGenderOutputRefactorProps {
  age: string | undefined;
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
