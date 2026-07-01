import { IPatientAppointmentDetails } from '../../../../../../../@types/interfaces/customInterfaces';
import BaseOutput from '../../../../../generalComponents/BaseOutput';
import Section from './Section';

interface SectionProps {
  appointment: IPatientAppointmentDetails;
}

export default function AfflictionSection({ appointment }: SectionProps) {
  return (
    <Section title="Affection">
      <BaseOutput
        label="Nom"
        value={appointment.prescription.affliction.name}
      />
      <BaseOutput
        label="Description"
        value={appointment.prescription.affliction.description}
        isTextArea
      />
    </Section>
  );
}
