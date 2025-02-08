import { useEffect, useState } from 'react';
import { fetchPatientTherapist } from '../../../../utils/apiUtils';
import CustomButton from '../../../standaloneComponents/generalComponents/CustomButton/CustomButton';
import { ITherapist } from '../../../../@types/ITherapist';
import PatientMessageModal from '../../../standaloneComponents/PrivateSection/PatientSection/Modals/PatientMessageModal';

interface TherapistCardProps {
  patientId?: number;
}

export default function TherapistCard({ patientId }: TherapistCardProps) {
  const [patientData, setPatientData] = useState<{
    therapist?: ITherapist;
  } | null>(null);
  const [isFirstPatient, setIsFirstPatient] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientTherapist();
        setPatientData(response);
        if (response.therapist === null) {
          setIsFirstPatient(true);
        }
      }
    };
    fetchData();
  }, [patientId]);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <>
      {isFirstPatient ? (
        <p>Vous n'avez pas de thérapeute associé.</p>
      ) : (
        <div className="text-primaryBlue flex flex-col md:flex-row gap-1 md:gap-6 items-center w-full my-auto">
          {patientData && (
            <div className="w-3/4 flex justify-center">
              <img
                src={patientData.therapist?.picture_url}
                alt={patientData.therapist?.name}
                className="w-full h-full rounded-xl shadow-2xl md:w-4/6 "
              />
            </div>
          )}

          <div className="p-8 h-full flex flex-col justify-between gap-2 text-center text-sm font-bold italic md:w-1/2">
            <div>
              <p className=" text-lg font-bold">
                {patientData?.therapist?.fullName}
              </p>
            </div>

            <div>
              <p className="  mb-2">A propos de moi </p>
              <p className="  text-left p-4 border border-gray-400 rounded-lg">
                {patientData?.therapist?.description}
              </p>
            </div>

            <div>
              <p className="mb-2">Diplôme, Experience et Spécialité</p>

              <div className="  text-left p-4 border border-gray-400 rounded-lg mb-4">
                <p className=" ">{patientData?.therapist?.diploma}</p>

                <p className=" ">{patientData?.therapist?.experience}</p>

                <p className=" ">{patientData?.therapist?.specialty}</p>
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
      )}

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
