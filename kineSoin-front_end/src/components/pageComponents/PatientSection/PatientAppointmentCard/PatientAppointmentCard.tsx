import { useEffect, useState } from 'react';
import { IAppointment } from '../../../../@types/IAppointment';
import CalendarIcon from '/icons/calendar.png';
import TimeIcon from '/icons/clock.png';

interface PatientAppointmentCardProps {
  appointment: IAppointment;
}

export default function PatientAppointmentCard({
  appointment,
}: PatientAppointmentCardProps) {
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');

  useEffect(() => {
    if (appointment.date) {
      // Convert YYYY-MM-DD to a French localized format
      const date = new Date(appointment.date);
      const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long', // Full day name
        day: 'numeric', // Numeric day
        month: 'long', // Full month name
        year: 'numeric', // Full year
      }).format(date);
      setAppointmentDate(formattedDate);
    }

    if (appointment.time) {
      try {
        // Create a Date object using only the time
        const [hours, minutes, seconds] = appointment.time
          .split(':')
          .map(Number);
        const time = new Date();
        time.setHours(hours, minutes, seconds || 0); // Set hours, minutes, and seconds

        // Format the time for display
        const formattedTime = new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // Use 24-hour format
        }).format(time);

        setAppointmentTime(formattedTime);
      } catch (error) {
        console.error('Error parsing time:', error);
      }
    }
  }, [appointment.date, appointment.time]);

  return (
    <div className="w-3/4 md:w-1/2 border border-gray-700 rounded-xl text-xxs md:text-sm">
      <div className="flex justify-between gap-5 bg-cardHeader rounded-t-xl p-2 ">
        <div className="flex gap-2 items-center">
          <img src={CalendarIcon} alt="Date" className="w-5" />
          <p className="text-white">{appointmentDate}</p>
        </div>

        <div className="flex gap-2 items-center">
          <img src={TimeIcon} alt="Time" className="w-5" />
          <p className="text-white">{appointmentTime}</p>
        </div>
      </div>
      <div className="text-center">
        <p>
          {appointment.therapist?.name} {''}
          {appointment.therapist?.surname}
        </p>
        <p>Masseur-kinésithérapeute</p>
        <p>{appointment.therapist?.specialty}</p>
        <p>{appointment.prescription?.at_home_care && 'A domicile'}</p>
      </div>
    </div>
  );
}
