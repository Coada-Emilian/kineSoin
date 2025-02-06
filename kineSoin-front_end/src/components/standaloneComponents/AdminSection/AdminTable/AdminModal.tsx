// Purpose: Provide the first step of the modal to add a therapist.

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../Button/CustomButton';
import StandardTextInput from '../../StandardInputs/StandardTextInput';
import StandardFileInput from '../../StandardInputs/StandardFileInput';
import StandardEmailInput from '../../StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../StandardInputs/StandardPasswordInput';
import StandardChoiceDropdown from '../../StandardInputs/StandardDropdownInput';
import { handleTherapistCreation } from '../../../../utils/apiUtils';

interface AdminModalProps {
  setAddForm?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      email: string;
      password: string;
      repeated_password: string;
      description: string;
      diploma: string;
      experience: string;
      specialty: string;
      licence_code: string;
      status: string;
      photo: File | unknown;
    }>
  >;
  isAddTherapistModalP1Open?: boolean;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstAddTherapistModal?: boolean;
  isSecondAddTherapistModal?: boolean;
  isAddTherapistModalP2Open?: boolean;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  isThirdAddTherapistModal?: boolean;
  isAddTherapistModalP3Open?: boolean;
  addForm?: {
    name: string;
    surname: string;
    email: string;
    password: string;
    repeated_password: string;
    description: string;
    diploma: string;
    experience: string;
    specialty: string;
    licence_code: string;
    status: string;
    photo: File | unknown;
  };
  isAdminAfflictionAddModal?: boolean;
  isAddAfflictionModalOpen?: boolean;
  setIsAddAfflictionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminModal({
  setAddForm,
  isAddTherapistModalP1Open,
  setIsAddTherapistModalP1Open,
  setIsAddTherapistModalP2Open,
  isFirstAddTherapistModal,
  isSecondAddTherapistModal,
  isAddTherapistModalP2Open,
  setIsAddTherapistModalP3Open,
  isThirdAddTherapistModal,
  isAddTherapistModalP3Open,
  addForm,
  isAdminAfflictionAddModal,
  isAddAfflictionModalOpen,
  setIsAddAfflictionModalOpen,
}: AdminModalProps) {
  // State to store the preview URL of the uploaded photo
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [therapistImageFile, setTherapistImageFile] = useState<File | null>(
    null
  );

  // Function to add form details and move to the next step
  const addFirstFormDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistName = formData.get('name') as string;
    const therapistSurname = formData.get('surname') as string;
    const therapistLicenceCode = formData.get('licence_code') as string;
    const file = therapistImageFile;

    // Field Validation
    if (!therapistName || !therapistSurname || !therapistLicenceCode) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }
    if (!file) {
      setErrorMessage('Veuillez ajouter une photo.');
      return;
    }
    if (!/^[0-9]{9}$/.test(therapistLicenceCode)) {
      setErrorMessage('Le code ADELI doit être composé de 9 chiffres.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistName)) {
      setErrorMessage(
        'Le nom ne doit contenir que des lettres et des espaces.'
      );
      return;
    }
    if (
      !/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistSurname)
    ) {
      setErrorMessage(
        'Le prénom ne doit contenir que des lettres et des espaces.'
      );
      return;
    }

    setAddForm &&
      setAddForm({
        name: therapistName,
        surname: therapistSurname,
        email: '',
        password: '',
        repeated_password: '',
        description: '',
        diploma: '',
        experience: '',
        specialty: '',
        licence_code: therapistLicenceCode,
        status: '',
        photo: file,
      });

    setIsAddTherapistModalP1Open && setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(true);
  };

  const addSecondFormDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistDiploma = formData.get('diploma') as string;
    const therapistExperience = formData.get('experience') as string;
    const therapistSpecialty = formData.get('specialty') as string;
    const therapistDescription = formData.get('description') as string;

    if (
      !therapistDiploma ||
      !therapistExperience ||
      !therapistSpecialty ||
      !therapistDescription
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (therapistDiploma.length > 100) {
      setErrorMessage('Le diplôme ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistExperience.length > 100) {
      setErrorMessage("L'expérience ne doit pas dépasser 100 caractères.");
      return;
    } else if (therapistSpecialty.length > 100) {
      setErrorMessage('La spécialité ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistDescription.length > 500) {
      setErrorMessage('La description ne doit pas dépasser 500 caractères.');
      return;
    }

    setAddForm &&
      setAddForm((prev) => ({
        ...prev,
        description: therapistDescription,
        diploma: therapistDiploma,
        experience: therapistExperience,
        specialty: therapistSpecialty,
      }));
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(false);
    setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(true);
  };

  const [isAdminTherapistFormValid, setIsAdminTherapistFormValid] =
    useState(false);

  const addThirdFormDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistEmail = formData.get('email') as string;
    const therapistPassword = formData.get('password') as string;
    const therapistRepeatedPassword = formData.get(
      'repeated_password'
    ) as string;
    const therapistStatus = formData.get('status') as string;

    if (
      !therapistEmail ||
      !therapistPassword ||
      !therapistRepeatedPassword ||
      !therapistStatus
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (therapistPassword.length < 12) {
      setErrorMessage('Le mot de passe doit contenir au moins 12 caractères.');
      return;
    } else if (!/(?=.*[a-z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une minuscule.');
      return;
    } else if (!/(?=.*[A-Z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une majuscule.');
      return;
    } else if (!/(?=.*\d)/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins un chiffre.');
      return;
    } else if (!/(?=.*\W)/.test(therapistPassword)) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins un caractère spécial.'
      );
      return;
    } else if (therapistPassword !== therapistRepeatedPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(therapistEmail)
    ) {
      setErrorMessage("L'email n'est pas valide.");
      return;
    }

    setAddForm &&
      setAddForm((prev) => ({
        ...prev,
        email: therapistEmail,
        password: therapistPassword,
        repeated_password: therapistRepeatedPassword,
        status: therapistStatus,
      }));

    setIsAdminTherapistFormValid(true);
  };

  useEffect(() => {
    const createTherapist = async () => {
      const newFormData = new FormData();
      newFormData.append('name', addForm?.name as string);
      newFormData.append('surname', addForm?.surname as string);
      newFormData.append('email', addForm?.email as string);
      newFormData.append('password', addForm?.password as string);
      newFormData.append(
        'repeated_password',
        addForm?.repeated_password as string
      );
      newFormData.append('description', addForm?.description as string);
      newFormData.append('diploma', addForm?.diploma as string);
      newFormData.append('experience', addForm?.experience as string);
      newFormData.append('specialty', addForm?.specialty as string);
      newFormData.append('licence_code', addForm?.licence_code as string);
      newFormData.append('status', addForm?.status as string);
      newFormData.append('photo', addForm?.photo as Blob);

      const response = await handleTherapistCreation(newFormData);
      if (response) {
        setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(false);
        window.location.reload();
      } else {
        setErrorMessage(
          'Une erreur est survenue lors de la création du compte.'
        );
      }
    };
    if (isAdminTherapistFormValid) {
      createTherapist();
    }
  }, [isAdminTherapistFormValid]);

  return (
    <ReactModal
      isOpen={
        isFirstAddTherapistModal
          ? !!isAddTherapistModalP1Open
          : false || isSecondAddTherapistModal
            ? !!isAddTherapistModalP2Open
            : false || isThirdAddTherapistModal
              ? !!isAddTherapistModalP3Open
              : isAdminAfflictionAddModal
                ? !!isAddAfflictionModalOpen
                : false
      }
      onRequestClose={() => {
        if (isFirstAddTherapistModal && setIsAddTherapistModalP1Open) {
          setIsAddTherapistModalP1Open(false);
        }
        if (isSecondAddTherapistModal && setIsAddTherapistModalP2Open) {
          setIsAddTherapistModalP2Open(false);
        }
        if (isThirdAddTherapistModal && setIsAddTherapistModalP3Open) {
          setIsAddTherapistModalP3Open(false);
        }
        if (isAdminAfflictionAddModal && setIsAddAfflictionModalOpen) {
          setIsAddAfflictionModalOpen(false);
        }
      }}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          {(isFirstAddTherapistModal ||
            isSecondAddTherapistModal ||
            isThirdAddTherapistModal) &&
            'Ajouter un thérapeute'}
          {isAdminAfflictionAddModal && 'Ajouter une affliction'}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4"
          onSubmit={
            isFirstAddTherapistModal
              ? addFirstFormDetails
              : isSecondAddTherapistModal
                ? addSecondFormDetails
                : isThirdAddTherapistModal
                  ? addThirdFormDetails
                  : () => {}
          }
        >
          {(isFirstAddTherapistModal ||
            isSecondAddTherapistModal ||
            isThirdAddTherapistModal) && (
            <>
              {isFirstAddTherapistModal && (
                <>
                  <StandardTextInput isAdminTherapistAddNameInput />

                  <StandardTextInput isAdminTherapistAddSurnameInput />

                  <StandardTextInput isAdminTherapistAddLicenceCodeInput />

                  <StandardFileInput
                    isAdminTherapistImageAddInput
                    setPreviewUrl={setPreviewUrl}
                    setTherapistImageFile={setTherapistImageFile}
                  />

                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Therapist"
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <p className="text-xs md:text-sm text-center">
                      Aucune image disponible
                    </p>
                  )}
                </>
              )}

              {isSecondAddTherapistModal && (
                <>
                  <StandardTextInput isAdminTherapistAddDiplomaInput />

                  <StandardTextInput isAdminTherapistAddExperienceInput />

                  <StandardTextInput isAdminTherapistAddSpecialtyInput />

                  <StandardTextInput
                    isAdminTherapistAddDescriptionInput
                    isTextAreaInput
                  />
                </>
              )}

              {isThirdAddTherapistModal && (
                <>
                  <StandardEmailInput isAdminTherapistAddEmailInput />

                  <StandardPasswordInput isAdminTherapistAddPasswordInput />

                  <StandardPasswordInput
                    isAdminTherapistAddRepeatedPasswordInput
                  />
                  <StandardChoiceDropdown isAdminTherapistAddStatusInput />
                </>
              )}

              <p className="text-red-500 text-center text-xs md:text-sm">
                {isFirstAddTherapistModal
                  ? 'Etape 1 / 3 : Informations personnelles'
                  : isSecondAddTherapistModal
                    ? 'Etape 2 / 3 : Études'
                    : 'Etape 3 / 3 : Finition'}
              </p>
            </>
          )}

          {isAdminAfflictionAddModal && (
            <>
              <StandardTextInput isAdminAfflictionAddNameInput />

              <StandardChoiceDropdown isAdminAfflictionAddRegionInput />
            </>
          )}

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton
              btnText={`${isFirstAddTherapistModal || isSecondAddTherapistModal ? 'Suivant' : 'Valider'}`}
              btnType="submit"
              normalButton
            />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => {
                if (isFirstAddTherapistModal && setIsAddTherapistModalP1Open) {
                  setIsAddTherapistModalP1Open(false);
                }
                if (isSecondAddTherapistModal && setIsAddTherapistModalP2Open) {
                  setIsAddTherapistModalP2Open(false);
                }
                if (isThirdAddTherapistModal && setIsAddTherapistModalP3Open) {
                  setIsAddTherapistModalP3Open(false);
                }
                if (isAdminAfflictionAddModal && setIsAddAfflictionModalOpen) {
                  setIsAddAfflictionModalOpen(false);
                }
              }}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
