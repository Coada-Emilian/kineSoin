import { useState } from 'react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchTherapistPatientsData } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistPatientsData';
import PatientsTableBody from './PatientsTableBody';
import PatientsTableHead from './PatientsTableHead';

export default function TherapistPatientsTable() {
  const [patients, setPatients] = useState<IUserProfile[]>([]);

  const { isLoading, isFetching } = useFetchTherapistPatientsData({
    setPatients,
  });

  // const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
  //   useState<boolean>(false);
  // const [selectedPatient, setSelectedPatient] =
  //   useState<ITherapistPatient | null>(null);
  // const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] =
  //   useState<boolean>(false);

  return (
    <>
      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center h-96 w-full">
          <DNALoader />
        </div>
      )}

      <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
        <PatientsTableHead />

        <PatientsTableBody patients={patients} />
      </table>

      {/* {isDeletePatientModalOpen && (
        <TherapistModal
          isDeletePatientModal
          isDeletePatientModalOpen={isDeletePatientModalOpen}
          setIsDeletePatientModalOpen={setIsDeletePatientModalOpen}
          selected_patient={selectedPatient}
        />
      )}

      {isPatientDetailsModalOpen && (
        <TherapistModal
          selected_patient={selectedPatient}
          isPatientDetailsModal
          isPatientDetailsModalOpen={isPatientDetailsModalOpen}
          setIsPatientDetailsModalOpen={setIsPatientDetailsModalOpen}
        />
      )} */}
    </>
  );
}
