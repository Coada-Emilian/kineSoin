import { useEffect, useState } from 'react';
import PatientAppointmentCard from '../../PatientSection/PatientAppointmentCard/PatientAppointmentCard';
import UserHeadband from '../UserHeadband/UserHeadband';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { fetchPatientAppointments } from '../../../../utils/apiUtils';
import { IAppointment } from '../../../../@types/IAppointment';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
}: PrivateMainProps) {
  const [patientId, setPatientId] = useState<number>();
  const [pastAppointments, setPastAppointments] = useState<IAppointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    IAppointment[]
  >([]);
  useEffect(() => {
    const response = getPatientTokenAndDataFromLocalStorage();
    if (response) {
      setPatientId(response.id ? Number(response.id) : undefined);
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientAppointments(patientId);
        setPastAppointments(response.pastAppointments);
        setUpcomingAppointments(response.futureAppointments);
        console.log(upcomingAppointments);
      }
    };
    fetchAppointments();
  }, [patientId]);

  return (
    <>
      {isPatientDashboardMain && (
        <>
          <UserHeadband isPatientHeadband />
          <div className="flex gap-4 flex-col text-center py-4 bg-gray-200 justify-center items-center">
            <p className="text-xl font-semibold italic">Rendez-vous à venir</p>
            {upcomingAppointments.length > 0 &&
              upcomingAppointments.map((appointment) => (
                <PatientAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            <CustomButton btnText={'Voir plus'} navBarButton />
          </div>
        </>
      )}
    </>
  );
}
