import type { ISameDayAppointment } from '../../../../../@types/interfaces/therapistInterfaces';
import type { TherapistDashboardAppointmentsTableProps } from '../../../../../@types/props/therapistProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { generateTimeSlots } from '../../../../../utils/functions/generateTimeSlots';
import { getCurrentTime } from '../../../../../utils/functions/getCurrentTime';
import { formatDashboardAppointment } from '../../../../../utils/functions/therapist/dashboard/formatDashboardAppointment';
import calendarIcon from '/icons/calendar_128.png';
import calendarClosedIcon from '/icons/calendarClosed_128.png';
import cancelIcon from '/icons/cancel_128.png';
import cancelClosedIcon from '/icons/cancelClosed_128.png';
import messageIcon from '/icons/message_128.png';
import messageClosedIcon from '/icons/messageClosed_128.png';
import moreIcon from '/icons/more_128.png';
import moreClosedIcon from '/icons/moreClosed_128.png';
import viewIcon from '/icons/view_128.png';
import viewClosedIcon from '/icons/viewClosed_128.png';

export default function TherapistDashboardTableBody({
  appointments,
}: TherapistDashboardAppointmentsTableProps) {
  const { setOpenModal } = useUTherapistUiContext();

  const {
    setSelectedPatient,
    setSelectedAppointment,
    setSelectedPrescription,
  } = useTherapistSelectionContext();

  const timeSlots = generateTimeSlots();

  const currentTime = getCurrentTime();

  const handleMessageIconClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedPatient(appointment.patient);
      setOpenModal('message');
    }
  };

  const handleCancelIconClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedAppointment(appointment);
      setSelectedPatient(appointment.patient);
      setSelectedPrescription(appointment.prescription);
      setOpenModal('cancel');
    }
  };

  const handlePatientDetailsClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedPatient(appointment.patient);
      setOpenModal('patientDetails');
    }
  };

  const handleAfflictionNameClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedAppointment(appointment);
      setOpenModal('afflictionDetails');
    }
  };

  const handleMoreIconClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      console.log('More icon clicked', appointment.patient);
    }
  };

  return (
    <tbody className="xs:text-xxs sm:text-xs md:text-sm">
      {timeSlots.map((time, index) => {
        const appointment = appointments.find(
          (appointment: ISameDayAppointment) => appointment.time === time
        );

        const isTimePassed = currentTime > time;

        if (appointment) {
          appointment.isTimePassed = isTimePassed;
        }

        const data = formatDashboardAppointment(appointment, isTimePassed);

        return (
          <tr
            key={index}
            className="transition-colors duration-150 hover:bg-teal-50/40"
          >
            <td
              className={`border-b border-slate-200 font-medium text-slate-700 px-4 py-3 text-center`}
            >
              {time}
            </td>

            {appointment ? (
              <>
                <td className="border-b border-slate-200 px-4 py-3">
                  <button
                    onClick={() => handlePatientDetailsClick(appointment)}
                    className={`group flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left ${isTimePassed ? '' : 'cursor-pointer'} transition-all duration-150`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold transition-all duration-150 ${data?.classes.avatar}`}
                    >
                      {data?.patientNameInitials}
                    </div>

                    <div className="min-w-0">
                      <p className={`${data?.classes.primaryText}`}>
                        {data?.patientFullName}
                      </p>

                      <p className={`text-xs ${data?.classes.secondaryText}`}>
                        {data?.patientEmail}
                      </p>

                      <p className={`text-xs ${data?.classes.secondaryText}`}>
                        {data?.patientFullPhoneNumber}
                      </p>
                    </div>
                  </button>
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  <div className="flex flex-col items-start">
                    <span className={`${data?.classes.primaryText}`}>
                      {data?.afflictionBodyRegion?.toUpperCase()}
                    </span>

                    <button
                      className={`${isTimePassed ? 'italic text-gray-500 font-normal' : 'hover:text-secondaryBlue hover:transform hover:scale-105 cursor-pointer'}`}
                      onClick={() => handleAfflictionNameClick(appointment)}
                    >
                      <span className={` ${data?.classes.secondaryText}`}>
                        {data?.afflictionName}
                      </span>
                    </button>
                  </div>
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  {data?.lastAppointment ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={isTimePassed ? calendarClosedIcon : calendarIcon}
                        alt="appointment"
                        className="w-4 md:w-5 shrink-0"
                      />

                      <div className="text-left">
                        <p className={`${data?.classes.primaryText}`}>
                          {data?.lastAppointment.date}
                        </p>
                        <p
                          className={`${data?.classes.secondaryText} text-xs tracking-wide`}
                        >
                          {data?.lastAppointment.time}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-sm italic text-slate-400">
                      —
                    </p>
                  )}
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handlePatientDetailsClick(appointment)}
                      className={`group flex h-9 w-9 items-center justify-center rounded-lg ${data?.classes.iconButton}`}
                    >
                      <img
                        src={isTimePassed ? viewClosedIcon : viewIcon}
                        alt="view"
                        className={data?.classes.icon}
                      />
                    </button>
                    <button
                      onClick={() => handleMessageIconClick(appointment)}
                      className={`group flex h-9 w-9 items-center justify-center rounded-lg ${data?.classes.iconButton}`}
                    >
                      <img
                        src={isTimePassed ? messageClosedIcon : messageIcon}
                        alt="message"
                        className={data?.classes.icon}
                      />
                    </button>
                    <button
                      onClick={() => handleCancelIconClick(appointment)}
                      className={`group flex h-9 w-9 items-center justify-center rounded-lg ${data?.classes.iconButton}`}
                    >
                      <img
                        src={isTimePassed ? cancelClosedIcon : cancelIcon}
                        alt="appointment"
                        className={data?.classes.icon}
                      />
                    </button>

                    <button
                      onClick={() => handleMoreIconClick(appointment)}
                      className={`group flex h-9 w-9 items-center justify-center rounded-lg ${data?.classes.iconButton}`}
                    >
                      <img
                        src={isTimePassed ? moreClosedIcon : moreIcon}
                        alt="more"
                        className={data?.classes.icon}
                      />
                    </button>
                  </div>
                </td>
              </>
            ) : (
              <td
                className="border-b border-slate-200 px-4 py-3 text-center font-medium italic text-gray-500"
                colSpan={4}
              >
                Aucun rendez-vous
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
