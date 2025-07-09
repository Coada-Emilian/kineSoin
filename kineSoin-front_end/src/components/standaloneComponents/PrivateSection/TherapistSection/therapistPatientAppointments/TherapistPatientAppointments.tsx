import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ITherapistPatient } from '../../../../../@types/interfaces/customInterfaces';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchPatientAppointmentsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientAppointmentsByTherapist';
import PatientAppointmentsTableBody from './PatientAppointmentsTableBody';
import PatientAppointmentsTableHead from './PatientAppointmentsTableHead';

export default function TherapistPatientAppointments() {
  const { patientId } = useParams();
  const numericPatientId = patientId ? Number(patientId) : 0;

  const [patientData, setPatientData] = useState<ITherapistPatient | undefined>(
    undefined
  );

  const {
    selectedPatient,
    setPreviousPatientAppointments,
    setUpcomingPatientAppointments,
  } = useTherapistSectionContext();

  const { isLoading, isFetching } = useFetchPatientAppointmentsByTherapist({
    patient_id: numericPatientId,
    setPreviousPatientAppointments,
    setUpcomingPatientAppointments,
    setPatientData,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl ">
      <div className="flex justify-start w-full mx-auto items-center mb-4 gap-4">
        <img
          src={patientData?.picture_url}
          alt={patientData?.fullName || ''}
          className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl"
        />

        <div className="flex flex-col gap-1 items-center">
          <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
            {patientData?.fullName}
          </p>
          <Link
            to={`/therapist/patient/${selectedPatient?.id}`}
            className="text-primaryBlue text-xxxs font-semibold md:text-xxs xl:text-sm hover:scale-105 italic"
          >
            Retour
          </Link>
        </div>
      </div>
      <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
        <PatientAppointmentsTableHead />

        <PatientAppointmentsTableBody />
      </table>
    </div>
  );
}
