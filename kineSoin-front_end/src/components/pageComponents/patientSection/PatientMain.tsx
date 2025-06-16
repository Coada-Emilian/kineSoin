import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '../../../@types/interfaces/customInterfaces';
import { IAppointment } from '../../../@types/interfaces/modelInterfaces';
import { getPatientTokenAndDataFromLocalStorage } from '../../../localStorage/patientLocalStorage';
import { fetchPatientAppointments } from '../../../utils/apiUtils/patientApiUtils/patientApiUtils';
import AppointmentsCalendar from '../../standaloneComponents/generalComponents/appointmentCalendar/AppointmentsCalendar';
import AppointmentCard from '../../standaloneComponents/generalComponents/appointmentComponents/appointmentCard/AppointmentCard';
import SideNav from '../../standaloneComponents/generalComponents/layoutComponents/sideNav/oldComponents/SideNav';
import UserHeadband from '../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';
import MessagesField from '../../standaloneComponents/generalComponents/messageComponents/messageField/MessagesField';
import MessageForm from '../../standaloneComponents/generalComponents/messageComponents/messageForm/MessageForm';
import ProfileCard from '../../standaloneComponents/generalComponents/profileCard/ProfileCard';
import PatientNewPrescriptionForm from '../../standaloneComponents/privateSection/patientSection/patientNewPrescriptionComponents/PatientNewPrescriptionForm';

interface PatientMainProps {
  isPatientDashboardMain?: boolean;
  isPatientPrescriptionMain?: boolean;
  isPatientAppointmentsMain?: boolean;
  isPatientMessagesMain?: boolean;
  isPatientTherapistPage?: boolean;
  isPatientDetailsMain?: boolean;
}

export default function PatientMain({
  isPatientDashboardMain,
  isPatientPrescriptionMain,
  isPatientAppointmentsMain,
  isPatientMessagesMain,
  isPatientTherapistPage,
  isPatientDetailsMain,
}: PatientMainProps) {
  const [patient, setPatient] = useState<IUserProfile>();
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    IAppointment[]
  >([]);

  const [scanPreview, setScanPreview] = useState<string | null>(null);

  useEffect(() => {
    try {
      const response = getPatientTokenAndDataFromLocalStorage();
      if (response) {
        setPatient(response);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, [patient?.id]);

  useEffect(() => {
    try {
      const fetchAppointments = async () => {
        const response = await fetchPatientAppointments();
        setUpcomingAppointments(response.futureAppointments);
      };
      fetchAppointments();
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, [patient?.id]);

  const fetchParagraph = () =>
    isPatientDashboardMain
      ? 'Rendez-vous à venir'
      : isPatientPrescriptionMain
        ? 'Ajouter une nouvelle ordonnance'
        : isPatientAppointmentsMain
          ? 'Mes rendez-vous'
          : isPatientMessagesMain
            ? 'Mes messages'
            : isPatientTherapistPage
              ? 'Mon thérapeute'
              : isPatientDetailsMain
                ? 'Mes informations'
                : '';

  return (
    <>
      <main
        className={`bg-gray-200 ${isPatientPrescriptionMain ? 'mb-8 md:mb-0' : ''}`}
      >
        <UserHeadband
          userProfile={patient}
          profileUrl={'/patient/my-profile'}
          dashboardUrl={'/patient/dashboard'}
        />

        <div className="h-fit md:flex gap-4 mb-2 ">
          <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
            <SideNav isPatientSideNav />
          </div>

          <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
            <p className="text-xl font-semibold italic mb-2 ">
              {fetchParagraph()}
            </p>

            {isPatientDashboardMain && (
              <>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:flex-wrap justify-center md:justify-start items-center w-full mb-4">
                  {upcomingAppointments.length === 0 && (
                    <p className="text-gray-700 text-sm">
                      Aucun rendez-vous à venir
                    </p>
                  )}
                  {upcomingAppointments.length > 0 &&
                    upcomingAppointments.map((appointment) => (
                      <Link
                        to={`/patient/appointments/${appointment.id}`}
                        key={appointment.id}
                        className="w-3/4 md:w-3/12 border border-gray-700 rounded-xl text-xxs md:text-sm hover:ring-4 hover:ring-primaryTeal transform hover:scale-105 transition-transform duration-200"
                      >
                        <AppointmentCard
                          appointment={appointment}
                          isPatientAppointmentCard
                        />
                      </Link>
                    ))}
                </div>
              </>
            )}

            {isPatientPrescriptionMain && (
              <div className="flex justify-center md:justify-around items-center w-full">
                <PatientNewPrescriptionForm
                  patientId={patient?.id || undefined}
                  scanPreview={scanPreview}
                  setScanPreview={setScanPreview}
                />

                <div className="hidden md:block md:h-full md:w-1/2">
                  {scanPreview && (
                    <div className="mt-4 flex flex-col items-center gap-2 h-max">
                      <p className=" text-sm mb-4 text-primaryBlue font-semibold italic">
                        Aperçu du scan{' '}
                      </p>
                      <img
                        src={scanPreview}
                        alt="Aperçu du fichier"
                        className="w-5/6 object-contain border rounded-2xl shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {isPatientAppointmentsMain && (
              <AppointmentsCalendar
                isPatientAppointmentsCalendar
                patientId={patient?.id || undefined}
              />
            )}

            {isPatientMessagesMain && (
              <div className="flex flex-col gap-4 justify-between w-full h-full">
                <MessagesField
                  isPatientMessagesField
                  patientId={patient?.id || undefined}
                />
                <MessageForm isPatientMessageForm />
              </div>
            )}

            {isPatientTherapistPage && (
              <ProfileCard
                isPatientTherapistProfileCard
                patientId={patient?.id || undefined}
              />
            )}

            {isPatientDetailsMain && (
              <ProfileCard
                isPatientDetailsProfileCard
                patientId={patient?.id || undefined}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
