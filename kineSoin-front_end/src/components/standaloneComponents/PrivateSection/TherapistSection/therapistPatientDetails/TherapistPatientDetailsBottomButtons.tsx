import { useNavigate } from 'react-router-dom';
import { StatusMenu } from '../../../../../utils/constants/adminSection/adminProfileDetails/StatusMenu';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import StatusButtonsRefactor from '../../../adminSection/adminProfileDetails/newComponents/StatusButtonRefactor';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

interface PatientDetailsBottomButtonsProps {
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function TherapistPatientDetailsBottomButtons({
  setEntityStatus,
}: PatientDetailsBottomButtonsProps) {
  const {
    isPatientProfileEditing,
    setIsPatientProfileEditing,
    setIsDeletePatientModalOpen,
  } = useUIContext();

  const { patientDetails, setSelectedPatient } = usePatientsContext();

  const navigate = useNavigate();

  const handleModifyClick = () => {
    setIsPatientProfileEditing(true);
  };

  const handleCancelClick = () => {
    setIsPatientProfileEditing(false);
    setEntityStatus(patientDetails?.status ?? '');
  };

  const handleCancelClickToReturn = () => {
    setIsPatientProfileEditing(false);
    navigate('/therapist/patients');
  };

  const handleDeleteClick = () => {
    if (typeof patientDetails?.id === 'number') {
      const selectedPatient = {
        id: patientDetails.id,
        name: patientDetails?.name ?? '',
        surname: patientDetails?.surname ?? '',
        picture_url: patientDetails?.picture_url ?? '',
      };
      setSelectedPatient(selectedPatient);
      setIsDeletePatientModalOpen(true);
    }
  };
  return (
    <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
      <div className="flex gap-1 items-center ">
        {!isPatientProfileEditing ? (
          <>
            <>
              <CustomBtn
                btn={{
                  type: 'modify',
                  text: 'Modifier',
                  style: 'normal',
                  hasBorder: true,
                  onClick: handleModifyClick,
                }}
              />
              <CustomBtn
                btn={{
                  type: 'delete',
                  text: 'Supprimer',
                  style: 'normal',
                  hasBorder: true,
                  onClick: handleDeleteClick,
                }}
              />
            </>
          </>
        ) : (
          <>
            <StatusMenu>
              <StatusButtonsRefactor
                entityType="patient"
                id={patientDetails?.id}
                entityStatus={patientDetails?.status ?? ''}
                setEntityStatus={setEntityStatus}
              />
            </StatusMenu>

            <CustomBtn
              btn={{
                type: 'active',
                text: 'Enregistrer',
                style: 'normal',
                hasBorder: true,
              }}
              type="submit"
            />
          </>
        )}

        <>
          <CustomBtn
            btn={{
              type: 'cancel',
              text: 'Annuler',
              style: 'normal',
              hasBorder: true,
              onClick: isPatientProfileEditing
                ? handleCancelClick
                : handleCancelClickToReturn,
            }}
          />
        </>
      </div>
    </div>
  );
}
