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

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
  isPatientMain?: boolean;
  isPatientPrescriptionMain?: boolean;
  windowWidth?: number;
  isPatientAppointmentsMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
  isPatientMain,
  isPatientPrescriptionMain,
  windowWidth,
  isPatientAppointmentsMain,
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
          className={`bg-gray-200 ${isPatientPrescriptionMain ? 'mb-8 md:mb-0' : ''}`}
        >
          <UserHeadband isPatientHeadband />

          <div className="md:flex h-screen gap-4 mb-2 ">
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
              </p>

              {isPatientDashboardMain && (
                <>
                  <div className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center md:justify-start items-center w-full mb-4">
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
                <div className="flex justify-between items-center w-full">
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
            </div>
          </div>
        </main>
      )}
    </>
  );
}
