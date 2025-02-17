import ReactModal from 'react-modal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { useEffect, useState } from 'react';
import UserPhotoIcon from '/icons/user-photo.png';
import {
  checkPatientCredentials,
  fetchInsurancesAsPatient,
  handlePatientInsuranceAdd,
} from '../../../../../utils/apiUtils';
import StandardChoiceDropdown from '../../../generalComponents/StandardInputs/StandardDropdownInput';
import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';
import { IInsurance, IPatient_Insurance } from '../../../../../@types/types';

interface EditPatientModalProps {
  setIsPhoneNumberEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isPhoneNumberEditModalOpen?: boolean;
  phone_number?: string;
  setNewPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  setIsPhotoEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isPhotoEditModalOpen?: boolean;
  setNewPhoto?: React.Dispatch<React.SetStateAction<File | null>>;
  old_photo?: string;
  setPreview?: React.Dispatch<React.SetStateAction<string | undefined>>;
  preview?: string;
  setIsAddressEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressEditModalOpen?: boolean;
  setNewAddress?: React.Dispatch<React.SetStateAction<object>>;
  old_address?: string;
  old_street_number?: string;
  old_street_name?: string;
  old_postal_code?: string;
  old_city?: string;
  setIsEditInsuranceModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditInsuranceModalOpen?: boolean;
  setNewInsurance?: React.Dispatch<
    React.SetStateAction<IPatient_Insurance | undefined>
  >;
  old_insurance_name?: string;
  old_start_date?: string;
  old_end_date?: string;
  old_contract_number?: string;
  old_adherent_code?: string;
  patientId?: number;
  setIsEmailEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailEditModalOpen?: boolean;
  old_email?: string;
  setNewEmail?: React.Dispatch<React.SetStateAction<string>>;
  setNewInsuranceName?: React.Dispatch<React.SetStateAction<string>>;
  setIsEditPasswordModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditPasswordModalOpen?: boolean;
  setNewPassword?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsAddInsuranceModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAddInsuranceModalOpen?: boolean;
  setAddedPatientInsurance?: React.Dispatch<
    React.SetStateAction<IInsurance | undefined>
  >;
  setIsInsuranceAdded?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNameAndAgeEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isNameAndAgeEditModalOpen?: boolean;
  old_name?: string;
  old_surname?: string;
  old_birth_date?: string;
  setNewName?: React.Dispatch<React.SetStateAction<string>>;
  setNewSurname?: React.Dispatch<React.SetStateAction<string>>;
  setNewBirthDate?: React.Dispatch<React.SetStateAction<string>>;
  old_insurance?: IInsurance;
  setIsInsuranceEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPasswordEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPatientModal({
  setIsPhotoEditModalOpen,
  isPhotoEditModalOpen,
  setNewPhoto,
  old_photo,
  setPreview,
  preview,
  setIsEditInsuranceModalOpen,
  isEditInsuranceModalOpen,
  setNewInsurance,
  old_insurance_name,
  old_start_date,
  old_end_date,
  old_contract_number,
  old_adherent_code,
  setNewInsuranceName,
  setIsEditPasswordModalOpen,
  isEditPasswordModalOpen,
  setNewPassword,
  setIsAddInsuranceModalOpen,
  isAddInsuranceModalOpen,
  setIsInsuranceAdded,
  setIsInsuranceEdited,
  setIsPasswordEdited,
}: EditPatientModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isNewPhotoAdded, setIsNewPhotoAdded] = useState<boolean>(false);

