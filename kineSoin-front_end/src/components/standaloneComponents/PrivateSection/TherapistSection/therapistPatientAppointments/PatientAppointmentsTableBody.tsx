import { IPatientAppointmentDetails } from '../../../../../@types/interfaces/customInterfaces';
import PatientAppointmentsTableRow from './PatientAppointmentsTableRow';

interface ComponentProps {
  previousAppointments: IPatientAppointmentDetails[];
  upcomingAppointments: IPatientAppointmentDetails[];
}

export default function PatientAppointmentsTableBody({
  previousAppointments,
  upcomingAppointments,
}: ComponentProps) {
  const onlyPreviousExist =
    previousAppointments.length > 0 && upcomingAppointments.length === 0;

  return (
    <tbody className="xs:text-xxxs sm:text-xxs md:text-xs">
      {previousAppointments.map((appointment, index) => {
        const isLastRow =
          onlyPreviousExist && index === previousAppointments.length - 1;

        return (
          <PatientAppointmentsTableRow
            key={appointment.id}
            appointment={appointment}
            is_past={true}
            is_last_row={isLastRow}
          />
        );
      })}

      {upcomingAppointments.map((appointment, index) => {
        const isLastRow = index === upcomingAppointments.length - 1;

        return (
          <PatientAppointmentsTableRow
            key={appointment.id}
            appointment={appointment}
            is_past={false}
            is_last_row={isLastRow}
          />
        );
      })}
    </tbody>
  );
}
