import { useEffect, useState } from 'react';
import PatientAppointmentCard from '../../PatientSection/PatientAppointmentCard/PatientAppointmentCard';
import UserHeadband from '../UserHeadband/UserHeadband';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { fetchPatientAppointments } from '../../../../utils/apiUtils';
import { IAppointment } from '../../../../@types/IAppointment';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../../standaloneComponents/SideNav/SideNav';

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
}: PrivateMainProps) {
  const [patientId, setPatientId] = useState<number>();
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    IAppointment[]
  >([]);

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
      {isPatientDashboardMain && (
        <main className=" bg-gray-200">
          <UserHeadband isPatientHeadband />

          <div className="md:flex h-screen gap-4 mb-2 ">
            <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block">
              <SideNav isPatientSideNav />
            </div>

            <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 md:py-0 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6">
              <p className="text-xl font-semibold italic ">
                Rendez-vous à venir
              </p>

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
            </div>
          </div>
        </main>
      )}
    </>
  );
}
