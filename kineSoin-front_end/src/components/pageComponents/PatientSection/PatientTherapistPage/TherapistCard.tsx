import { useEffect, useState } from 'react';
import { fetchPatientTherapist } from '../../../../utils/apiUtils';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { IPatient } from '../../../../@types/IPatient';
import { ITherapist } from '../../../../@types/ITherapist';
import ModifyButtons from '../../standaloneComponents/AdminProfileDetails/pageComponents/generalComponents/common/ModifyButtons';
import { duplexPair } from 'stream';
import PatientMessageModal from '../../standaloneComponents/Modals/PatientMessageModal';

interface TherapistCardProps {
  patientId?: number;
}

export default function TherapistCard({ patientId }: TherapistCardProps) {
  const [patientData, setPatientData] = useState<{
    therapist?: ITherapist;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientTherapist(patientId);
        setPatientData(response);
      }
    };
    fetchData();
  }, [patientId]);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center w-full">
        {patientData && (
          <div className="w-3/4">
            <img
              src={patientData.therapist?.picture_url}
              alt={patientData.therapist?.name}
              className="w-full h-full rounded-xl shadow-2xl"
            />
          </div>
        )}
        <div className="p-8 h-full flex flex-col justify-between gap-2 text-center">
          <div>
            <p className="text-primaryBlue text-lg font-bold">
              {patientData?.therapist?.fullName}
            </p>
          </div>
          <div>
            <p className="text-primaryBlue text-sm font-bold italic mb-2">
              A propos de moi{' '}
            </p>
            <p className="text-primaryBlue text-sm font-bold italic text-left p-4 border border-primaryBlue rounded-lg">
              {patientData?.therapist?.description}
            </p>
          </div>
          <div>
            <p className="text-primaryBlue text-sm font-bold italic mb-2">
              Diplôme, Experience et Spécialité
            </p>
            <div className="text-primaryBlue text-sm font-bold italic text-left p-4 border border-primaryBlue rounded-lg">
              <p className="text-primaryBlue text-sm font-bold italic">
                {patientData?.therapist?.diploma}
              </p>

              <p className="text-primaryBlue text-sm font-bold italic">
                {patientData?.therapist?.experience}
              </p>

              <p className="text-primaryBlue text-sm font-bold italic">
                {patientData?.therapist?.specialty}
              </p>
            </div>
          </div>

          <CustomButton
            btnText={'Envoyez un message'}
            normalButton
            onClick={() => {
              setIsMessageModalOpen(true);
            }}
          />
        </div>
      </div>

      {isMessageModalOpen && (
        <PatientMessageModal
          isMessageModalOpen={isMessageModalOpen}
          setIsMessageModalOpen={setIsMessageModalOpen}
          patientId={patientId}
        />
      )}
    </>
  );
}
