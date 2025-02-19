import { useEffect, useState } from 'react';
import { fetchTherapistDashboardData } from '../../../../../utils/apiUtils';
import { ISameDayAppointment } from '../../../../../@types/types';
import { Link } from 'react-router-dom';
import messageIcon from '/icons/message.png';
import cancelIcon from '/icons/cancel.png';
import TherapistModal from '../Modals/TherapistModal';
import DNALoader from '../../../../../utils/DNALoader';

export default function TherapistDayTable() {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('/');

  const windowWidth = window.innerWidth;

  const generateTimeSlots = () => {
    const times: string[] = [];
    let start = new Date();
    start.setHours(8, 0, 0, 0); // Start at 08:00 AM

    while (start.getHours() < 20) {
      // Until 08:00 PM
      times.push(
        start.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }

    return times;
  };

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

  if (isLoading) {
    return DNALoader();
  }
  return (
    <div className="flex flex-col w-10/12">
      <div className="w-full flex justify-end mb-6">
        <p className="border border-gray-400 p-2 rounded-xl shadow-xl">
          Date: {formattedDate}
        </p>
      </div>
      {!noAppointments ? (
        <div className="w-full rounded-xl ">
          <table className="border-collapse border border-gray-300 w-11/12 mx-auto md:w-10/12 md:my-auto mb-6 shadow-xl ">
            <thead
              className={
                windowWidth < 768
                  ? 'bg-gray-100 text-xs'
                  : 'bg-gray-100 text-sm md:text-base '
              }
            >
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
                    {windowWidth < 768 ? 'Message' : 'Envoyer un message'}
                  </th>

                  <th className="border border-gray-300  text-center p-1 md:p-2 ">
                    {windowWidth < 768 ? 'Annuler' : 'Annuler RDV'}
                  </th>
                </>
              </tr>
            </thead>

            <tbody
              className={windowWidth < 768 ? 'text-xxs' : 'text-xs md:text-sm'}
            >
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
                        <td className="border border-gray-300 px-4 py-2 text-center hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-125 hover:italic">
                          <Link
                            to={`/therapist/patients/${appointment.patient.id}`}
                          >
                            {appointment.patientFullName}
                          </Link>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-center  hover:text-secondaryBlue hover:font-semibold hover:transform hover:scale-125 hover:italic">
                          <Link
                            to={`/therapist/afflictions/${appointment.prescription.affliction.id}`}
                          >
                            {appointment.afflictionName}
                          </Link>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-center w-2/12 ">
                          <Link
                            to="#"
                            onClick={() => {
                              setSelectedPatient(appointment.patient);
                              setIsSendMessageModalOpen(true);
                            }}
                            className="flex justify-center"
                          >
                            <img
                              src={messageIcon}
                              alt="message"
                              className="w-3 md:w-6 hover:transform hover:scale-125"
                            />
                          </Link>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center w-2/12">
                          <Link
                            to="#"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setSelectedPatient(appointment.patient);
                              setIsCancelAppointmentModalOpen(true);
                            }}
                            className="flex justify-center"
                          >
                            <img
                              src={cancelIcon}
                              alt="cancel"
                              className="w-3 md:w-6 hover:transform hover:scale-125"
                            />
                          </Link>
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
        <TherapistModal
          isSendMessageModal
          patient={selectedPatient}
          isSendMessageModalOpen={isSendMessageModalOpen}
          setIsSendMessageModalOpen={setIsSendMessageModalOpen}
        />
      )}

      {isCancelAppointmentModalOpen && (
        <TherapistModal
          isCancelAppointmentModal
          patient={selectedPatient}
          appointment={selectedAppointment}
          isCancelAppointmentModalOpen={isCancelAppointmentModalOpen}
          setIsCancelAppointmentModalOpen={setIsCancelAppointmentModalOpen}
        />
      )}
    </div>
  );
}
