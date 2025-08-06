import { IPatientAppointmentDetails } from '../../../../../../../@types/interfaces/customInterfaces';
import BaseOutput from '../../../../../generalComponents/BaseOutput';
import Section from './Section';

interface SectionProps {
  appointment: IPatientAppointmentDetails;
}

export default function TherapistSection({ appointment }: SectionProps) {
  return (
    <Section title="Thérapeute">
      <BaseOutput
        label="Nom"
        value={`${appointment.therapist.name} ${appointment.therapist.surname}`}
      />
    </Section>
  );
}
