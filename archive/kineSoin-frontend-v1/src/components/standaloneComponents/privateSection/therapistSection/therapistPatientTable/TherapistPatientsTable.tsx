import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useTableContext } from '../../../../../utils/contexts/therapistSectionContext/TableContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchAllPatientsDataByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchAllPatientsDataByTherapist';
import PatientDeleteModal from '../modals/PatientDeleteModal';
import PatientsTableBody from './PatientsTableBody';
import PatientsTableHead from './PatientsTableHead';
import PatientsTableLinks from './PatientsTableLinks';

interface TableProps {
  therapist: IUserProfile;
}

export default function TherapistPatientsTable({ therapist }: TableProps) {
  const { setAllPatients } = usePatientsContext();

  const { tableType } = useTableContext();

  const { allPatients } = usePatientsContext();

  const { isDeletePatientModalOpen, setIsDeletePatientModalOpen } =
    useUIContext();

  const { isLoading: isAllPatientsLoading, isFetching: isAllPatientsFetching } =
    useFetchAllPatientsDataByTherapist({
      setAllPatients,
    });

  const filteredTherapistPatients = allPatients.filter(
    (patient) => patient.therapist?.id === therapist.id
  );

  const allFilteredPatients = allPatients.filter(
    (patient) => patient.status !== 'pending'
  );

  const pendingPatients = allPatients.filter(
    (patient) => patient.status === 'pending'
  );

  return (
    <>
      {(isAllPatientsLoading || isAllPatientsFetching) && (
        <div className="flex justify-center items-center h-96 w-full">
          <DNALoader />
        </div>
      )}

      <PatientsTableLinks />

      <table className="border border-gray-300 border-separate w-11/12 mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
        <PatientsTableHead />

        <PatientsTableBody
          patients={
            tableType === 'therapistPatients'
              ? filteredTherapistPatients
              : tableType === 'pendingPatients'
                ? pendingPatients
                : allFilteredPatients
          }
          therapist={therapist}
        />
      </table>

      {isDeletePatientModalOpen && (
        <PatientDeleteModal
          isOpen={isDeletePatientModalOpen}
          onClose={() => {
            setIsDeletePatientModalOpen(false);
          }}
        />
      )}
    </>
  );
}
