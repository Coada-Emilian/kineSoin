/**
 * @component AgeAndGenderOutputRefactor
 *
 * Displays the age and gender information in a formatted output,
 * converting gender values to their French equivalents.
 *
 * @param {Object} props
 * @param {string | undefined} props.age - The age to display.
 * @param {string | undefined} props.gender - The gender to display ('male', 'female', or other).
 *
 * @returns {JSX.Element} A container with age and gender outputs.
 *
 * @example
 * <AgeAndGenderOutputRefactor age="30" gender="male" />
 */

import BaseOutput from '../BaseOutput';

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
