import { Activity, FileText, History } from 'lucide-react';
import type { ISameDayAppointment } from '../../../../../@types/interfaces/therapistInterfaces';
import type { TherapistDashboardAppointmentsTableProps } from '../../../../../@types/props/therapistProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { generateTimeSlots } from '../../../../../utils/functions/generateTimeSlots';
import { getCurrentTime } from '../../../../../utils/functions/getCurrentTime';
import { formatDashboardAppointment } from '../../../../../utils/functions/therapist/dashboard/formatDashboardAppointment';
import ActionDropdown from '../../../../ui/ActionDropdown';
import ActionButton from '../../../../ui/buttons/ActionButton';
import calendarIcon from '/icons/calendar_128.png';
import calendarClosedIcon from '/icons/calendarClosed_128.png';
import cancelIcon from '/icons/cancel_128.png';
import cancelClosedIcon from '/icons/cancelClosed_128.png';
import messageIcon from '/icons/message_128.png';
import messageClosedIcon from '/icons/messageClosed_128.png';
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
      setOpenModal('extendedMessage');
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

  const handleAfflictionClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedAppointment(appointment);
      setOpenModal('afflictionDetails');
    }
  };

  const handlePrescriptionsClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedPrescription(appointment.prescription);
      setOpenModal('prescriptionDetails');
    }
  };

  const handleHistoryClick = () => {
    console.log('History clicked');
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
                  <div
                    className={`group flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left transition-all duration-150`}
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
                  </div>
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  <div className="flex flex-col items-start">
                    <span className={`${data?.classes.primaryText}`}>
                      {data?.afflictionBodyRegion?.toUpperCase()}
                    </span>

                    <button
                      className={`${isTimePassed ? 'italic text-gray-500 font-normal' : ''}`}
                    >
                      <span className={` ${data?.classes.secondaryText}`}>
                        {data?.afflictionName}
                      </span>
                    </button>
                  </div>
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  {data?.lastAppointment ? (
                    <div className="flex items-center gap-3 justify-center">
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
                    <>
                      <ActionButton
                        onClick={() => handlePatientDetailsClick(appointment)}
                        imgSrc={viewIcon}
                        altText="view"
                        isTimePassed={isTimePassed}
                        altImgSrc={viewClosedIcon}
                      />

                      <ActionButton
                        onClick={() => handleMessageIconClick(appointment)}
                        imgSrc={messageIcon}
                        altText="message"
                        isTimePassed={isTimePassed}
                        altImgSrc={messageClosedIcon}
                      />

                      <ActionButton
                        onClick={() => handleCancelIconClick(appointment)}
                        imgSrc={cancelIcon}
                        altText="appointment"
                        isTimePassed={isTimePassed}
                        altImgSrc={cancelClosedIcon}
                      />

                      <ActionDropdown
                        actions={[
                          {
                            label: 'Affection',
                            icon: <Activity className="h-4 w-4 shrink-0" />,
                            onClick: () => handleAfflictionClick(appointment),
                          },
                          {
                            label: 'Ordonnance',
                            icon: <FileText className="h-4 w-4 shrink-0" />,
                            onClick: () =>
                              handlePrescriptionsClick(appointment),
                          },
                          {
                            label: 'Historique',
                            icon: <History className="h-4 w-4 shrink-0" />,
                            onClick: handleHistoryClick,
                          },
                        ]}
                        isTimePassed={isTimePassed}
                      />
                    </>
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
