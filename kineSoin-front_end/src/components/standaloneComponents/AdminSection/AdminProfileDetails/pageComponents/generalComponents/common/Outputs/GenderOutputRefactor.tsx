import BaseOutput from './BaseOutput';

interface GenderOutputRefactorProps {
  gender: string | undefined;
}

export default function GenderOutputRefactor({
  gender,
}: GenderOutputRefactorProps) {
  const getFrenchGender = (gender: string | undefined): string => {
    if (gender === 'male') return 'Masculin';
    if (gender === 'female') return 'Féminin';
    return 'Autre';
  };

  return (
    <BaseOutput value={getFrenchGender(gender)} label="Genre" isOneThirdWidth />
  );
}