  const [insurances, setInsurances] = useState<IInsurance[]>([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      const insurancesData = await fetchInsurancesAsPatient();
      setInsurances(insurancesData);
    };
    fetchInsurances();
  }, []);

  const handlePhotoEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPhoto = formData.get('new_photo') as File;
    if (!newPhoto) {
      setErrorMessage('Veuillez choisir une photo');
    } else {
      setNewPhoto && setNewPhoto(newPhoto);
      setIsPhotoEditModalOpen && setIsPhotoEditModalOpen(false);
      setIsNewPhotoAdded && setIsNewPhotoAdded(true);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview && setPreview(previewUrl);
      setFileName(file.name);
    }
  };

  const handleInsuranceEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInsuranceData: Partial<
      IInsurance & {
        insurance_id?: string;
        start_date?: string;
        end_date?: string;
        contract_number?: string;
        adherent_code?: string;
      }
    > = {};

    const insurance_id = formData.get('insurance_id') as string;
    if (!insurance_id) {
      setErrorMessage('Veuillez choisir une mutuelle');
    } else if (insurance_id.match(/^[0-9]+$/) === null) {
      setErrorMessage('Veuillez choisir une mutuelle valide');
    } else {
      newInsuranceData.insurance_id = insurance_id;
    }

    const current_date = new Date();
    const start_date = formData.get('start_date') as string;
    if (start_date.length === 0) {
      setErrorMessage('Veuillez choisir une date de début');
    } else if (start_date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null) {
      setErrorMessage('Veuillez choisir une date de début valide');
    }

    const end_date = formData.get('end_date') as string;
    if (end_date.length === 0) {
      setErrorMessage('Veuillez choisir une date de fin');
    } else if (end_date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null) {
      setErrorMessage('Veuillez choisir une date de fin valide');
    } else {
      const endDateObj = new Date(end_date);
      const startDateObj = new Date(start_date);

      // Check if end date is within 365 days of start date
      const diffTime = endDateObj.getTime() - startDateObj.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays > 365) {
        setErrorMessage(
          'La date de fin ne peut pas être plus de 365 jours après la date de début'
        );
      } else if (endDateObj < current_date) {
        setErrorMessage('La date de fin ne peut pas être dans le passé');
      } else {
        newInsuranceData['end_date'] = end_date;
      }
    }

    const contract_number = formData.get('contract_number') as string;
    if (contract_number.length === 0) {
      setErrorMessage('Le numéro de contrat ne peut pas être vide');
    } else if (contract_number.length > 15) {
      setErrorMessage(
        'Le numéro de contrat doit contenir moins de 15 caractères'
      );
    } else {
      newInsuranceData['contract_number'] = contract_number;
    }

    const adherent_code = formData.get('adherent_code') as string;
    if (adherent_code.length === 0) {
      setErrorMessage('Le code adhérent ne peut pas être vide');
    } else if (adherent_code.length > 12) {
      setErrorMessage('Le code adhérent doit contenir moins de 12 caractères');
    } else {
      newInsuranceData['adherent_code'] = adherent_code;
    }

    if (
      Object.keys(newInsuranceData).length === 5 &&
      Object.values(newInsuranceData).every(
        (value) => typeof value === 'string' && value.length > 0
      )
    ) {
      const insuranceName = insurances.find(
        (insurance) => insurance.id === parseInt(insurance_id)
      )?.name;
      if (insuranceName) {
        setNewInsuranceName && setNewInsuranceName(insuranceName);
      }
      setNewInsurance &&
        setNewInsurance({
          ...newInsuranceData,
          insurance_id: parseInt(newInsuranceData.insurance_id as string),
        } as IPatient_Insurance);
      setIsEditInsuranceModalOpen && setIsEditInsuranceModalOpen(false);
      setIsInsuranceEdited && setIsInsuranceEdited(true);
    }
  };

  const handlePasswordEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get('old_password') as string;
    console.log(oldPassword);
    if (oldPassword.length === 0) {
      setErrorMessage('Veuillez entrer votre ancien mot de passe');
    } else {
      const response = await checkPatientCredentials(oldPassword);
      if (!response) {
        setErrorMessage("L'ancien mot de passe est incorrect");
      } else {
        setErrorMessage('');
        const newPassword = formData.get('new_password') as string;
        const repeatPassword = formData.get('repeat_password') as string;
        if (newPassword.length === 0) {
          setErrorMessage('Veuillez entrer votre nouveau mot de passe');
        } else if (newPassword.length < 12) {
          setErrorMessage(
            'Le mot de passe doit contenir au moins 12 caractères'
          );
        } else if (newPassword !== repeatPassword) {
          setErrorMessage('Les mots de passe ne correspondent pas');
        } else if (newPassword === oldPassword) {
          setErrorMessage(
            "Le nouveau mot de passe doit être différent de l'ancien"
          );
        } else if (
          newPassword.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
          ) === null
        ) {
          setErrorMessage(
            'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre & 1 caractère spécial'
          );
        } else {
          setNewPassword && setNewPassword(newPassword);
          setIsEditPasswordModalOpen && setIsEditPasswordModalOpen(false);
          setIsPasswordEdited && setIsPasswordEdited(true);
        }
      }
    }
  };

  const handleInsuranceAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const insurance_id = formData.get('insurance_id') as string;
    if (!insurance_id) {
      setErrorMessage('Veuillez choisir une mutuelle');
      return;
    } else if (!/^[0-9]+$/.test(insurance_id)) {
      setErrorMessage('Veuillez choisir une mutuelle valide');
      return;
    }

    const start_date = formData.get('start_date') as string;
    if (!start_date) {
      setErrorMessage('Veuillez choisir une date de début');
      return;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
      setErrorMessage('Veuillez choisir une date de début valide');
      return;
    }

    const end_date = formData.get('end_date') as string;
    if (!end_date) {
      setErrorMessage('Veuillez choisir une date de fin');
      return;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
      setErrorMessage('Veuillez choisir une date de fin valide');
      return;
    }

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (endDateObj < startDateObj) {
      setErrorMessage(
        'La date de fin doit être postérieure à la date de début'
      );
      return;
    } else if (daysDifference > 365) {
      setErrorMessage('La mutuelle ne peut pas dépasser 365 jours');
      return;
    }

    const contract_number = formData.get('contract_number') as string;
    if (!contract_number) {
      setErrorMessage('Le numéro de contrat ne peut pas être vide');
      return;
    } else if (contract_number.length > 15) {
      setErrorMessage(
        'Le numéro de contrat doit contenir moins de 15 caractères'
      );
      return;
    }

    const adherent_code = formData.get('adherent_code') as string;
    if (!adherent_code) {
      setErrorMessage('Le code adhérent ne peut pas être vide');
      return;
    } else if (adherent_code.length > 12) {
      setErrorMessage('Le code adhérent doit contenir moins de 12 caractères');
      return;
    }

    const response = await handlePatientInsuranceAdd(formData);
    if (response) {
      setIsInsuranceAdded && setIsInsuranceAdded(true);
      setIsAddInsuranceModalOpen && setIsAddInsuranceModalOpen(false);
      window.location.reload();
    } else {
      setErrorMessage('Une erreur est survenue');
    }
  };

  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <ReactModal
      isOpen={
        !!isPhotoEditModalOpen ||
        !!isEditPasswordModalOpen ||
        !!isAddInsuranceModalOpen ||
        !!isEditInsuranceModalOpen
      }
      onRequestClose={() => {
        if (setIsPhotoEditModalOpen) setIsPhotoEditModalOpen(false);
        if (setIsEditPasswordModalOpen) setIsEditPasswordModalOpen(false);
        if (setIsAddInsuranceModalOpen) setIsAddInsuranceModalOpen(false);
        if (setIsEditInsuranceModalOpen) setIsEditInsuranceModalOpen(false);
      }}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '0px',
          borderRadius: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div>
        <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full text-center">
          <p className="text-base md:text-lg">Cabinet kinésithérapie Ruffec</p>
        </div>
        <div className="bg-primaryTeal py-4 w-full">
          <h3 className="text-xl text-center font-semibold text-primaryBlue italic">
            {isPhotoEditModalOpen ? 'Modifier votre photo' : ''}
            {isEditPasswordModalOpen ? 'Modifier votre mot de passe' : ''}
            {isAddInsuranceModalOpen ? 'Ajouter une mutuelle' : ''}
            {isEditInsuranceModalOpen ? 'Modifier votre mutuelle' : ''}
          </h3>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center text-sm font-medium">
            {errorMessage}
          </p>
        )}

        <form
          onSubmit={
            isPhotoEditModalOpen
              ? handlePhotoEdit
              : isEditInsuranceModalOpen
                ? handleInsuranceEdit
                : isEditPasswordModalOpen
                  ? handlePasswordEdit
                  : isAddInsuranceModalOpen
                    ? handleInsuranceAdd
                    : () => {}
          }
          className="flex flex-col mt-2 italic text-primaryBlue font-medium"
        >
          <div
            className={`flex flex-col gap-4 mb-2 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
          >
            <label>{isPhotoEditModalOpen ? 'Ancienne photo ' : ''}</label>

            {isPhotoEditModalOpen && (
              <img
                src={old_photo}
                alt="ancienne photo"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}

            {isEditPasswordModalOpen && (
              <div className="flex flex-col gap-2 mx-6 my-2">
                <StandardPasswordInput isOldPasswordInput />
                <StandardPasswordInput isNewPasswordInput />
                <StandardPasswordInput isRepeatPasswordInput />
              </div>
            )}
          </div>

          <div
            className={`flex flex-col gap-4 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
          >
            <label htmlFor={isPhotoEditModalOpen ? 'patient-new-photo' : ''}>
              {isPhotoEditModalOpen ? 'Nouvelle photo' : ''}
            </label>

            {isPhotoEditModalOpen && !isNewPhotoAdded && (
              <div className=" flex flex-col items-center gap-2 w-full ">
                {preview ? (
                  <img
                    src={preview}
                    alt="Aperçu du fichier"
                    className="w-32 h-32 object-cover mb-4 rounded-full"
                  />
                ) : (
                  <img
                    src={UserPhotoIcon}
                    alt="user icon"
                    className="w-32 h-32 object-cover mb-4"
                  />
                )}

                <div className="flex flex-col justify-center items-center w-full bg-primaryBlue text-white">
                  <label
                    htmlFor="new-photo-input"
                    className="cursor-pointer bg-primaryBlue text-white py-2 px-4 w-full text-center"
                  >
                    Chargez votre nouvelle photo
                  </label>

                  <input
                    type="file"
                    name="new_photo"
                    id="new-photo-input"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                  {fileName && (
                    <div className="text-xs mb-2">
                      {' '}
                      <span>Fichier choisi:</span>
                      <span className="font-medium">{fileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(isEditInsuranceModalOpen || isAddInsuranceModalOpen) && (
              <div className="flex flex-col gap-2 mx-6 my-2">
                <StandardChoiceDropdown
                  isPatientInsuranceDropdownInput
                  oldPatientInsuranceName={
                    isAddInsuranceModalOpen ? undefined : old_insurance_name
                  }
                  insuranceList={insurances}
                />

                <div className="w-full">
                  <label>Validité :</label>
                  <div className="flex gap-1 text-xs md:text-sm justify-between items-center">
                    {' '}
                    <input
                      type="date"
                      defaultValue={old_start_date}
                      className="border p-2 rounded-lg w-1/3"
                      name="start_date"
                    />
                    <p>au</p>
                    <input
                      type="date"
                      defaultValue={old_end_date}
                      className="border p-2 rounded-lg  w-1/3"
                      name="end_date"
                    />
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <div className="w-1/2 text-xs">
                    <label>Numero contrat :</label>
                    <input
                      type="text"
                      defaultValue={old_contract_number}
                      className="border p-2 rounded-lg w-full"
                      name="contract_number"
                    />
                  </div>
                  <div className="w-1/2 text-xs">
                    <label>Code adherent :</label>
                    <input
                      type="text"
                      defaultValue={old_adherent_code}
                      className="border p-2 rounded-lg w-full"
                      name="adherent_code"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center py-4  bg-primaryTeal">
            <CustomButton
              btnText="Valider"
              profileCardModifyProfileButton
              btnType="submit"
            />

            <CustomButton
              btnText="Annuler"
              mobileCancelButton
              onClick={() => {
                setIsPhotoEditModalOpen && setIsPhotoEditModalOpen(false);
                setIsEditInsuranceModalOpen &&
                  setIsEditInsuranceModalOpen(false);
                setIsEditPasswordModalOpen && setIsEditPasswordModalOpen(false);
                setIsAddInsuranceModalOpen && setIsAddInsuranceModalOpen(false);
                setPreview && setPreview(undefined);
              }}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
