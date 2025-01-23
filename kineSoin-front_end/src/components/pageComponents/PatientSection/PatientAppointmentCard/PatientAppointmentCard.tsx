import CalendarIcon from '/icons/calendar.png';
import TimeIcon from '/icons/clock.png';

export default function PatientAppointmentCard({}) {
  return (
    <div className="w-fit border border-gray-700 rounded-xl">
      <div className="flex justify-between gap-5 bg-cardHeader rounded-t-xl p-5">
        <div className="flex gap-2 items-center">
          <img src={CalendarIcon} alt="Date" className="w-5" />
          <p className="text-white">Date</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={TimeIcon} alt="Time" className="w-5" />
          <p className="text-white">Time</p>
        </div>
      </div>
      <div className="text-center">
        <p>FullName</p>
        <p>Massage</p>
        <p>A domcilie</p>
      </div>
    </div>
  );
}
