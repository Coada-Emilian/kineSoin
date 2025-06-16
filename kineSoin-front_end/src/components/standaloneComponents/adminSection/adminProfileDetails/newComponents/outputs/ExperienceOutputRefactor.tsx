import BaseOutput from './BaseOutput';

interface ExperienceOutputRefactorProps {
  experience: string | undefined;
}

export default function ExperienceOutputRefactor({
  experience,
}: ExperienceOutputRefactorProps) {
  return <BaseOutput value={experience} label="Experience" />;
}
