import { useEffect, useState } from 'react';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import {
  fetchPatientData,
  handlePatientInsuranceUpdate,
  handlePatientPhotoUpdate,
  handlePatientUpdate,
} from '../../../../utils/apiUtils';
import { IPatient } from '../../../../@types/IPatient';
import EditIcon from '../../standaloneComponents/EditIcon/EditIcon';
import { Link } from 'react-router-dom';
import EditPatientModal from '../../standaloneComponents/Modals/EditPatientModal';
import { INewAddress } from '../../../../@types/INewAddress';
import { IInsurance } from '../../../../@types/IInsurance';
import AddInsuranceIcon from '/icons/add.png';
import { IPatient_Insurance } from '../../../../@types/IPatient_Insurance';

interface PatientCardProps {
  patientId?: number;
}

export default function PatientCard({ patientId }: PatientCardProps) {
  // State to store patient data
  const [patientData, setPatientData] = useState<IPatient | null>(null);
  const [isInsuranceAdded, setIsInsuranceAdded] = useState<boolean>(false);

  // Fetch patient data on component mount via patientId
  useEffect(() => {
    const fetchData = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientData(patientId);
        if (response) {
          setPatientData(response);
        } else {
          console.error('Error fetching patient data');
        }
      }
    };
    fetchData();
  }, [patientId, isInsuranceAdded]);

  // State to manage modals
  const [isAddInsuranceModalOpen, setIsAddInsuranceModalOpen] =
    useState<boolean>(false);
  const [isPhotoEditModalOpen, setIsPhotoEditModalOpen] =
    useState<boolean>(false);
  const [isAddressEditModalOpen, setIsAddressEditModalOpen] =
    useState<boolean>(false);
  const [isPhoneNumberEditModalOpen, setIsPhoneNumberEditModalOpen] =
    useState<boolean>(false);
  const [isInsuranceEditModalOpen, setIsInsuranceEditModalOpen] =
    useState<boolean>(false);
  const [isEmailEditModalOpen, setIsEmailEditModalOpen] =
    useState<boolean>(false);
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] =
    useState<boolean>(false);
  const [isNameAndAgeEditModalOpen, setIsNameAndAgeEditModalOpen] =
    useState<boolean>(false);

  // States to store new patient data
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [newAddress, setNewAddress] = useState<INewAddress>({});
  const [newInsurance, setNewInsurance] = useState<IPatient_Insurance>();
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newSurname, setNewSurname] = useState<string>('');
  const [newBirthDate, setNewBirthDate] = useState<string>('');

  // State to store added insurance
  const [addedPatientInsurance, setAddedPatientInsurance] =
    useState<IInsurance>();

  // State to check if insurance is present
  const [isInsurancePresent, setIsInsurancePresent] = useState<boolean>(false);

  // State to check if profile is being edited
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // State to store profil preview
  const [preview, setPreview] = useState<string | undefined>(undefined);

  // State to store new insurance name
  const [newInsuranceName, setNewInsuranceName] = useState<string>('');

  // Check if insurance is present
  useEffect(() => {
    if (patientData) {
      if (patientData.insurance && patientData.insurance.length > 0) {
        setIsInsurancePresent(true);
      }
    }
    if (addedPatientInsurance) {
      setIsInsurancePresent(true);
    }
  }, [patientData, addedPatientInsurance]);

  // useEffect(() => {
  //   console.log('newPhoneNumber :', newPhoneNumber);
  //   console.log('newPhoto :', newPhoto);
  //   console.log('newAddress :', newAddress);
  //   console.log('newInsurance :', newInsurance);
  //   console.log('newEmail :', newEmail);
  //   console.log('newPassword :', newPassword);
  //   console.log('addedPatientInsurance :', addedPatientInsurance);
  //   console.log('newName :', newName);
  //   console.log('newSurname :', newSurname);
  //   console.log('newBirthDate :', newBirthDate);
  // }, [
  //   newPhoneNumber,
  //   newPhoto,
  //   newAddress,
  //   newInsurance,
  //   newEmail,
  //   newPassword,
  //   addedPatientInsurance,
  //   newName,
  //   newSurname,
  //   newBirthDate,
  // ]);

  const handleConnectedPatientUpdate = async () => {
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
      newInsuranceFormData.append('adherent_code', newInsurance.adherent_code);
      if (patientId) {
        const response = await handlePatientInsuranceUpdate(
          patientId,
          newInsuranceFormData
        );
        if (response) {
          console.log('Insurance updated successfully');
        }
      }
    }

    if (newPhoto) {
      const newPhotoFormData = new FormData();
      newPhotoFormData.append('photo', newPhoto);

      if (patientId) {
        const response = await handlePatientPhotoUpdate(
          patientId,
          newPhotoFormData
        );
        if (response) {
          console.log('Photo updated successfully');
        }
      }
    }

    const newFormData = new FormData();

    if (newPhoneNumber) {
      newFormData.append('phone_number', newPhoneNumber);
    }
    if (newAddress) {
      if (newAddress.street_number) {
        newFormData.append('street_number', newAddress.street_number);
      }
      if (newAddress.street_name) {
        newFormData.append('street_name', newAddress.street_name);
      }
      if (newAddress.postal_code) {
        newFormData.append('postal_code', newAddress.postal_code);
      }
      if (newAddress.city) {
        newFormData.append('city', newAddress.city);
      }
    }
    if (newEmail) {
      newFormData.append('email', newEmail);
    }

    if (newPassword) {
      newFormData.append('new_password', newPassword);
    }

    if (newName) {
      newFormData.append('name', newName);
    }

    if (newSurname) {
      newFormData.append('surname', newSurname);
    }

    if (newBirthDate) {
      newFormData.append('birth_date', newBirthDate);
    }

    if (patientId && [...newFormData.entries()].length > 0) {
      const response = await handlePatientUpdate(newFormData, patientId);
      if (response) {
        console.log('Patient updated successfully');
        window.location.reload();
      }
    } else {
      console.log('Patient updated  only photo or insurance');
      window.location.reload();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center justify-center w-full my-auto">
        {/* Patient image and details */}
        {patientData && (
          <div className="w-48 md:w-2/6">
            <div className="relative shadow-2xl">
              {isProfileEditing && (
                <Link to="#" onClick={() => setIsPhotoEditModalOpen(true)}>
                  <EditIcon isPhotoEdit />
                </Link>
              )}

              <img
                src={preview ? preview : patientData.picture_url}
                alt={patientData.name}
                className="rounded-xl w-full h-full object-cover "
              />
            </div>
          </div>
        )}

        {/* Patient details */}
        <div className="text-primaryBlue text-xs md:text-base font-bold italic w-3/4 md:w-1/4 p-8 h-full flex flex-col justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            {isProfileEditing && (
              <Link to="#" onClick={() => setIsNameAndAgeEditModalOpen(true)}>
                <EditIcon />
              </Link>
            )}

            <p className="text-lg font-bold mx-auto">
              {newName && newSurname
                ? `${newName} ${newSurname}`
                : patientData?.fullName}{' '}
              , {patientData?.age} ans
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start ">
            <div className="flex items-center gap-2 mb-2">
              {isProfileEditing && (
                <Link to="#" onClick={() => setIsAddressEditModalOpen(true)}>
                  <EditIcon />
                </Link>
              )}
              <p>Adresse :</p>
            </div>

            <p className="p-2 border border-gray-400 rounded-lg w-11/12 md:w-full">
              {newAddress && newAddress.full_address
                ? newAddress.full_address
                : patientData?.address}{' '}
              {}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start ">
            <div className="flex items-center gap-2 mb-2">
              {' '}
              {isProfileEditing && (
                <Link
                  to="#"
                  onClick={() => setIsPhoneNumberEditModalOpen(true)}
                >
                  <EditIcon />
                </Link>
              )}
              <p>Numéro téléphone :</p>
            </div>

            <p className="p-2 border border-gray-400 rounded-lg w-11/12 md:w-full">
              {newPhoneNumber ? newPhoneNumber : patientData?.phone_number}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center  md:items-start mb-2">
            <div className="flex items-center gap-2 mb-2">
              {isInsurancePresent ? (
                isProfileEditing && (
                  <Link
                    to="#"
                    onClick={() => setIsInsuranceEditModalOpen(true)}
                  >
                    <EditIcon />
                  </Link>
                )
              ) : (
                <Link to="#" onClick={() => setIsAddInsuranceModalOpen(true)}>
                  <img
                    src={AddInsuranceIcon}
                    alt="add insurance"
                    className="h-8 md:h-10 bg-white p-1 rounded-full"
                  />
                </Link>
              )}

              <p>Assurance mutuelle :</p>
            </div>

            <p className="p-2 border border-gray-400 rounded-lg w-11/12 md:w-full">
              {newInsuranceName
                ? newInsuranceName
                : patientData?.insurance?.[0]?.name}
            </p>
          </div>

          {isProfileEditing && (
            <div>
              <div className="flex items-center gap-2">
                <Link to="#" onClick={() => setIsEmailEditModalOpen(true)}>
                  <EditIcon />
                </Link>

                <p>Modifier adresse e-mail</p>
              </div>

              <div className="flex items-center gap-2">
                <Link to="#" onClick={() => setIsPasswordEditModalOpen(true)}>
                  <EditIcon />
                </Link>

                <p>Modifier mot de passe</p>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4 mx-auto">
            {isProfileEditing ? (
              <>
                <CustomButton
                  btnText="Enregistrer modifications"
                  mobileButton
                  onClick={() => {
                    handleConnectedPatientUpdate();
                    setIsProfileEditing(false);
                    setPreview(undefined);
                    setNewName('');
                    setNewSurname('');
                    setNewAddress({});
                    setNewPhoneNumber('');
                    setNewInsuranceName('');
                    setNewInsurance(undefined);
                  }}
                />
                <CustomButton
                  btnText="Annuler"
                  mobileCancelButton
                  onClick={() => {
                    setIsProfileEditing(false);
                    setPreview(undefined);
                    setNewName('');
                    setNewSurname('');
                    setNewAddress({});
                    setNewPhoneNumber('');
                    setNewInsuranceName('');
                    setNewInsurance(undefined);
                  }}
                />
              </>
            ) : (
              <>
                <CustomButton
                  btnText="Éditer mon profil"
                  mobileButton
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
        </div>
      </div>

      {isPhoneNumberEditModalOpen && (
        <EditPatientModal
          phone_number={patientData?.phone_number}
          setIsPhoneNumberEditModalOpen={setIsPhoneNumberEditModalOpen}
          isPhoneNumberEditModalOpen={isPhoneNumberEditModalOpen}
          setNewPhoneNumber={setNewPhoneNumber}
        />
      )}

      {isPhotoEditModalOpen && (
        <EditPatientModal
          setIsPhotoEditModalOpen={setIsPhotoEditModalOpen}
          isPhotoEditModalOpen={isPhotoEditModalOpen}
          setNewPhoto={setNewPhoto}
          old_photo={patientData?.picture_url}
          setPreview={setPreview}
          preview={preview}
        />
      )}

      {isAddressEditModalOpen && (
        <EditPatientModal
          setIsAddressEditModalOpen={setIsAddressEditModalOpen}
          isAddressEditModalOpen={isAddressEditModalOpen}
          setNewAddress={setNewAddress}
          old_address={patientData?.address}
          old_street_number={patientData?.street_number}
          old_street_name={patientData?.street_name}
          old_postal_code={patientData?.postal_code}
          old_city={patientData?.city}
        />
      )}

      {isInsuranceEditModalOpen && (
        <EditPatientModal
          patientId={patientId}
          setIsInsuranceEditModalOpen={setIsInsuranceEditModalOpen}
          isInsuranceEditModalOpen={isInsuranceEditModalOpen}
          setNewInsurance={setNewInsurance}
          old_insurance_name={patientData?.insurance?.[0]?.name}
          old_start_date={
            patientData?.insurance?.[0]?.Patient_Insurance?.start_date
          }
          old_end_date={
            patientData?.insurance?.[0]?.Patient_Insurance?.end_date
          }
          old_contract_number={
            patientData?.insurance?.[0]?.Patient_Insurance?.contract_number
          }
          old_adherent_code={
            patientData?.insurance?.[0]?.Patient_Insurance?.adherent_code
          }
          setNewInsuranceName={setNewInsuranceName}
        />
      )}

      {isEmailEditModalOpen && (
        <EditPatientModal
          setIsEmailEditModalOpen={setIsEmailEditModalOpen}
          isEmailEditModalOpen={isEmailEditModalOpen}
          old_email={patientData?.email}
          setNewEmail={setNewEmail}
        />
      )}

      {isPasswordEditModalOpen && (
        <EditPatientModal
          setIsPasswordEditModalOpen={setIsPasswordEditModalOpen}
          isPasswordEditModalOpen={isPasswordEditModalOpen}
          patientId={patientId}
          setNewPassword={setNewPassword}
        />
      )}

      {isAddInsuranceModalOpen && (
        <EditPatientModal
          setIsAddInsuranceModalOpen={setIsAddInsuranceModalOpen}
          isAddInsuranceModalOpen={isAddInsuranceModalOpen}
          patientId={patientId}
          setAddedPatientInsurance={setAddedPatientInsurance}
          setIsInsuranceAdded={setIsInsuranceAdded}
        />
      )}

      {isNameAndAgeEditModalOpen && (
        <EditPatientModal
          setIsNameAndAgeEditModalOpen={setIsNameAndAgeEditModalOpen}
          isNameAndAgeEditModalOpen={isNameAndAgeEditModalOpen}
          patientId={patientId}
          old_name={patientData?.name}
          old_surname={patientData?.surname}
          old_birth_date={patientData?.birth_date}
          setNewName={setNewName}
          setNewSurname={setNewSurname}
          setNewBirthDate={setNewBirthDate}
        />
      )}
    </>
  );
}
