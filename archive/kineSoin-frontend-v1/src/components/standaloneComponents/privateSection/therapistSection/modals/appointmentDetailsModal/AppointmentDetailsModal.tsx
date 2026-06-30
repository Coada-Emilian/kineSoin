import { IPatientAppointmentDetails } from '../../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useUIContext } from '../../../../../../utils/contexts/therapistSectionContext/UIContext';
import BaseOutput from '../../../../generalComponents/BaseOutput';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from '../BaseModal';
import AfflictionSection from './sections/AfflictionSection';
import MedicSection from './sections/MedicSection';
import PrescriptionSection from './sections/PrescriptionSection';
import TherapistSection from './sections/TherapistSection';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: IPatientAppointmentDetails;
}

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}: ModalProps) {
  const { patientDetails: patient } = usePatientsContext();

  const { setIsCancelAppointmentModalOpen } = useUIContext();

  const handleCancelClick = () => {
    setIsCancelAppointmentModalOpen(true);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-primaryBlue text-white py-8 px-6  rounded-t-xl w-full text-center">
        <p className="text-base md:text-lg mb-2">
          Cabinet kinésithérapie Ruffec
        </p>

        <p className="text-sm md:text-base text-center italic">
          Détails du Rendez-vous
        </p>
      </div>

      <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
        <img
          src={patient?.picture_url || undefined}
          alt={patient?.name || undefined}
          className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
        />
      </div>

      <div className="w-11/12 mx-auto">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <BaseOutput
              label="Date"
              value={`${appointment.date} à ${appointment.time.split(':')[0]}h${appointment.time.split(':')[1]}`}
            />

            <BaseOutput
              label="Statut"
              value={appointment.is_canceled ? 'Annulé' : 'Accepté'}
            />
          </div>
        </div>

        <TherapistSection appointment={appointment} />

        <PrescriptionSection appointment={appointment} />

        <MedicSection appointment={appointment} />

        <AfflictionSection appointment={appointment} />
      </div>

      <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
        <div className="flex gap-1 items-center ">
          <>
            <CustomBtn
              btn={{
                type: 'delete',
                text: 'Annuler RDV',
                style: 'normal',
                hasBorder: true,
                onClick: handleCancelClick,
              }}
            />
            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: onClose,
              }}
            />
          </>
        </div>
      </div>
    </BaseModal>
  );
}
