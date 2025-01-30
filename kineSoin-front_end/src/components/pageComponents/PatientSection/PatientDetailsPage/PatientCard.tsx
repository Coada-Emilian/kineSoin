import { useEffect, useState } from 'react';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { fetchPatientData } from '../../../../utils/apiUtils';
import { IPatient } from '../../../../@types/IPatient';
import EditIcon from '../../standaloneComponents/EditIcon/EditIcon';
import { Link } from 'react-router-dom';
import EditPatientModal from '../../standaloneComponents/Modals/EditPatientModal';

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

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center w-full my-auto">
        {patientData && (
          <div className="w-2/4 flex justify-center">
            <div className="relative">
              <img
                src={patientData.picture_url}
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
                <Link to="#">
                  <EditIcon />
                </Link>
              )}
              <p>Adresse :</p>
            </div>

            <p className="p-2 border border-gray-400 rounded-lg w-11/12 md:w-full">
              {patientData?.address}
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
              {isProfileEditing && (
                <Link to="#">
                  <EditIcon />
                </Link>
              )}
              <p>Assurance mutuelle :</p>
            </div>

            <p className="p-2 border border-gray-400 rounded-lg w-11/12 md:w-full">
              {patientData?.insurance?.[0]?.name}
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
                <EditIcon />
                <p>Modifier adresse e-mail</p>
              </div>
              <div className="flex items-center gap-2">
                <EditIcon />
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
        />
      )}
    </>
  );
}
