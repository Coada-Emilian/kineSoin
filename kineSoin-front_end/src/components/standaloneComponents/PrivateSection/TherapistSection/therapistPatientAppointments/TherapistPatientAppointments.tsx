import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ITherapistPatient } from '../../../../../@types/interfaces/customInterfaces';
import { useAppointmentsContext } from '../../../../../utils/contexts/therapistSectionContext/AppointmentsContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchPatientAppointmentsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientAppointmentsByTherapist';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import PatientAppointmentsTableBody from './PatientAppointmentsTableBody';
import PatientAppointmentsTableHead from './PatientAppointmentsTableHead';

export default function TherapistPatientAppointments() {
  const { patientId } = useParams();

  const numericPatientId = patientId ? Number(patientId) : 0;

  const navigate = useNavigate();

  const [patientData, setPatientData] = useState<ITherapistPatient | undefined>(
    undefined
  );

  const { setPreviousPatientAppointments, setUpcomingPatientAppointments } =
    useAppointmentsContext();

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

  const handleCancelClick = () => {
    navigate(`/therapist/patient/${numericPatientId}`);
  };

  return (
    <div className="w-full rounded-xl ">
      <div className="flex justify-center md:justify-start w-11/12 md:w-full mx-auto items-center mb-4 gap-4">
        <img
          src={patientData?.picture_url}
          alt={patientData?.fullName || ''}
          className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl"
        />

        <div className="flex flex-col gap-1 items-center">
          <p className="text-primaryBlue text-sm font-semibold md:text-sm xl:text-base italic">
            {patientData?.fullName}
          </p>
        </div>
      </div>

      <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl text-xxxs sm:text-xs md:text-sm lg:text-base">
        <PatientAppointmentsTableHead />

        <PatientAppointmentsTableBody />
      </table>

      <div className="flex gap-2 w-full justify-end mt-6">
        <CustomBtn
          btn={{
            type: 'basic',
            text: 'Proposer rendez-vous',
            style: 'nav',
            // onClick: handleClick,
          }}
        />
        <CustomBtn
          btn={{
            type: 'delete',
            text: 'Retour',
            style: 'nav',
            onClick: handleCancelClick,
          }}
        />
      </div>
    </div>
  );
}
