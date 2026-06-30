import { Button } from '@headlessui/react';
import { IPatientAppointmentDetails } from '../../../../../../../@types/interfaces/customInterfaces';
import { formatDate } from '../../../../../../../utils/functions/privateSection/therapistSection/formatDate';
import BaseOutput from '../../../../../generalComponents/BaseOutput';
import Section from './Section';

interface SectionProps {
  appointment: IPatientAppointmentDetails;
}

export default function PrescriptionSection({ appointment }: SectionProps) {
  return (
    <Section title="Ordonnance">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseOutput label="ID" value={appointment.prescription.id} />
        <BaseOutput
          label="Date"
          value={formatDate(appointment.prescription.date)}
        />
        <BaseOutput
          label="Séances prescrites"
          value={appointment.prescription.appointment_quantity}
        />
        <BaseOutput
          label="Séances complétées"
          value={appointment.prescription.completed_appointment_quantity}
        />
        <BaseOutput
          label="Soins à domicile"
          value={appointment.prescription.at_home_care ? 'Oui' : 'Non'}
        />
      </div>

      <Button className="mt-4 text-primaryBlue underline font-semibold text-sm hover:scale-105 transition-transform">
        Voir scan
      </Button>
    </Section>
  );
}
