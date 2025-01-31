import { useEffect, useState } from 'react';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { fetchPatientData } from '../../../../utils/apiUtils';
import { IPatient } from '../../../../@types/IPatient';
import EditIcon from '../../standaloneComponents/EditIcon/EditIcon';
import { Link } from 'react-router-dom';
import EditPatientModal from '../../standaloneComponents/Modals/EditPatientModal';
import { INewAddress } from '../../../../@types/INewAddress';
import { IInsurance } from '../../../../@types/IInsurance';

interface PatientCardProps {
  patientId?: number;
}

export default function PatientCard({ patientId }: PatientCardProps) {
  const [patientData, setPatientData] = useState<IPatient | null>(null);

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
  }, [patientId]);

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

  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [newAddress, setNewAddress] = useState<INewAddress>({});
  const [newInsurance, setNewInsurance] = useState<IInsurance>();
  const [isInsurancePresent, setIsInsurancePresent] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [newInsuranceName, setNewInsuranceName] = useState<string>('');

  useEffect(() => {
    if (patientData) {
      if (patientData.insurance && patientData.insurance.length > 0) {
        setIsInsurancePresent(true);
      }
    }
  }, [patientData]);

  useEffect(() => {
    console.log('newPhoneNumber :', newPhoneNumber);
    console.log('newPhoto :', newPhoto);
    console.log('newAddress :', newAddress);
    console.log('newInsurance :', newInsurance);
    console.log('newEmail :', newEmail);
  }, [newPhoneNumber, newPhoto, newAddress, newInsurance, newEmail]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center w-full my-auto">
        {patientData && (
          <div className="w-2/4 flex justify-center">
            <div className="relative">
              <img
                src={preview ? preview : patientData.picture_url}
                alt={patientData.name}
                className="rounded-xl object-cover shadow-2xl"
              />

              {isProfileEditing && (
                <Link to="#" onClick={() => setIsPhotoEditModalOpen(true)}>
                  <EditIcon isPhotoEdit />
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="text-primaryBlue text-xs md:text-base font-bold italic w-3/4 md:w-1/4 p-8 h-full flex flex-col justify-between gap-2 text-center md:text-left">
          <div>
            <p className="text-lg font-bold">
              {patientData?.fullName}, {patientData?.age} ans
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
              {' '}
              {isProfileEditing && isInsurancePresent && (
                <Link to="#" onClick={() => setIsInsuranceEditModalOpen(true)}>
                  <EditIcon />
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
          {/* <div>
            <p className=" text-sm font-bold italic mb-2">Date de validite :</p>
            <div className="flex justify-between items-center w-full gap-2">
              <input
                type="date"
                name="start-date"
                className="border p-2 w-2/4 rounded-xl"
              />
              <p>au</p>
              <input
                type="date"
                name="end-date"
                className="border p-2 w-2/4 rounded-xl"
              />
            </div>
          </div> */}
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

          <div className="flex gap-2">
            <CustomButton btnText={'Ajouter mutuelle'} mobileButton />
            <CustomButton
              btnText="Éditer mon profil"
              mobileButton
              onClick={() => {
                setIsProfileEditing(true);
              }}
            />
            <CustomButton btnText="Supprimer mon profil" mobileDeleteButton />
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
    </>
  );
}
