import { IModalProps } from '../../../../../../@types/interfaces/customInterfaces';
import { useAppointmentsContext } from '../../../../../../utils/contexts/therapistSectionContext/AppointmentsContext';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from '../BaseModal';
import AfflictionDetailsModalOutputs from './AfflictionDetailsModalOutputs';
import mainLogo from '/logos/Main-Logo.png';

export default function AfflictionDetailsModal({
  isOpen,
  onClose,
}: IModalProps) {
  //   const { selectedPatient, setPatientDetails, patientDetails } =
  //     usePatientsContext();

  //   const { isLoading, isFetching } = useFetchPatientDetailsByTherapist({
  //     patient_id: selectedPatient?.id ?? 0,
  //     setPatientDetails,
  //   });

  //   // Always call hooks first
  //   useEffect(() => {
  //     console.log(patientDetails);
  //   }, [patientDetails]);

  //   if (isLoading || isFetching) {
  //     return (
  //       <div className="flex justify-center items-center h-96 w-full">
  //         <DNALoader />
  //       </div>
  //     );
  //   }

  //   if (!selectedPatient) {
  //     return (
  //       <BaseModal isOpen={isOpen} onClose={onClose}>
  //         <p>No patient selected.</p>
  //       </BaseModal>
  //     );
  //   }

  const { selectedAppointment } = useAppointmentsContext();

  const selectedAffliction = selectedAppointment?.prescription.affliction;

  const handleBackClick = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col  border text-primaryBlue rounded-xl shadow-2xl items-center text-center">
        <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex flex-col justify-center text-white font-medium text-lg md:text-xl ">
          <p className="text-base md:text-lg mb-2">
            Cabinet kinésithérapie Ruffec
          </p>
          <p className="text-sm md:text-base text-center italic">
            Details de l'affection
          </p>
        </div>

        <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
          <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto flex justify-center items-center">
              <img
                src={mainLogo}
                alt="profile"
                className="rounded-full shadow-xl w-full h-full object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>

        <AfflictionDetailsModalOutputs
          selectedAffliction={selectedAffliction}
        />

        {/* <TherapistPatientDetailsInteractiveButtons /> */}

        <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
          <div className="flex gap-1 items-center ">
            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: handleBackClick,
              }}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
