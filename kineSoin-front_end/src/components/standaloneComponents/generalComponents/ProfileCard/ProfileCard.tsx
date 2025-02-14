import { useEffect, useState } from 'react';
import {
  fetchPatientData,
  fetchPatientTherapist,
  handlePatientMessageCreation,
} from '../../../../utils/apiUtils';
import { IInsurance, IPatient, ITherapist } from '../../../../@types/types';
import CustomButton from '../CustomButton/CustomButton';
import facebookIcon from '/icons/facebook.png';
import instagramIcon from '/icons/insta.png';
import linkedInIcon from '/icons/linkedIn.png';
import phoneIcon from '/icons/phone-call.png';
import { Link, useNavigate } from 'react-router-dom';
import StandardTextInput from '../StandardInputs/StandardTextInput';

interface ProfileCardProps {
  patientId?: number;
  isPatientTherapistProfileCard?: boolean;
  isPatientDetailsProfileCard?: boolean;
}

export default function ProfileCard({
  patientId,
  isPatientDetailsProfileCard,
  isPatientTherapistProfileCard,
}: ProfileCardProps) {
  const [patientData, setPatientData] = useState<{
    therapist?: ITherapist;
  } | null>(null);

  const [patient, setPatient] = useState<IPatient | null>(null);
  const [isInsuranceAdded, setIsInsuranceAdded] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetchPatientData();
        if (response) {
          setPatient(response);
        } else {
          console.error('Error fetching patient data');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatientDetails();
  }, [patientId, isInsuranceAdded]);

  const navigate = useNavigate();

  const handlePatientMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const response = await handlePatientMessageCreation(formData);
      if (response) {
        navigate('/patient/messages');
      } else {
        console.log("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const [isInsurancePresent, setIsInsurancePresent] = useState<boolean>(false);

  const [addedPatientInsurance, setAddedPatientInsurance] =
    useState<IInsurance>();

  useEffect(() => {
    if (patientData) {
      if (patient && patient.insurance && patient.insurance.length > 0) {
        setIsInsurancePresent(true);
      }
    }
    if (addedPatientInsurance) {
      setIsInsurancePresent(true);
    }
  }, [patient, addedPatientInsurance]);

  return (
    <>
      {isFirstPatient ? (
        <p>Vous n'avez pas de thérapeute associé.</p>
      ) : (
        <div
          className={`${patient ? 'md:w-4/6' : 'md:w-2/4'} w-3/4 bg-white mx-auto rounded-xl shadow-lg relative flex flex-col justify-center items-center`}
        >
          <div className="bg-gray-700 text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full">
            <p className="text-base md:text-lg">
              Cabinet kinésithérapie Ruffec
            </p>
          </div>
          <div className="relative w-full flex justify-center">
            <img
              src={
                isPatientDetailsProfileCard && patient
                  ? patient.picture_url
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? patientData?.therapist?.picture_url
                    : ''
              }
              alt={
                isPatientDetailsProfileCard && patient
                  ? patient.fullName
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? patientData?.therapist?.fullName
                    : ''
              }
              className="w-32 h-32 rounded-full border-4 border-white object-cover absolute top-[-20px] left-1/2 transform -translate-x-1/2"
            />
          </div>
          <div className="bg-primaryTeal py-10 w-full"></div>
          <div className="w-full">
            <p className="text-xl md:text-2xl mt-8">
              {isPatientDetailsProfileCard && patient
                ? patient.surname
                : isPatientTherapistProfileCard && patientData?.therapist
                  ? patientData?.therapist?.surname
                  : ''}{' '}
              <span className="font-semibold">
                {isPatientDetailsProfileCard && patient
                  ? patient.name
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? patientData?.therapist?.name
                    : ''}
              </span>
            </p>
            <p className="text-primaryTeal italic font-semibold mb-6">
              {`${
                isPatientDetailsProfileCard && patient
                  ? `${patient.age} ans`
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? 'masseur kinésithérapeute'
                    : ''
              }`}
            </p>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient
                    ? 'Adresse'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Diplome'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                :{' '}
                {`${
                  isPatientDetailsProfileCard && patient
                    ? patient.address
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.diploma
                      : ''
                }`}
              </p>
            </div>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient
                    ? 'Téléphone'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Spécialité'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                :{' '}
                {`${
                  isPatientDetailsProfileCard && patient
                    ? patient.full_phone_number
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.specialty
                      : ''
                }`}
              </p>
            </div>
            <div className="flex justify-around mb-6 text-xs md:text-base">
              <p className="font-semibold text-primaryTeal w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient
                    ? 'Mutuelle'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Experience'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                :{' '}
                {`${
                  isPatientDetailsProfileCard && patient && isInsurancePresent
                    ? patient.insurance && patient.insurance[0]?.name
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.experience
                      : ''
                }`}
              </p>
            </div>
            {isPatientTherapistProfileCard && patientData?.therapist && (
              <p className="px-4 italic mb-6">
                "{patientData?.therapist?.description}"
              </p>
            )}

            <div className="bg-gray-700 flex items-center justify-center gap-4 w-full">
              {isPatientTherapistProfileCard && patientData?.therapist && (
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
              )}
              <div>
                <p className="text-white text-base py-4">
                  {isPatientTherapistProfileCard &&
                    patientData?.therapist &&
                    `   / ${patientData?.therapist?.surname.toLowerCase()}
                  ${patientData?.therapist?.name.toLowerCase()}`}

                  {isPatientDetailsProfileCard &&
                    patient &&
                    `   / ${patient.surname.toLowerCase()}${patient.name.toLowerCase()}`}
                </p>
              </div>
            </div>
            <div className="bg-primaryTeal py-4 rounded-b-xl">
              {isPatientTherapistProfileCard && patientData?.therapist && (
                <form action="POST" onSubmit={handlePatientMessageSubmit}>
                  <StandardTextInput
                    patientSection={{ isPatientMessageInput: true }}
                  />
                  <CustomButton
                    btnText="Envoyer"
                    profileCardSendMessageButton
                  />
                </form>
              )}

              {isPatientDetailsProfileCard && patient && (
                <div className="flex justify-center gap-4">
                  <CustomButton
                    btnText="Éditer mon profil"
                    profileCardModifyProfileButton
                    onClick={() => {
                      setIsProfileEditing(true);
                    }}
                  />
                  <CustomButton
                    btnText="Supprimer mon profil"
                    mobileDeleteButton
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
