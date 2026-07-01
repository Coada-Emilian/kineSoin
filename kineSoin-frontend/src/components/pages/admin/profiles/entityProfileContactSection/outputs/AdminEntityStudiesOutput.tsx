import type { AdminEntityStudiesOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import educationIcon from '/icons/education.png';
import experienceIcon from '/icons/experience.png';
import specialtyIcon from '/icons/quality.png';

export default function AdminEntityStudiesOutput({
  diploma,
  experience,
  specialty,
}: AdminEntityStudiesOutputProps) {
  return (
    <AdminEntityProfileInfoOutput
      icon={
        diploma ? educationIcon : experience ? experienceIcon : specialtyIcon
      }
      iconAlt={diploma ? 'diplôme' : experience ? 'experience' : 'spécialité'}
      label={diploma ? 'Diplôme' : experience ? 'Experience' : 'Spécialité'}
      value={
        diploma
          ? (diploma as string)
          : experience
            ? (experience as string)
            : (specialty as string)
      }
    ></AdminEntityProfileInfoOutput>
  );
}
