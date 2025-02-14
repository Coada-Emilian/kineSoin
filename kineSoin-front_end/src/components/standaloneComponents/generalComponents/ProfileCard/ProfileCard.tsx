import { useEffect, useState } from 'react';
import { fetchPatientTherapist } from '../../../../utils/apiUtils';
import { ITherapist } from '../../../../@types/types';
import PatientMessageModal from '../../PrivateSection/PatientSection/Modals/PatientMessageModal';
import CustomButton from '../CustomButton/CustomButton';
import facebookIcon from '/icons/facebook.png';
import instagramIcon from '/icons/insta.png';
import linkedInIcon from '/icons/linkedIn.png';
import phoneIcon from '/icons/phone-call.png';
import { Link } from 'react-router-dom';
import StandardTextInput from '../StandardInputs/StandardTextInput';

interface ProfileCardProps {
  patientId?: number;
}

export default function ProfileCard({ patientId }: ProfileCardProps) {
  const [patientData, setPatientData] = useState<{
    therapist?: ITherapist;
  } | null>(null);
  const [isFirstPatient, setIsFirstPatient] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (patientId !== undefined) {
          const response = await fetchPatientTherapist();
          setPatientData(response);
          if (response.therapist === null) {
            setIsFirstPatient(true);
          }
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
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
        <div className="w-3/4 md:w-2/6 bg-white mx-auto rounded-xl shadow-lg relative flex flex-col justify-center items-center">
          <div className="bg-gray-700 text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full">
            <p className="text-base md:text-lg">
              Cabinet kinésithérapie Ruffec
            </p>
          </div>
          <div className="relative w-full flex justify-center">
            <img
              src={patientData?.therapist?.picture_url}
              alt={patientData?.therapist?.fullName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover absolute top-[-20px] left-1/2 transform -translate-x-1/2"
            />
          </div>
          <div className="bg-primaryTeal py-10 w-full"></div>
          <div>
            <p className="text-xl md:text-2xl mt-8">
              {patientData?.therapist?.surname}{' '}
              <span className="font-semibold">
                {patientData?.therapist?.name}
              </span>
            </p>
            <p className="text-primaryTeal italic font-semibold mb-6">
              masseur kinésithérapeute
            </p>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                Diplôme
              </p>
              <p className="w-3/4">: {patientData?.therapist?.diploma}</p>
            </div>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                Spécialité
              </p>
              <p className="w-3/4">: {patientData?.therapist?.specialty}</p>
            </div>
            <div className="flex justify-around mb-6 text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                Experience
              </p>
              <p className="w-3/4">: {patientData?.therapist?.experience}</p>
            </div>
            <p className="px-4 italic mb-6">
              "{patientData?.therapist?.description}"
            </p>
            <div className="bg-gray-700 flex items-center justify-center gap-4">
              <div className="flex gap-2 p-2">
                <Link to="#">
                  <img src={linkedInIcon} alt="LinkedIn" className="w-8" />
                </Link>
                <Link to="#">
                  <img src={facebookIcon} alt="facebook" className="w-8" />
                </Link>
                <Link to="#">
                  <img src={instagramIcon} alt="instagram" className="w-8" />
                </Link>
                <Link to="#">
                  <img src={phoneIcon} alt="phone" className="w-8" />
                </Link>
              </div>
              <div>
                <p className="text-white text-base">
                  / {patientData?.therapist?.surname.toLowerCase()}
                  {patientData?.therapist?.name.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="bg-primaryTeal py-4 rounded-b-xl">
              <form action="POST">
                <StandardTextInput
                  patientSection={{ isPatientMessageInput: true }}
                />
                <CustomButton
                  btnText="Envoyer"
                  profileCardSendMessageButton
                  onClick={() => setIsMessageModalOpen(true)}
                />
              </form>
            </div>
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
