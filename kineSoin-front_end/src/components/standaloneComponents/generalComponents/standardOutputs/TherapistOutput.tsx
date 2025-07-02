import BaseOutput from '../BaseOutput';

interface TherapistOutputProps {
  therapist_name: string | undefined;
  therapist_surname: string | undefined;
}

export default function TherapistOutput({
  therapist_name,
  therapist_surname,
}: TherapistOutputProps) {
  return (
    <BaseOutput
      label="Thérapeute"
      value={`${therapist_name} ${therapist_surname}`}
    />
  );
}
