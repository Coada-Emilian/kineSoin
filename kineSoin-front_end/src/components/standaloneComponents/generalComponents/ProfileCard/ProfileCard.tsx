import { useEffect, useState } from 'react';
import {
  fetchPatientData,
  fetchPatientTherapist,
  handlePatientInsuranceUpdate,
  handlePatientMessageCreation,
  handlePatientPhotoUpdate,
  handlePatientUpdate,
} from '../../../../utils/apiUtils';
import {
  IInsurance,
  IPatient,
  IPatient_Insurance,
  ITherapist,
} from '../../../../@types/types';
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
import checkIcon from '/icons/check.png';
import { updatePatientDataInLocalStorage } from '../../../../localStorage/patientLocalStorage';

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
  const navigate = useNavigate();
  const [patientTherapistData, setPatientTherapistData] = useState<{
    therapist?: ITherapist;
  } | null>(null);
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [isInsuranceAdded, setIsInsuranceAdded] = useState<boolean>(false);
  const [isFirstPatient, setIsFirstPatient] = useState<boolean>(false);

  useEffect(() => {
    const fetchTherapistData = async () => {
      try {
        if (patientId !== undefined) {
          const response = await fetchPatientTherapist();
          setPatientTherapistData(response);
          if (response.therapist === null) {
            setIsFirstPatient(true);
          }
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchTherapistData();
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

  const [addedPatientInsurance, setAddedPatientInsurance] =
    useState<IInsurance>();

  const [isPhotoEditModalOpen, setIsPhotoEditModalOpen] = useState(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const [isAddInsuranceModalOpen, setIsAddInsuranceModalOpen] = useState(false);

  const [isEditInsuranceModalOpen, setIsEditInsuranceModalOpen] =
    useState(false);

  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  const [isInsuranceEdited, setIsInsuranceEdited] = useState<boolean>(false);

  const [isPasswordEdited, setIsPasswordEdited] = useState<boolean>(false);

  const [newInsurance, setNewInsurance] = useState<
    IPatient_Insurance | undefined
  >(undefined);

  const [newPassword, setNewPassword] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<string>();

  const handlePatientProfileModification = async (
    e?: React.FormEvent<HTMLFormElement> | null
  ) => {
    e?.preventDefault();

    try {
      const updatePromises: Promise<void>[] = [];

      // Process insurance update if newInsurance is provided
      if (newInsurance) {
        const newInsuranceFormData = new FormData();
        newInsuranceFormData.append(
          'insurance_id',
          newInsurance.insurance_id.toString()
        );
        newInsuranceFormData.append('start_date', newInsurance.start_date);
        newInsuranceFormData.append('end_date', newInsurance.end_date);
        newInsuranceFormData.append(
          'contract_number',
          newInsurance.contract_number
        );
        newInsuranceFormData.append(
          'adherent_code',
          newInsurance.adherent_code
        );

        updatePromises.push(
          handlePatientInsuranceUpdate(newInsuranceFormData).then(
            (response) => {
              if (response) {
                console.log('Insurance updated successfully');
              }
            }
          )
        );
      }

      // Process photo update if newPhoto is provided
      if (newPhoto) {
        const newPhotoFormData = new FormData();
        newPhotoFormData.append('photo', newPhoto);

        updatePromises.push(
          handlePatientPhotoUpdate(newPhotoFormData).then((response) => {
            if (response) {
              updatePatientDataInLocalStorage(response, '');
              console.log('Photo updated successfully');
            }
          })
        );
      }

      // Process form data if provided
      if (e?.currentTarget instanceof HTMLFormElement) {
        const formData = new FormData(e.currentTarget);
        if (newPassword) {
          formData.append('new_password', newPassword);
        }
        const patientPrefix = formData.get('prefix') as string;
        const patientPhoneNumber = formData.get('phone_number') as string;
        const patientStreetNumber = formData.get('street_number') as string;
        const patientStreetName = formData.get('street_name') as string;
        const patientPostalCode = formData.get('postal_code') as string;
        const patientCity = formData.get('city') as string;
        const patientEmail = formData.get('email') as string;
        const patientName = formData.get('name') as string;
        const patientSurname = formData.get('surname') as string;
        const patientBirthDate = formData.get('birth_date') as string;

        if (
          !patientPrefix ||
          !patientPhoneNumber ||
          !patientStreetNumber ||
          !patientStreetName ||
          !patientPostalCode ||
          !patientCity ||
          !patientEmail ||
          !patientName ||
          !patientSurname ||
          !patientBirthDate
        ) {
          setErrorMessage('Veuillez remplir tous les champs');
        } else if (patientPrefix.length > 10) {
          setErrorMessage(
            'Le préfixe du téléphone ne doit pas dépasser 10 caractères'
          );
        } else if (patientPhoneNumber.length > 15) {
          setErrorMessage(
            'Le numéro de téléphone ne doit pas dépasser 15 chiffres'
          );
        } else if (!/^\d+$/.test(patientPhoneNumber)) {
          setErrorMessage(
            'Le numéro de téléphone doit uniquement contenir des chiffres'
          );
        } else if (!/^\d{5}$/.test(patientPostalCode)) {
          setErrorMessage('Le code postal doit être un nombre à 5 chiffres');
        } else if (!/^[a-zA-Z\s]+$/.test(patientCity)) {
          setErrorMessage(
            'Le nom de la ville doit uniquement contenir des lettres et des espaces'
          );
        } else if (
          !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(patientEmail)
        ) {
          setErrorMessage("L'adresse e-mail n'est pas valide");
        } else if (!/^[a-zA-Z\s]+$/.test(patientName)) {
          setErrorMessage('Le prénom doit uniquement contenir des lettres');
        } else if (!/^[a-zA-Z\s]+$/.test(patientSurname)) {
          setErrorMessage(
            'Le nom de famille doit uniquement contenir des lettres'
          );
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(patientBirthDate)) {
          setErrorMessage(
            'La date de naissance doit être au format YYYY-MM-DD'
          );
        } else if (new Date(patientBirthDate) >= new Date()) {
          setErrorMessage(
            'La date de naissance ne peut pas être dans le futur'
          );
        } else {
          if ([...formData.entries()].length > 0) {
            updatePromises.push(
              handlePatientUpdate(formData).then((response) => {
                if (response) {
                  updatePatientDataInLocalStorage(
                    '',
                    `${formData.get('name')} ${formData.get('surname')}`
                  );
                  console.log('Patient updated successfully');
                }
              })
            );
          }
        }
      }

      await Promise.all(updatePromises);
      console.log('All updates processed successfully');
      setIsProfileEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error modifying patient profile:', error);
    }
  };

  return (
    <>
      {isFirstPatient && isPatientTherapistProfileCard ? (
        <p>Vous n'avez pas de thérapeute associé.</p>
      ) : (
        <div
          className={`${isPatientDetailsProfileCard ? 'md:w-4/6' : 'md:w-5/12'} w-10/12 bg-white mx-auto rounded-xl shadow-lg relative flex flex-col justify-center items-center`}
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
                  !preview && isPatientDetailsProfileCard && patient
                    ? patient.picture_url
                    : preview && isPatientDetailsProfileCard && patient
                      ? preview
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? patientTherapistData?.therapist?.picture_url
                        : ''
                }
                alt={
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? patient.fullName
                    : isPatientTherapistProfileCard &&
                        patientTherapistData?.therapist
                      ? patientTherapistData?.therapist?.fullName
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
          {!isProfileEditing ? (
            <div className="w-full">
              <p className="text-xl md:text-2xl mt-8">
                {isPatientDetailsProfileCard && patient && !isProfileEditing
                  ? patient.surname
                  : isPatientTherapistProfileCard &&
                      patientTherapistData?.therapist
                    ? patientTherapistData?.therapist?.surname
                    : ''}{' '}
                <span className="font-semibold">
                  {isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? patient.name
                    : isPatientTherapistProfileCard &&
                        patientTherapistData?.therapist
                      ? patientTherapistData?.therapist?.name
                      : ''}
                </span>
              </p>
              <p className="text-primaryBlue italic font-semibold mb-6">
                {`${
                  isPatientDetailsProfileCard && patient && !isProfileEditing
                    ? `${patient.age} ans`
                    : isPatientTherapistProfileCard &&
                        patientTherapistData?.therapist
                      ? 'masseur kinésithérapeute'
                      : ''
                }`}
              </p>
              <div className="flex justify-around text-xs md:text-base">
                <p className="font-semibold text-primaryBlue w-2/4 italic">
                  {`${
                    isPatientDetailsProfileCard && patient && !isProfileEditing
                      ? 'Adresse'
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? 'Diplôme'
                        : ''
                  }`}
                </p>
                <p className="w-3/4">
                  {' '}
                  {`${
                    isPatientDetailsProfileCard && patient && !isProfileEditing
                      ? patient.address
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? patientTherapistData?.therapist?.diploma
                        : ''
                  }`}
                </p>
              </div>
              <div className="flex justify-around text-xs md:text-base">
                <p className="font-semibold text-primaryBlue w-2/4 italic">
                  {`${
                    isPatientDetailsProfileCard && patient && !isProfileEditing
                      ? 'Téléphone'
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? 'Spécialité'
                        : ''
                  }`}
                </p>
                <p className="w-3/4">
                  {' '}
                  {`${
                    isPatientDetailsProfileCard && patient && !isProfileEditing
                      ? patient.full_phone_number
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? patientTherapistData?.therapist?.specialty
                        : ''
                  }`}
                </p>
              </div>
              <div className="flex justify-around mb-6 text-xs md:text-base">
                <p className="font-semibold text-primaryBlue w-2/4 italic">
                  {`${
                    isPatientDetailsProfileCard && patient && !isProfileEditing
                      ? 'Mutuelle'
                      : isPatientTherapistProfileCard &&
                          patientTherapistData?.therapist
                        ? 'Experience'
                        : ''
                  }`}
                </p>
                <p className="w-3/4">
                  {isPatientDetailsProfileCard &&
                  patient &&
                  !isProfileEditing ? (
                    isInsuranceAdded ? (
                      patient.insurance && patient.insurance[0]?.name ? (
                        patient.insurance[0]?.name
                      ) : (
                        'Pas de mutuelle'
                      )
                    ) : (
                      <CustomButton
                        btnText="+ Ajouter une mutuelle"
                        profileCardAddInsuranceButton
                        onClick={() => setIsAddInsuranceModalOpen(true)}
                      />
                    )
                  ) : isPatientTherapistProfileCard &&
                    patientTherapistData?.therapist ? (
                    patientTherapistData?.therapist?.experience
                  ) : (
                    ''
                  )}
                </p>
              </div>
              {isPatientTherapistProfileCard &&
                patientTherapistData?.therapist && (
                  <p className="px-4 italic mb-6">
                    "{patientTherapistData?.therapist?.description}"
                  </p>
                )}
              <div className="bg-primaryBlue flex items-center justify-center gap-4 w-full">
                {isPatientTherapistProfileCard &&
                  patientTherapistData?.therapist && (
                    <div className="flex gap-2 p-2">
                      <Link to="#">
                        <img
                          src={linkedInIcon}
                          alt="LinkedIn"
                          className="w-8"
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src={facebookIcon}
                          alt="facebook"
                          className="w-8"
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src={instagramIcon}
                          alt="instagram"
                          className="w-8"
                        />
                      </Link>
                      <Link to="#">
                        <img src={phoneIcon} alt="phone" className="w-8" />
                      </Link>
                    </div>
                  )}
                <div>
                  <p className="text-white text-base py-4">
                    {isPatientTherapistProfileCard &&
                      patientTherapistData?.therapist &&
                      `   / ${patientTherapistData?.therapist?.surname.toLowerCase()}
                  ${patientTherapistData?.therapist?.name.toLowerCase()}`}

                    {isPatientDetailsProfileCard &&
                      patient &&
                      `   / ${patient.surname.toLowerCase()}${patient.name.toLowerCase()}`}
                  </p>
                </div>
              </div>
              {isPatientTherapistProfileCard &&
                patientTherapistData?.therapist && (
                  <div className="bg-primaryTeal py-4 rounded-b-xl">
                    <form action="POST" onSubmit={handlePatientMessageSubmit}>
                      <StandardTextInput
                        patientSection={{ isPatientMessageInput: true }}
                      />
                      <CustomButton
                        btnText="Envoyer"
                        profileCardSendMessageButton
                      />
                    </form>
                  </div>
                )}
              {isPatientDetailsProfileCard && patient && (
                <div className="bg-primaryTeal py-4 rounded-b-xl">
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
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-xs md:text-base mt-14 w-full">
              <form
                action="POST"
                className="w-full flex flex-col items-center"
                onSubmit={handlePatientProfileModification}
              >
                {' '}
                <div className="w-11/12 flex flex-col gap-2 justify-center items-center">
                  {errorMessage && (
                    <p className="text-red-500 text-base">{errorMessage}</p>
                  )}{' '}
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
                  <div className="flex flex-col md:flex-row gap-4 w-full">
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
                  <div className="flex flex-col md:flex-row gap-4  w-full">
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
                  <div className="flex flex-col md:flex-row gap-4 w-full">
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
                  <div className="flex flex-col md:flex-row gap-2 justify-between w-full mb-4">
                    <div className="flex gap-2 items-center">
                      {isInsuranceEdited && (
                        <img src={checkIcon} alt="check" className="w-6 h-6" />
                      )}{' '}
                      <Link
                        to="#"
                        onClick={() => setIsEditInsuranceModalOpen(true)}
                      >
                        {' '}
                        <p className="flex gap-2 items-center hover:transform hover:scale-105 transition-transform duration-200">
                          <EditIcon />
                          <span className="text-primaryBlue italic font-medium text-xs md:text-base xl:text-xl text-start">
                            {' '}
                            Modifier l'assurance mutuelle
                          </span>
                        </p>
                      </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                      {isPasswordEdited && (
                        <img src={checkIcon} alt="check" className="w-6 h-6" />
                      )}{' '}
                      <Link
                        to="#"
                        onClick={() => setIsEditPasswordModalOpen(true)}
                      >
                        {' '}
                        <p className="flex gap-2 items-center hover:transform hover:scale-105 transition-transform duration-200">
                          <EditIcon />
                          <span className="text-primaryBlue italic font-medium text-xs md:text-base xl:text-xl text-start">
                            {' '}
                            Modifier votre mot de passe
                          </span>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-primaryBlue flex items-center justify-center gap-4 w-full">
                  <div>
                    <p className="text-white text-base py-4">
                      {isPatientDetailsProfileCard &&
                        patient &&
                        `   / ${patient.surname.toLowerCase()}${patient.name.toLowerCase()}`}
                    </p>
                  </div>
                </div>
                <div className="bg-primaryTeal py-4 rounded-b-xl w-full">
                  <div className="flex justify-center gap-4">
                    <CustomButton
                      btnText="Enregistrer modifications"
                      profileCardModifyProfileButton
                      btnType="submit"
                    />
                    <CustomButton
                      btnText="Annuler"
                      mobileCancelButton
                      onClick={() => {
                        setIsProfileEditing(false);
                        if (preview) {
                          setPreview(undefined);
                        }
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
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

      {isAddInsuranceModalOpen && (
        <EditPatientModal
          setIsAddInsuranceModalOpen={setIsAddInsuranceModalOpen}
          isAddInsuranceModalOpen={isAddInsuranceModalOpen}
        />
      )}

      {isEditInsuranceModalOpen && (
        <EditPatientModal
          patientId={patientId}
          setIsEditInsuranceModalOpen={setIsEditInsuranceModalOpen}
          isEditInsuranceModalOpen={isEditInsuranceModalOpen}
          old_insurance_name={patient?.insurance?.[0]?.name}
          old_start_date={
            patient?.insurance?.[0]?.Patient_Insurance?.start_date
          }
          old_end_date={patient?.insurance?.[0]?.Patient_Insurance?.end_date}
          old_contract_number={
            patient?.insurance?.[0]?.Patient_Insurance?.contract_number
          }
          old_adherent_code={
            patient?.insurance?.[0]?.Patient_Insurance?.adherent_code
          }
          setIsInsuranceEdited={setIsInsuranceEdited}
          setNewInsurance={setNewInsurance}
        />
      )}

      {isEditPasswordModalOpen && (
        <EditPatientModal
          setIsEditPasswordModalOpen={setIsEditPasswordModalOpen}
          isEditPasswordModalOpen={isEditPasswordModalOpen}
          patientId={patientId}
          setNewPassword={setNewPassword}
          setIsPasswordEdited={setIsPasswordEdited}
        />
      )}
    </>
  );
}
