import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

export default function PatientDetailsUtilityButtons() {
  const { isPatientProfileEditing, setIsSendMessageModalOpen } = useUIContext();

  const { patientDetails, setSelectedPatient } = usePatientsContext();

  const handleSendMessageClick = () => {
    setIsSendMessageModalOpen(true);
  };

  useEffect(() => {
    if (typeof patientDetails?.id === 'number') {
      const selectedPatient = {
        id: patientDetails.id,
        name: patientDetails?.name ?? '',
        surname: patientDetails?.surname ?? '',
        picture_url: patientDetails?.picture_url ?? '',
      };
      setSelectedPatient(selectedPatient);
    }
  }, [patientDetails, setSelectedPatient]);

  return (
    <div className="flex gap-4 items-center justify-around mt-4 ">
      {!isPatientProfileEditing && (
        <>
          <CustomBtn
            btn={{
              type: 'basic',
              text: 'Envoyez un message',
              style: 'normal',
              hasBorder: true,
              onClick: handleSendMessageClick,
            }}
          />
          <Link to={`/therapist/patient/${patientDetails?.id}/appointments`}>
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Gérer rendez-vous',
                style: 'normal',
                hasBorder: true,
              }}
            />
          </Link>
        </>
      )}
    </div>
  );
}
