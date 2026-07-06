import { Button } from '@headlessui/react';
import type { ISameDayAppointment } from '../../../../../@types/interfaces/therapistInterfaces';
import { useTherapistAppointmentsContext } from '../../../../../hooks/context/therapist/useTherapistAppointmentsContext';
import { useTherapistPatientsContext } from '../../../../../hooks/context/therapist/useTherapistPatientsContext';
import { useTherapistPrescriptionsContext } from '../../../../../hooks/context/therapist/useTherapistPrescriptionContext';
import { useUTherapistUiContext } from '../../../../../hooks/context/therapist/useTherapistUiContext';
import { generateTimeSlots } from '../../../../../utils/functions/generateTimeSlots';
import cancelIcon from '/icons/cancel.png';
import cancelIcon2 from '/icons/cancel2.png';
import messageIcon from '/icons/message.png';
import messageIcon2 from '/icons/message2.png';

export default function TherapistDashboardTableBody() {
  const { setOpenModal } = useUTherapistUiContext();

  const { setSelectedPatient } = useTherapistPatientsContext();

  const { setSelectedAppointment, tableAppointments } =
    useTherapistAppointmentsContext();

  const { setSelectedPrescription } = useTherapistPrescriptionsContext();

  const timeSlots = generateTimeSlots();

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

  const handlePatientNameClick = (appointment: ISameDayAppointment) => {
    console.log(
      'Patient name clicked:',
      appointment.patientFullName,
      appointment.patient
    );
    setOpenModal('patientDetails');
    setSelectedPatient(appointment.patient);
  };

  const handleAfflictionNameClick = (appointment: ISameDayAppointment) => {
    setSelectedAppointment(appointment);
    setOpenModal('afflictionDetails');
  };

  return (
    <tbody className="xs:text-xxs sm:text-xs md:text-sm">
      {timeSlots.map((time, index) => {
        const isLastRow = index === timeSlots.length - 1;
        const appointment = tableAppointments.find(
          (appointment: ISameDayAppointment) => appointment.time === time
        );

        return (
          <tr key={index}>
            <td
              className={`${isLastRow && 'rounded-bl-2xl'} border border-gray-300 px-4 py-2 text-center`}
            >
              {time}
            </td>

            {appointment ? (
              <>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {appointment.isTimePassed ? (
                    <span className="italic text-gray-500">
                      {appointment.patientFullName}
                    </span>
                  ) : (
                    <button
                      className="hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-105 hover:italic font-medium cursor-pointer"
                      onClick={() => handlePatientNameClick(appointment)}
                    >
                      <p>{appointment.patientFullName}</p>
                    </button>
                  )}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {appointment.isTimePassed ? (
                    <span className="italic text-gray-500">
                      {appointment.afflictionName}
                    </span>
                  ) : (
                    <button
                      className="hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-105 hover:italic font-medium cursor-pointer"
                      onClick={() => handleAfflictionNameClick(appointment)}
                    >
                      <p>{appointment.afflictionName}</p>
                    </button>
                  )}
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
                          : 'w-3 md:w-6 hover:transform hover:scale-125 cursor-pointer'
                      }
                    />
                  </Button>
                </td>

                <td
                  className={`${isLastRow && 'rounded-br-2xl'} border border-gray-300 px-4 py-2 text-center w-2/12 `}
                >
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
                          : 'w-3 md:w-6 hover:transform hover:scale-125 cursor-pointer'
                      }
                    />
                  </Button>
                </td>
              </>
            ) : (
              <td
                className="border border-gray-300 px-4 py-2 text-center font-medium italic text-gray-500"
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
