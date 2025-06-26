import { Button } from '@headlessui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ISameDayAppointment } from '../../../../../@types/interfaces/customInterfaces';
import { useTherapistDayTableContext } from '../../../../../utils/contexts/TherapistDayTableContext';
import { generateTimeSlots } from '../../../../../utils/functions/privateSection/therapistSection/generateTimeSlots';
import cancelIcon from '/icons/cancel.png';
import cancelIcon2 from '/icons/cancel2.png';
import messageIcon from '/icons/message.png';
import messageIcon2 from '/icons/message2.png';

export default function DayTableBody() {
  const timeSlots = generateTimeSlots();

  const {
    tableAppointments,
    setIsSendMessageModalOpen,
    setIsCancelAppointmentModalOpen,
    setSelectedPatient,
    setSelectedAppointment,
    setSelectedPrescription,
  } = useTherapistDayTableContext();

  const handleMessageIconClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedPatient(appointment.patient);
      setIsSendMessageModalOpen(true);
    }
  };

  const handleCancelIconClick = (appointment: ISameDayAppointment) => {
    if (!appointment.isTimePassed) {
      setSelectedAppointment(appointment);
      setSelectedPatient(appointment.patient);
      setSelectedPrescription(appointment.prescription);
      setIsCancelAppointmentModalOpen(true);
    }
  };

  return (
    <tbody className="xs:text-xxs sm:text-xs md:text-sm">
      {timeSlots.map((time, index) => {
        const appointment = tableAppointments.find(
          (appointment) => appointment.time === time
        );

        return (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {time}
            </td>

            {appointment ? (
              <>
                <td
                  className={`${appointment.isTimePassed ? '' : 'hover:transform hover:scale-110'} border border-gray-300 px-4 py-2 text-center`}
                >
                  <Link
                    to={`${appointment.isTimePassed ? '#' : `/therapist/patients/${appointment.patient.id}`}`}
                    className={`${appointment.isTimePassed ? 'italic text-gray-500 ' : 'hover:text-secondaryBlue hover:font-semibold  hover:transform hover:scale-125 hover:italic font-medium'}  `}
                  >
                    {appointment.patientFullName}
                  </Link>
                </td>

                <td
                  className={`${appointment.isTimePassed ? '' : 'hover:transform hover:scale-110'} border border-gray-300 px-4 py-2 text-center`}
                >
                  <Link
                    to={`${appointment.isTimePassed ? '#' : `/therapist/afflictions/${appointment.prescription.affliction.id}`}`}
                    className={`${appointment.isTimePassed ? 'italic text-gray-500 ' : 'hover:text-secondaryBlue hover:font-semibold  hover:transform hover:scale-125 hover:italic font-medium'}  `}
                  >
                    {appointment.afflictionName}
                  </Link>
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center w-2/12 ">
                  <Button
                    onClick={() => handleMessageIconClick(appointment)}
                    className="flex justify-center items-center w-full"
                  >
                    <img
                      src={
                        appointment.isTimePassed ? messageIcon2 : messageIcon
                      }
                      alt="message"
                      className={
                        appointment.isTimePassed
                          ? 'w-3 md:w-6'
                          : 'w-3 md:w-6 hover:transform hover:scale-125'
                      }
                    />
                  </Button>
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center w-2/12">
                  <Button
                    onClick={() => handleCancelIconClick(appointment)}
                    className="flex justify-center items-center w-full"
                  >
                    <img
                      src={appointment.isTimePassed ? cancelIcon2 : cancelIcon}
                      alt="cancel"
                      className={
                        appointment.isTimePassed
                          ? 'w-3 md:w-6'
                          : 'w-3 md:w-6 hover:transform hover:scale-125'
                      }
                    />
                  </Button>
                </td>
              </>
            ) : (
              <td
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan={4}
              >
                Pas de RDV
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
