import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useEffect, useState } from 'react';
import UserPhotoIcon from '/icons/user-photo.png';
import { fetchInsurancesAsPatient } from '../../../../utils/apiUtils';
import StandardChoiceDropdown from '../StandardInputs/StandardDropdownInput';
import { IInsurance } from '../../../../@types/IInsurance';

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
  setIsInsuranceEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isInsuranceEditModalOpen?: boolean;
  setNewInsurance?: React.Dispatch<
    React.SetStateAction<IInsurance | undefined>
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
}

export default function EditPatientModal({
  setIsPhoneNumberEditModalOpen,
  isPhoneNumberEditModalOpen,
  phone_number,
  setNewPhoneNumber,
  setIsPhotoEditModalOpen,
  isPhotoEditModalOpen,
  setNewPhoto,
  old_photo,
  setPreview,
  preview,
  setIsAddressEditModalOpen,
  isAddressEditModalOpen,
  setNewAddress,
  old_address,
  old_street_number,
  old_street_name,
  old_postal_code,
  old_city,
  setIsInsuranceEditModalOpen,
  isInsuranceEditModalOpen,
  setNewInsurance,
  old_insurance_name,
  old_start_date,
  old_end_date,
  old_contract_number,
  old_adherent_code,
  patientId,
  setIsEmailEditModalOpen,
  isEmailEditModalOpen,
  old_email,
  setNewEmail,
  setNewInsuranceName,
}: EditPatientModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isNewPhotoAdded, setIsNewPhotoAdded] = useState<boolean>(false);

  const [insurances, setInsurances] = useState<IInsurance[]>([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      if (patientId) {
        const insurancesData = await fetchInsurancesAsPatient(patientId);
        setInsurances(insurancesData);
      }
    };
    fetchInsurances();
  }, []);

  const handlePhoneNumberEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPhoneNumber = formData.get('phone_number') as string;
    if (newPhoneNumber.length !== 10) {
      setErrorMessage('Le numéro de téléphone doit contenir 10 chiffres');
    } else if (newPhoneNumber === phone_number) {
      setErrorMessage(
        "Le nouveau numéro de téléphone doit être différent de l'ancien"
      );
    } else if (newPhoneNumber.match(/^[0-9]+$/) === null) {
      setErrorMessage(
        'Le numéro de téléphone doit contenir uniquement des chiffres'
      );
    } else {
      setNewPhoneNumber && setNewPhoneNumber(newPhoneNumber);
      setIsPhoneNumberEditModalOpen && setIsPhoneNumberEditModalOpen(false);
    }
  };

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
    }
  };

  const handleAddressEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress: { [key: string]: string } = {};
    const street_number = formData.get('street_number') as string;
    if (street_number.match(/^[0-9]+$/) === null) {
      setErrorMessage('Le numéro de rue doit contenir uniquement des chiffres');
    } else if (street_number.length === 0) {
      setErrorMessage('Le numéro de rue ne peut pas être vide');
    } else if (street_number.length > 5) {
      setErrorMessage('Le numéro de rue doit contenir moins de 6 chiffres');
    } else {
      newAddress['street_number'] = street_number;
    }

    const street_name = formData.get('street_name') as string;
    if (street_name.length === 0) {
      setErrorMessage('Le nom de rue ne peut pas être vide');
    } else if (street_name.length > 50) {
      setErrorMessage('Le nom de rue doit contenir moins de 50 caractères');
    } else if (street_name.match(/^[a-zA-Z\s]+$/) === null) {
      setErrorMessage('Le nom de rue doit contenir uniquement des lettres');
    } else {
      newAddress['street_name'] = street_name;
    }

    const postal_code = formData.get('postal_code') as string;
    if (postal_code.length === 0) {
      setErrorMessage('Le code postal ne peut pas être vide');
    } else if (postal_code.length !== 5) {
      setErrorMessage('Le code postal doit contenir 5 chiffres');
    } else if (postal_code.match(/^[0-9]+$/) === null) {
      setErrorMessage('Le code postal doit contenir uniquement des chiffres');
    } else {
      newAddress['postal_code'] = postal_code;
    }

    const city = formData.get('city') as string;
    if (city.length === 0) {
      setErrorMessage('La ville ne peut pas être vide');
    } else if (city.length > 50) {
      setErrorMessage('La ville doit contenir moins de 50 caractères');
    } else if (city.match(/^[a-zA-Z\s]+$/) === null) {
      setErrorMessage('La ville doit contenir uniquement des lettres');
    } else {
      newAddress['city'] = city;
    }

    const fullAddress = `${street_number} ${street_name}, ${postal_code} ${city}`;
    newAddress['full_address'] = fullAddress;

    if (
      Object.keys(newAddress).length === 5 &&
      Object.values(newAddress).every((value) => value.length > 0)
    ) {
      setNewAddress && setNewAddress(newAddress);
      setIsAddressEditModalOpen && setIsAddressEditModalOpen(false);
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
    } else if (new Date(start_date) > current_date) {
      setErrorMessage(
        'La date de début doit être ultérieure à la date actuelle'
      );
    } else if (start_date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null) {
      setErrorMessage('Veuillez choisir une date de début valide');
    } else {
      newInsuranceData['start_date'] = start_date;
    }

    const end_date = formData.get('end_date') as string;
    if (end_date.length === 0) {
      setErrorMessage('Veuillez choisir une date de fin');
    } else if (new Date(end_date) < current_date) {
      setErrorMessage(
        'La date de fin doit être postérieure à la date actuelle'
      );
    } else if (end_date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null) {
      setErrorMessage('Veuillez choisir une date de fin valide');
    } else {
      newInsuranceData['end_date'] = end_date;
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
      setNewInsurance && setNewInsurance(newInsuranceData as IInsurance);
      setIsInsuranceEditModalOpen && setIsInsuranceEditModalOpen(false);
    }
  };

  const handleEmailInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmail = formData.get('email') as string;
    if (newEmail.length === 0) {
      setErrorMessage("L'email ne peut pas être vide");
    } else if (newEmail === old_email) {
      setErrorMessage("Le nouvel email doit être différent de l'ancien");
    } else if (
      newEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null
    ) {
      setErrorMessage('Veuillez entrer une adresse email valide');
    } else {
      setNewEmail && setNewEmail(newEmail);
      setIsEmailEditModalOpen && setIsEmailEditModalOpen(false);
    }
  };

  return (
    <ReactModal
      isOpen={
        !!isPhoneNumberEditModalOpen ||
        !!isPhotoEditModalOpen ||
        !!isAddressEditModalOpen ||
        !!isInsuranceEditModalOpen ||
        !!isEmailEditModalOpen
      }
      onRequestClose={() => {
        if (setIsPhoneNumberEditModalOpen) setIsPhoneNumberEditModalOpen(false);
        if (setIsPhotoEditModalOpen) setIsPhotoEditModalOpen(false);
        if (setIsAddressEditModalOpen) setIsAddressEditModalOpen(false);
        if (setIsInsuranceEditModalOpen) setIsInsuranceEditModalOpen(false);
        if (setIsEmailEditModalOpen) setIsEmailEditModalOpen(false);
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
      <h3 className="text-xl text-center font-semibold text-primaryBlue italic mb-2">
        {isPhoneNumberEditModalOpen ? 'Modifier le numéro de téléphone' : ''}
        {isPhotoEditModalOpen ? 'Modifier votre photo' : ''}
        {isAddressEditModalOpen ? 'Modifier votre adresse' : ''}
        {isInsuranceEditModalOpen ? 'Modifier votre mutuelle' : ''}
        {isEmailEditModalOpen ? 'Modifier votre email' : ''}
      </h3>

      {errorMessage && (
        <p className="text-red-500 text-center text-sm font-medium">
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={
          isPhoneNumberEditModalOpen
            ? handlePhoneNumberEdit
            : isPhotoEditModalOpen
              ? handlePhotoEdit
              : isAddressEditModalOpen
                ? handleAddressEdit
                : isInsuranceEditModalOpen
                  ? handleInsuranceEdit
                  : isEmailEditModalOpen
                    ? handleEmailInput
                    : () => {}
        }
        className="flex flex-col gap-4 mt-4 italic text-primaryBlue font-medium"
      >
        <div
          className={`flex flex-col gap-4 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
        >
          <label>
            {isPhoneNumberEditModalOpen ? 'Ancien numéro de téléphone :' : ''}
            {isPhotoEditModalOpen ? 'Ancienne photo :' : ''}
            {isAddressEditModalOpen ? 'Ancienne adresse :' : ''}
            {isEmailEditModalOpen ? 'Ancien email :' : ''}
          </label>

          {isPhoneNumberEditModalOpen && (
            <input
              type="text"
              value={phone_number}
              className="border p-2 rounded-lg"
              readOnly
            />
          )}

          {isPhotoEditModalOpen && (
            <img
              src={old_photo}
              alt="ancienne photo"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}

          {isAddressEditModalOpen && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={old_address}
                className="border p-2 rounded-lg"
                readOnly
              />
            </div>
          )}

          {isEmailEditModalOpen && (
            <input
              type="text"
              value={old_email}
              className="border p-2 rounded-lg"
              readOnly
            />
          )}
        </div>

        <div
          className={`flex flex-col gap-4 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
        >
          <label
            htmlFor={
              isPhoneNumberEditModalOpen
                ? 'patient-new-phone_number'
                : isPhotoEditModalOpen
                  ? 'patient-new-photo'
                  : ''
            }
          >
            {isPhoneNumberEditModalOpen
              ? 'Nouveau numéro de téléphone :'
              : isPhotoEditModalOpen
                ? 'Nouvelle photo :'
                : isAddressEditModalOpen
                  ? 'Nouvelle adresse :'
                  : isEmailEditModalOpen
                    ? 'Nouvel email :'
                    : ''}
          </label>

          {isPhoneNumberEditModalOpen && (
            <input
              type="text"
              name="phone_number"
              id="patient-new-phone_number"
              placeholder={phone_number}
              className="border p-2 rounded-lg"
            />
          )}

          {isPhotoEditModalOpen && !isNewPhotoAdded && (
            <div className="mb-2 flex flex-col items-center gap-2">
              {preview ? (
                <img
                  src={preview}
                  alt="Aperçu du fichier"
                  className="w-32 h-32 object-cover mb-2 rounded-full"
                />
              ) : (
                <img
                  src={UserPhotoIcon}
                  alt="user icon"
                  className="w-32 h-32 object-cover mb-2"
                />
              )}

              <label htmlFor="new-photo-input">
                Chargez votre nouvelle photo :
              </label>
              <input
                type="file"
                name="new_photo"
                id="new-photo-input"
                className="w-10/12"
                onChange={handlePhotoChange}
              />
            </div>
          )}

          {isAddressEditModalOpen && (
            <div className="text-xs">
              <div className="flex gap-2 ">
                <div className="flex flex-col w-1/3">
                  <label htmlFor="street_number">Numéro de rue :</label>
                  <input
                    type="text"
                    name="street_number"
                    id="street_number"
                    className="border p-2 rounded-lg"
                    defaultValue={old_street_number}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label htmlFor="street_name">Nom de rue :</label>
                  <input
                    type="text"
                    name="street_name"
                    id="street_name"
                    className="border p-2 rounded-lg"
                    defaultValue={old_street_name}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col w-1/3">
                  <label htmlFor="postal_code">Code postal :</label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    className="border p-2 rounded-lg"
                    defaultValue={old_postal_code}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label htmlFor="city">Ville :</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="border p-2 rounded-lg"
                    defaultValue={old_city}
                  />
                </div>
              </div>
            </div>
          )}

          {isInsuranceEditModalOpen && (
            <div className="flex flex-col gap-2">
              <StandardChoiceDropdown
                isPatientInsuranceDropdownInput
                oldPatientInsuranceName={old_insurance_name}
                insuranceList={insurances}
              />

              <div>
                <label>Validité :</label>
                <div className="flex gap-1 text-xs items-center">
                  {' '}
                  <input
                    type="date"
                    defaultValue={old_start_date}
                    className="border p-2 rounded-lg"
                    name="start_date"
                  />
                  <p>au</p>
                  <input
                    type="date"
                    defaultValue={old_end_date}
                    className="border p-2 rounded-lg"
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

          {isEmailEditModalOpen && (
            <input
              type="text"
              name="email"
              id="patient-new-email"
              placeholder={old_email}
              className="border p-2 rounded-lg"
            />
          )}
        </div>

        <div className="flex gap-2">
          <CustomButton btnText="Valider" normalButton btnType="submit" />

          <CustomButton
            btnText="Annuler"
            cancelButton
            onClick={() => {
              setIsPhoneNumberEditModalOpen &&
                setIsPhoneNumberEditModalOpen(false);
              setIsPhotoEditModalOpen && setIsPhotoEditModalOpen(false);
              setIsAddressEditModalOpen && setIsAddressEditModalOpen(false);
              setIsInsuranceEditModalOpen && setIsInsuranceEditModalOpen(false);
              setIsEmailEditModalOpen && setIsEmailEditModalOpen(false);
            }}
          />
        </div>
      </form>
    </ReactModal>
  );
}
