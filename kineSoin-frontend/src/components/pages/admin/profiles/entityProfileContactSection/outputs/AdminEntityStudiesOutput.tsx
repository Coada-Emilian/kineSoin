import type { AdminEntityStudiesOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityStudiesOutput({
  diploma,
  experience,
  specialty,
}: AdminEntityStudiesOutputProps) {
  return (
    <AdminEntityProfileOutput
      value={diploma ? diploma : experience ? experience : specialty}
      label={diploma ? 'Diplôme' : experience ? 'Experience' : 'Spécialité'}
    />
  );
}
