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
import StandardDateInput from '../StandardInputs/StandardDateInput';
import StandardChoiceDropdown from '../StandardInputs/StandardDropdownInput';
import StandardTelephoneInput from '../StandardInputs/StandardTelephoneInput';
import StandardEmailInput from '../StandardInputs/StandardEmailInput';
import EditIcon from '../EditIcon/EditIcon';
import EditPatientModal from '../../PrivateSection/PatientSection/Modals/EditPatientModal';

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
          if (response.insurance && response.insurance.length > 0) {
            setIsInsuranceAdded(true);
            setAddedPatientInsurance(response.insurance[0]);
          }
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

  const [isPhotoEditModalOpen, setIsPhotoEditModalOpen] = useState(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  return (
    <>
      {isFirstPatient ? (
        <p>Vous n'avez pas de thérapeute associé.</p>
      ) : (
        <div
          className={`${isPatientDetailsProfileCard ? 'md:w-4/6' : 'md:w-5/12'} w-3/4 bg-white mx-auto rounded-xl shadow-lg relative flex flex-col justify-center items-center`}
        >
          <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full">
            <p className="text-base md:text-lg">
              Cabinet kinésithérapie Ruffec
            </p>
          </div>

          <div className="relative w-full">
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 ">
              <img
                src={
                  isPatientDetailsProfileCard && patient
                    ? patient.picture_url
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.picture_url
                      : ''
                }
                alt={
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? patient.fullName
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.fullName
                      : ''
                }
                className="w-32 h-32 rounded-full border-4 border-white object-cover "
              />
              {isPatientDetailsProfileCard && patient && isProfileEditing && (
                <Link to="#" onClick={() => setIsPhotoEditModalOpen(true)}>
                  {' '}
                  <EditIcon isPatientProfilePhotoModification />
                </Link>
              )}
            </div>
          </div>

          <div className="bg-primaryTeal py-10 w-full"></div>
          <div className="w-full">
            <p className="text-xl md:text-2xl mt-8">
              {isPatientDetailsProfileCard && patient && !isProfileEditing
                ? patient.surname
                : isPatientTherapistProfileCard && patientData?.therapist
                  ? patientData?.therapist?.surname
                  : ''}{' '}
              <span className="font-semibold">
                {isPatientDetailsProfileCard && patient && !isProfileEditing
                  ? patient.name
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? patientData?.therapist?.name
                    : ''}
              </span>
            </p>
            <p className="text-primaryBlue italic font-semibold mb-6">
              {`${
                isPatientDetailsProfileCard && patient && !isProfileEditing
                  ? `${patient.age} ans`
                  : isPatientTherapistProfileCard && patientData?.therapist
                    ? 'masseur kinésithérapeute'
                    : ''
              }`}
            </p>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryBlue w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? 'Adresse'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Diplôme'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                {' '}
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? patient.address
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.diploma
                      : ''
                }`}
              </p>
            </div>
            <div className="flex justify-around text-xs md:text-base">
              <p className="font-semibold text-primaryBlue w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? 'Téléphone'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Spécialité'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                {' '}
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? patient.full_phone_number
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? patientData?.therapist?.specialty
                      : ''
                }`}
              </p>
            </div>
            <div className="flex justify-around mb-6 text-xs md:text-base">
              <p className="font-semibold text-primaryBlue w-2/4 italic">
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? 'Mutuelle'
                    : isPatientTherapistProfileCard && patientData?.therapist
                      ? 'Experience'
                      : ''
                }`}
              </p>
              <p className="w-3/4">
                {' '}
                {`${
                  isPatientDetailsProfileCard &&
                  patient &&
                  isInsurancePresent &&
                  !isProfileEditing
                    ? patient.insurance &&
                      !isProfileEditing &&
                      patient.insurance[0]?.name
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

            {isProfileEditing && (
              <div className="flex flex-col items-center  text-xs md:text-base">
                <form action="POST" className="w-10/12">
                  <StandardTextInput
                    patientSection={{
                      isPatientProfileNameModification: true,
                    }}
                    dataInput={{ patient }}
                  />
                  <StandardTextInput
                    patientSection={{
                      isPatientProfileSurnameModification: true,
                    }}
                    dataInput={{ patient }}
                  />
                  <StandardDateInput
                    isPatientProfileBirthDateModification
                    birth_date={patient?.birth_date}
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <StandardTextInput
                      patientSection={{
                        isPatientProfileStreetNumberModification: true,
                      }}
                      dataInput={{ patient }}
                    />
                    <StandardTextInput
                      patientSection={{
                        isPatientProfileStreetNameModification: true,
                      }}
                      dataInput={{ patient }}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <StandardTextInput
                      patientSection={{
                        isPatientProfilePostalCodeModification: true,
                      }}
                      dataInput={{ patient }}
                    />
                    <StandardTextInput
                      patientSection={{
                        isPatientProfileCityModification: true,
                      }}
                      dataInput={{ patient }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <StandardChoiceDropdown
                      isCountryDropdownInput
                      isPatientProfilePrefixModification
                      patient_prefix={patient?.prefix}
                    />
                    <StandardTelephoneInput
                      isPatientProfileTelephoneModification
                      patient_phone_number={patient?.phone_number}
                    />
                  </div>
                  <StandardEmailInput
                    isPatientProfileEmailModification
                    patient_email={patient?.email}
                  />
                </form>
              </div>
            )}

            <div className="bg-primaryBlue flex items-center justify-center gap-4 w-full">
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
                  {isProfileEditing ? (
                    <>
                      <CustomButton
                        btnText="Enregistrer modifications"
                        profileCardModifyProfileButton
                        onClick={() => {
                          setIsProfileEditing(false);
                        }}
                      />
                      <CustomButton
                        btnText="Annuler"
                        mobileCancelButton
                        onClick={() => {
                          setIsProfileEditing(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isPhotoEditModalOpen && (
        <EditPatientModal
          setIsPhotoEditModalOpen={setIsPhotoEditModalOpen}
          isPhotoEditModalOpen={isPhotoEditModalOpen}
          setNewPhoto={setNewPhoto}
          old_photo={patient?.picture_url || ''}
          setPreview={setPreview}
          preview={preview}
        />
      )}
    </>
  );
}
