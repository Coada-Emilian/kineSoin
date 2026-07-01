import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import French locale for Day.js
import { useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import { useAppointmentsContext } from '../../../../../utils/contexts/therapistSectionContext/AppointmentsContext';
import { useCalendarContext } from '../../../../../utils/contexts/therapistSectionContext/CalendarContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchAllAppointmentsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchAllAppointmentsByTherapist';
import { transformAppointmentsToCalendarEvents } from '../../../../../utils/functions/privateSection/therapistSection/transformAppointmentsToCalendarEvents';

export default function TherapistAppointmentsCalendar() {
  dayjs.locale('fr');

  // Set up the localizer with Day.js
  const localizer = dayjsLocalizer(dayjs);

  const { allAppointments, setAllAppointments } = useAppointmentsContext();

  const { calendarEvents, setCalendarEvents } = useCalendarContext();

  const { isLoading, isFetching } = useFetchAllAppointmentsByTherapist({
    setAllAppointments,
  });

  useEffect(() => {
    const formattedEvents =
      transformAppointmentsToCalendarEvents(allAppointments);
    setCalendarEvents(formattedEvents);
  }, [allAppointments]);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  return (
    <div className="w-10/12 h-96 md:w-full md:h-full shadow-2xl rounded-xl mx-auto mt-4">
      <Calendar
        messages={{
          today: "Aujourd'hui",
          previous: 'Précédent',
          next: 'Suivant',
          month: 'Mois',
          week: 'Semaine',
          work_week: 'Semaine ouvrée',
          day: 'Jour',
          agenda: 'Agenda',
          date: 'Date',
          time: 'Heure',
          event: 'Événement',
          noEventsInRange: 'Aucun événement dans cette période',
          showMore: (total) => `+ ${total} de plus`,
        }}
        defaultView="week"
        step={30}
        timeslots={1}
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        culture="fr"
        min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 20, 0)}
        formats={{
          dayFormat: 'DD MMM',
          monthHeaderFormat: 'MMMM YYYY',
          eventTimeRangeFormat: () => '', // ⬅️ Remove displayed time
        }}
        components={{
          event: ({ event }) => (
            <Link
              to={`/therapist/patient/${event.patientId}/appointments/${event.id}`}
            >
              <div className="w-full h-full flex items-center justify-center text-sm text-center font-medium bg-secondaryBlue hover:bg-primaryBlue hover:rounded-lg text-white p-2">
                <span className="hover:scale-110">{event.title}</span>
              </div>
            </Link>
          ),
        }}
      />
    </div>
  );
}
