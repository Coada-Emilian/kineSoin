import { useEffect, useState } from 'react';
import PatientAppointmentCard from '../../PatientSection/PatientAppointmentCard/PatientAppointmentCard';
import UserHeadband from '../UserHeadband/UserHeadband';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { fetchPatientAppointments } from '../../../../utils/apiUtils';
import { IAppointment } from '../../../../@types/IAppointment';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../../standaloneComponents/SideNav/SideNav';

import PatientNewPrescriptionForm from '../../PatientSection/PatientPrescriptionPage/PatientNewPrescriptionForm';
import PatientAppointmentsCalendar from '../../PatientSection/PatientAppointmentsPage/PatientAppointmentsCalendar';
import PatientMessagesField from '../../PatientSection/PatientMessagesPage/PatientMessagesField';
import MessageForm from '../../PatientSection/PatientMessagesPage/MessageForm';
import TherapistCard from '../../PatientSection/PatientTherapistPage/TherapistCard';
import PatientCard from '../../PatientSection/PatientDetailsPage/PatientCard';

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
  isPatientMain?: boolean;
  isPatientPrescriptionMain?: boolean;
  windowWidth?: number;
  isPatientAppointmentsMain?: boolean;
  isPatientMessagesMain?: boolean;
  isPatientTherapistPage?: boolean;
  isPatientDetailsMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
  isPatientMain,
  isPatientPrescriptionMain,
  windowWidth,
  isPatientAppointmentsMain,
  isPatientMessagesMain,
  isPatientTherapistPage,
  isPatientDetailsMain,
}: PrivateMainProps) {
  const [patientId, setPatientId] = useState<number>();
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    IAppointment[]
  >([]);

  const [scanPreview, setScanPreview] = useState<string | null>(null);

  useEffect(() => {
    const response = getPatientTokenAndDataFromLocalStorage();
    if (response) {
      setPatientId(response.id ? parseInt(response.id, 10) : undefined);
    }
  }, [patientId]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientAppointments(patientId);
        setUpcomingAppointments(response.futureAppointments);
      }
    };
    fetchAppointments();
  }, [patientId]);

  const navigate = useNavigate();

  const handleAppointmentRedirect = () => {
    navigate('/patient/appointments');
  };

  return (
    <>
      {isPatientMain && (
        <main
          className={`bg-gray-200 ${isPatientPrescriptionMain ? 'mb-8 md:mb-0' : ''} h-max`}
        >
          <UserHeadband isPatientHeadband />

          <div className="md:flex h-fit md:h-screen  gap-4 mb-2 ">
            {windowWidth && windowWidth > 768 && (
              <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block">
                <SideNav isPatientSideNav />
              </div>
            )}

            <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6">
              <p className="text-xl font-semibold italic ">
                {isPatientDashboardMain && 'Rendez-vous à venir'}
                {isPatientPrescriptionMain && 'Ajouter une nouvelle ordonnance'}
                {isPatientAppointmentsMain && 'Mes rendez-vous'}
                {isPatientMessagesMain && 'Mes messages'}
                {isPatientTherapistPage && 'Mon thérapeute'}
                {isPatientDetailsMain && 'Mes informations'}
              </p>

              {isPatientDashboardMain && (
                <>
                  <div className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center md:justify-start items-center w-full mb-4">
                    {upcomingAppointments.length === 0 && (
                      <p className="text-gray-700 text-sm">
                        Aucun rendez-vous à venir
                      </p>
                    )}
                    {upcomingAppointments.length > 0 &&
                      upcomingAppointments.map((appointment) => (
                        <PatientAppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                  </div>

                  <div className="md:hidden">
                    {' '}
                    <CustomButton
                      btnText={'Voir plus'}
                      navBarButton
                      onClick={handleAppointmentRedirect}
                    />
                  </div>
                </>
              )}

              {isPatientPrescriptionMain && (
                <div className="flex justify-center md:justify-start items-center w-full">
                  <PatientNewPrescriptionForm
                    windowWidth={windowWidth}
                    patientId={patientId}
                    scanPreview={scanPreview}
                    setScanPreview={setScanPreview}
                  />

                  <div className="hidden md:block md:h-full md:w-1/2">
                    {scanPreview && (
                      <div className="mt-4 flex flex-col items-center gap-2 h-max">
                        <p className="text-gray-700 text-sm mb-4">
                          Aperçu du scan{' '}
                        </p>
                        <img
                          src={scanPreview}
                          alt="Aperçu du fichier"
                          className="w-5/6 object-contain border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isPatientAppointmentsMain && (
                <PatientAppointmentsCalendar patientId={patientId} />
              )}

              {isPatientMessagesMain && (
                <div className="flex flex-col gap-4 justify-between w-full h-full">
                  <PatientMessagesField
                    windowWidth={windowWidth}
                    patientId={patientId}
                  />
                  <MessageForm patientId={patientId} />
                </div>
              )}

              {isPatientTherapistPage && (
                <TherapistCard patientId={patientId} />
              )}

              {isPatientDetailsMain && <PatientCard patientId={patientId} />}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
