import { useEffect, useState } from 'react';
import PatientAppointmentCard from '../../PatientSection/PatientAppointmentCard/PatientAppointmentCard';
import UserHeadband from '../UserHeadband/UserHeadband';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';
import { fetchPatientAppointments } from '../../../../utils/apiUtils';

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
}: PrivateMainProps) {
  const [patientId, setPatientId] = useState('');
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  useEffect(() => {
    const response = getPatientTokenAndDataFromLocalStorage();
    if (response) {
      setPatientId(response.id || '');
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetchPatientAppointments();
      setPastAppointments(response.pastAppointments);
      setUpcomingAppointments(response.futureAppointments);
      console.log(upcomingAppointments);
    };
    fetchAppointments();
  }, [patientId]);

  return (
    <>
      {isPatientDashboardMain && (
        <>
          <UserHeadband isPatientHeadband />
          <div className="flex gap-4">
            {upcomingAppointments.length > 0 &&
              upcomingAppointments.map((appointment) => (
                <PatientAppointmentCard />
              ))}
          </div>
        </>
      )}
    </>
  );
}
