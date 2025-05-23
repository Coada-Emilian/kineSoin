import BaseOutput from './BaseOutput';

interface SpecialtyOutputRefactorProps {
  specialty: string | undefined;
}

export default function SpecialtyOutputRefactor({
  specialty,
}: SpecialtyOutputRefactorProps) {
  return <BaseOutput value={specialty} label="Spécialité" />;
}
