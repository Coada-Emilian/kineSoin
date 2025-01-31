import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import French locale for Day.js
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
  // Set the Day.js locale to French globally
  dayjs.locale('fr');

  // Set up the localizer with Day.js
  const localizer = dayjsLocalizer(dayjs);

  const [patientPrescriptions, setPatientPrescriptions] = useState<
    IPrescription[]
  >([]);
  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  const [pastAppointments, setPastAppointments] = useState<IAppointment[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<
    { title: string; start: Date; end: Date; status: string }[] // Add status field
  >([]);

  useEffect(() => {
    const fetchPatientPrescriptionsAndSet = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientPrescriptions(patientId);
        if (response) {
          setPatientPrescriptions(response);
        } else {
          setPatientPrescriptions([]);
        }
      }
    };
    fetchPatientPrescriptionsAndSet();
  }, [patientId]);

  // Update calendar events based on future and past appointments
  useEffect(() => {
    const events = [
      ...futureAppointments.map((appointment) => ({
        title: `Rendez-vous #${appointment.id}`,
        start: dayjs(appointment.date).toDate(),
        end: dayjs(appointment.date).toDate(),
        status: 'future', // Mark as future event
      })),
      ...pastAppointments.map((appointment) => ({
        title: `Rendez-vous #${appointment.id}`,
        start: dayjs(appointment.date).toDate(),
        end: dayjs(appointment.date).toDate(),
        status: 'past', // Mark as past event
      })),
    ];
    setCalendarEvents(events);
  }, [futureAppointments, pastAppointments]);

  // Event style getter to apply different colors based on event status
  interface EventStyle {
    backgroundColor: string;
    borderRadius: string;
  }

  const eventStyleGetter = (event: CalendarEvent): { style: EventStyle } => {
    let style: EventStyle = {
      backgroundColor: 'green', // Default to green for future events
      borderRadius: '5px',
    };

    if (event.status === 'past') {
      style.backgroundColor = 'red'; // Red for past events
    }

    return { style };
  };

  // Event click handler
  interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    status: string;
  }

  const handleEventClick = (event: CalendarEvent): void => {
    alert(`Event clicked: ${event.title}`);
  };

  return (
    <>
      {calendarEvents.length === 0 && <p>Aucun rendez-vous à afficher</p>}
      <StandardChoiceDropdown
        isPrescriptionDropdownInput
        patientPrescriptions={patientPrescriptions}
        patientId={patientId}
        setFutureAppointments={setFutureAppointments}
        setPastAppointments={setPastAppointments}
      />

      <div className="w-10/12 h-96 md:w-full md:h-full">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          culture="fr" // Use French culture
          formats={{
            dayFormat: 'DD MMM', // Customize the day format
            monthHeaderFormat: 'MMMM YYYY', // Customize the month header format
          }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
        />
      </div>
    </>
  );
}
