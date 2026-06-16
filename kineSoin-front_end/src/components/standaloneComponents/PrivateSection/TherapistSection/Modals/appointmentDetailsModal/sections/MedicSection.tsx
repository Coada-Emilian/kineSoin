import { IPatientAppointmentDetails } from '../../../../../../../@types/interfaces/customInterfaces';
import BaseOutput from '../../../../../generalComponents/BaseOutput';
import Section from './Section';
import messageIcon from '/icons/message3.png';
import phoneIcon from '/icons/phone-call.png';

interface SectionProps {
  appointment: IPatientAppointmentDetails;
}

export default function TherapistSection({ appointment }: SectionProps) {
  return (
    <Section title="Médecin prescripteur">
      <div className="flex gap-4">
        <BaseOutput
          label="Nom"
          value={`${appointment.prescription.medic.name} ${appointment.prescription.medic.surname}`}
        />

        <div className="flex gap-2">
          <a
            href={`mailto:${appointment.prescription.medic.email}`}
            className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
          >
            <img src={messageIcon} alt="send mail" className="w-8 md:w-10" />
          </a>

          <a
            href={`tel:${appointment.prescription.medic.prefix}${appointment.prescription.medic.phone_number}`}
            className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
          >
            <img
              src={phoneIcon}
              alt="send mail"
              className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
            />
          </a>
        </div>
      </div>
    </Section>
  );
}
