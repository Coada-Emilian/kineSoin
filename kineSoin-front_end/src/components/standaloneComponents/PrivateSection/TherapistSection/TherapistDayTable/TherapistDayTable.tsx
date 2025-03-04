import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import messageIcon from '/icons/message.png';
import messageIcon2 from '/icons/message2.png';
import cancelIcon from '/icons/cancel.png';
import cancelIcon2 from '/icons/cancel2.png';
import TherapistModal from '../Modals/TherapistModal';
import DNALoader from '../../../../../utils/DNALoader';
import dynamicIcon from '/icons/dynamic.png';
import dynamicIcon2 from '/icons/dynamic2.png';
import { fetchTherapistDashboardData } from '../../../../../utils/apiUtils/therapistApiUtils';
import { generateTimeSlots } from '../../../../../utils/AppUtils/time';
import SendMessageModal from '../Modals/SendMessageModal';
import { Button } from '@headlessui/react';
import { ISameDayAppointment } from '../../../../../@types/customInterfaces';

export default function TherapistDayTable() {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('/');

  const [tableAppointments, setTableAppointments] = useState<
    ISameDayAppointment[] | []
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSameDayAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTherapistDashboardData();

        // Check if response contains `sameDayAppointments`
        if (response && Array.isArray(response.sameDayAppointments)) {
          const sameDayAppointments = response.sameDayAppointments;

          if (sameDayAppointments.length > 0) {
            sameDayAppointments.forEach((appointment: ISameDayAppointment) => {
              const formattedTime = appointment.time.slice(0, 5);

              const sentAppointmentData: ISameDayAppointment = {
                id: appointment.id,
                time: formattedTime,
                patient: appointment.patient,
                prescription: appointment.prescription,
                patientFullName:
                  appointment.patient.name + ' ' + appointment.patient.surname,
                afflictionName: appointment.prescription.affliction.name,
              };

              const existingAppointment = tableAppointments.find(
                (appointment) => appointment.time === sentAppointmentData.time
              );

              if (existingAppointment) {
                return;
              } else {
                setTableAppointments((prevAppointments) => [
                  ...prevAppointments,
                  sentAppointmentData,
                ]);
              }
            });
          } else {
            setNoAppointments(true);
          }
        } else {
          console.log('Error: sameDayAppointments is missing or not an array');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchSameDayAppointments();
    setIsLoading(false);
  }, []);

  const timeSlots = generateTimeSlots();
  const [noAppointments, setNoAppointments] = useState(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<ISameDayAppointment | null>(null);
  const [isCancelAppointmentModalOpen, setIsCancelAppointmentModalOpen] =
    useState(false);

  const [isDynamicModeOn, setIsDynamicModeOn] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);

  const handleDynamicModeClick = () => {
    setIsDynamicModeOn(!isDynamicModeOn);
    if (!isDynamicModeOn || isDynamicModeOn) {
      setShowParagraph(true);
      setTimeout(() => {
        setShowParagraph(false);
      }, 3000);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const formatTime = (date: Date): string => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    };

    const checkAppointments = () => {
      const currentTime = formatTime(new Date());
      tableAppointments.forEach((appointment) => {
        if (appointment.time < currentTime) {
          appointment.isTimePassed = true;
        }
      });
    };

    if (isDynamicModeOn) {
      checkAppointments();

      interval = setInterval(() => {
        console.log('Checking appointments...');
        checkAppointments();
      }, 600000);
    } else if (!isDynamicModeOn) {
      tableAppointments.forEach((appointment) => {
        appointment.isTimePassed = false;
      });
    }

    return () => clearInterval(interval);
  }, [isDynamicModeOn]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <div className="flex flex-col items-center w-11/12">
      <div className="w-full flex justify-end mb-6 gap-4 items-center">
        {showParagraph && (
          <p className="w-2/6 text-xs md:w-1/6 text-mdp-2 text-primaryBlue text-center rounded-xl italic font-medium">
            Dynamic mode is{' '}
            {isDynamicModeOn ? (
              <span className="text-green-500">ON</span>
            ) : (
              <span className="text-red-500">OFF</span>
            )}
          </p>
        )}
        <Button onClick={handleDynamicModeClick}>
          <img
            src={!isDynamicModeOn ? dynamicIcon : dynamicIcon2}
            alt={isDynamicModeOn ? 'dynamic mode on' : 'dynamic mode off'}
            className={`${isDynamicModeOn ? 'animate-spin' : ''} w-6 h-6 md:w-8 md:h-8 hover:animate-spin`}
          />
        </Button>

        <p className="border border-gray-400 p-2 rounded-xl shadow-xl italic font-semibold ">
          Date: {formattedDate}
        </p>
      </div>

      {!noAppointments ? (
        <div className="w-full rounded-xl ">
          <table className="border-collapse border border-gray-300 w-11/12 mx-auto md:w-10/12 md:my-auto mb-6 shadow-xl ">
            <thead className="bg-gray-100 xs:text-xs md:text-base">
              <tr className="text-xxs md:text-base ">
                <>
                  <th className="border border-gray-300  p-1 md:p-2 text-center w-2/12">
                    Heure
                  </th>

                  <th className="border border-gray-300  p-1 md:p-2 text-center">
                    Patient
                  </th>

                  <th className="border border-gray-300  p-1 md:p-2 text-center ">
                    Affliction
                  </th>

                  <th className="border border-gray-300 text-center p-1 md:p-2 w-fit">
                    <span className="block md:hidden">Message</span>
                    <span className="hidden md:block">Envoyer un message</span>
                  </th>

                  <th className="border border-gray-300  text-center p-1 md:p-2 ">
                    <span className="block md:hidden">Annuler</span>
                    <span className="hidden md:block">Annuler RDV</span>
                  </th>
                </>
              </tr>
            </thead>

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
                          className={`${appointment.isTimePassed ? '' : 'hover:transform hover:scale-125'} border border-gray-300 px-4 py-2 text-center`}
                        >
                          <Link
                            to={`${appointment.isTimePassed ? '#' : `/therapist/patients/${appointment.patient.id}`}`}
                            className={`${appointment.isTimePassed ? 'italic text-gray-500 hover:transform hover:scale-100 ' : 'hover:text-secondaryBlue hover:font-semibold  hover:transform hover:scale-125 hover:italic font-medium'}  `}
                          >
                            {appointment.patientFullName}
                          </Link>
                        </td>

                        <td
                          className={`${appointment.isTimePassed ? '' : 'hover:transform hover:scale-125'} border border-gray-300 px-4 py-2 text-center`}
                        >
                          <Link
                            to={`${appointment.isTimePassed ? '#' : `/therapist/afflictions/${appointment.prescription.affliction.id}`}`}
                            className={`${appointment.isTimePassed ? 'italic text-gray-500 hover:transform hover:scale-100 ' : 'hover:text-secondaryBlue hover:font-semibold  hover:transform hover:scale-125 hover:italic font-medium'}  `}
                          >
                            {appointment.afflictionName}
                          </Link>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-center w-2/12 ">
                          <Button
                            onClick={() => {
                              if (!appointment.isTimePassed) {
                                setSelectedPatient(appointment.patient);
                                setIsSendMessageModalOpen(true);
                              }
                            }}
                            className="flex justify-center"
                          >
                            <img
                              src={
                                appointment.isTimePassed
                                  ? messageIcon2
                                  : messageIcon
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
                            onClick={() => {
                              if (!appointment.isTimePassed) {
                                setSelectedAppointment(appointment);
                                setSelectedPatient(appointment.patient);
                                setIsCancelAppointmentModalOpen(true);
                              }
                            }}
                            className="flex justify-center"
                          >
                            <img
                              src={
                                appointment.isTimePassed
                                  ? cancelIcon2
                                  : cancelIcon
                              }
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
          </table>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-32 rounded-xl border border-gray-300 shadow-xl">
          <p className="text-lg">Pas de rendez-vous pour aujourd'hui</p>
        </div>
      )}

      {isSendMessageModalOpen && (
        <SendMessageModal
          isOpen={isSendMessageModalOpen}
          onClose={() => {
            setIsSendMessageModalOpen(false);
          }}
          patient={selectedPatient}
        />
      )}

      {isCancelAppointmentModalOpen && (
        <TherapistModal
          isCancelAppointmentModal
          patient={selectedPatient}
          appointment={selectedAppointment}
          prescription={selectedAppointment?.prescription}
          isCancelAppointmentModalOpen={isCancelAppointmentModalOpen}
          setIsCancelAppointmentModalOpen={setIsCancelAppointmentModalOpen}
        />
      )}
    </div>
  );
}
