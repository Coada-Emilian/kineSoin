import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';
import UserPhotoIcon from '/icons/user-photo.png';

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
}: EditPatientModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isNewPhotoAdded, setIsNewPhotoAdded] = useState<boolean>(false);

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

  return (
    <ReactModal
      isOpen={
        !!isPhoneNumberEditModalOpen ||
        !!isPhotoEditModalOpen ||
        !!isAddressEditModalOpen
      }
      onRequestClose={() => {
        if (setIsPhoneNumberEditModalOpen) setIsPhoneNumberEditModalOpen(false);
        if (setIsPhotoEditModalOpen) setIsPhotoEditModalOpen(false);
        if (setIsAddressEditModalOpen) setIsAddressEditModalOpen(false);
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
                  : ''}
          </label>

          {isPhoneNumberEditModalOpen && (
            <input
              type="text"
              name="phone_number"
              id="patient-new-phone_number"
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
            }}
          />
        </div>
      </form>
    </ReactModal>
  );
}
