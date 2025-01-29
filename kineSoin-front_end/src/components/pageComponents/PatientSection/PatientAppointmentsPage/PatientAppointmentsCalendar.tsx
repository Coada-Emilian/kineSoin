import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StandardChoiceDropdown from '../../standaloneComponents/StandardInputs/StandardDropdownInput';
import { useEffect, useState } from 'react';
import { IPrescription } from '../../../../@types/IPrescription';
import { fetchPatientPrescriptions } from '../../../../utils/apiUtils';
import { IAppointment } from '../../../../@types/IAppointment';

interface PatientAppointmentsCalendarProps {
  patientId?: number;
}

export default function PatientAppointmentsCalendar({
  patientId,
}: PatientAppointmentsCalendarProps) {
  const localizer = dayjsLocalizer(dayjs);

  const [patientPrescriptions, setPatientPrescriptions] = useState<
    IPrescription[]
  >([]);

  useEffect(() => {
    const fetchPatientPrescriptionsAndSet = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientPrescriptions(patientId);
        setPatientPrescriptions(response);
      }
    };
    fetchPatientPrescriptionsAndSet();
  }, [patientId]);

  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  const [pastAppointments, setPastAppointments] = useState<IAppointment[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<
    { title: string; start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    const events = futureAppointments.map((appointment) => {
      return {
        title: `Appointment ${appointment.id}`,
        start: new Date(appointment.date),
        end: new Date(appointment.date),
      };
    });
    setCalendarEvents(events);
  }, [futureAppointments, pastAppointments]);

  useEffect(() => {
    console.log('futureAppointments', futureAppointments);
    console.log('pastAppointments', pastAppointments);
  }, [futureAppointments, pastAppointments]);
  return (
    <>
      <StandardChoiceDropdown
        isPrescriptionDropdownInput
        patientPrescriptions={patientPrescriptions}
        patientId={patientId}
        setFutureAppointments={setFutureAppointments}
        setPastAppointments={setPastAppointments}
      />

      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}
