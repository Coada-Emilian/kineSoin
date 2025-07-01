import BaseOutput from '../../../../generalComponents/BaseOutput';

interface GenderOutputRefactorProps {
  gender: string | undefined;
}

export default function GenderOutputRefactor({
  gender,
}: GenderOutputRefactorProps) {
  // If no gender is provided, return null
  if (!gender) return null;

  // Function to get the French gender
  const getFrenchGender = (gender: string | undefined): string => {
    if (gender === 'male') return 'Masculin';
    if (gender === 'female') return 'Féminin';
    return 'Autre';
  };

  return (
    <BaseOutput value={getFrenchGender(gender)} label="Genre" isOneThirdWidth />
  );
}
