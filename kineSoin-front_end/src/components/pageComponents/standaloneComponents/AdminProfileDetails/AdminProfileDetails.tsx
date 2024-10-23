import { useState } from 'react';
import { ITherapist } from '../../../../@types/ITherapist';
import axios from '../../../../axios.ts';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal.tsx';
import EditPhotoModal from '../../AdminSection/Modals/EditPhotoModal.tsx';
import { IPatient } from '../../../../@types/IPatient';
import { handlePatientStatusChange } from '../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../@types/IAffliction';
import GeneralSection from './pageComponents/sections/GeneralSection.tsx';
import TherapistSection from './pageComponents/sections/TherapistSection.tsx';
import PatientSection from './pageComponents/sections/PatientSection.tsx';
import AfflictionSection from './pageComponents/sections/AfflictionSection.tsx';
import ImageSection from './pageComponents/sections/ImageSection.tsx';
import ButtonsSection from './pageComponents/sections/ButtonsSection.tsx';

interface AdminProfileDetailsProps {
  therapist?: ITherapist;
  patient?: IPatient;
  affliction?: IAffliction;
}

export default function AdminProfileDetails({
  therapist,
  patient,
  affliction,
}: AdminProfileDetailsProps) {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [buttonMessage, setButtonMessage] = useState('Changer le statut');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [description, setDescription] = useState(therapist?.description || '');
  const [therapistStatus, setTherapistStatus] = useState(
    therapist?.status || 'inactive'
  );

  const handleTherapistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('status' as string, therapistStatus);
    if (therapist && therapist.id) {
      try {
        const response = await axios.put(
          `/admin/therapists/${therapist.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.log('Therapist profile updated successfully');
          setIsProfileEditing(false);
          window.location.reload();
        } else {
          console.error('Failed to update therapist profile', response.data);
        }
      } catch (error) {
        console.error('Error updating therapist profile:', error);
      }
    } else {
      console.error('Therapist ID is missing or invalid');
    }
  };

  const [afflictionDescription, setAfflictionDescription] = useState('');

  const handlePatientStatusChanges = async (id: number, status: string) => {
    const response = handlePatientStatusChange(id, status);
    if (await response) {
      console.log('Patient status updated successfully');
      window.location.reload();
    } else {
      console.error('Failed to update patient status', response);
    }
  };

  const toggleStatus = (status: string) => {
    if (status === 'active' || status === 'opérée') {
      if (status === 'active') {
        setButtonMessage('Active');
        setTherapistStatus('active');
      } else if (status === 'opérée') {
        setButtonMessage('Opérée');
      }
      setBackgroundColor('bg-green-300 hover:bg-green-500');
    } else if (status === 'inactive' || status === 'non-opérée') {
      if (status === 'inactive') {
        setButtonMessage('Inactive');
        setTherapistStatus('inactive');
      } else if (status === 'non-opérée') {
        setButtonMessage('Non-opérée');
      }
      setBackgroundColor('bg-gray-200 hover:bg-gray-400');
    } else if (status === 'pending') {
      setButtonMessage('Pending');
      setBackgroundColor('bg-yellow-300 hover:bg-yellow-500');
    } else if (status === 'banned') {
      setButtonMessage('Banned');
      setBackgroundColor('bg-red-300 hover:bg-red-500');
    }
  };

  return (
    <>
      <form action="*" onSubmit={handleTherapistSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-6 md:m-20">
          <div className="flex-1 p-4 rounded-md">
            <h1 className="font-bold mb-4 text-xl md:text-4xl md:mb-6">
              Inspection{' '}
              {therapist
                ? 'kinésithérapeute'
                : patient
                  ? 'patient'
                  : 'affliction'}
            </h1>
            <GeneralSection
              patient={patient}
              therapist={therapist}
              affliction={affliction}
              isProfileEditing={isProfileEditing}
            />

            {therapist && (
              <TherapistSection
                isProfileEditing={isProfileEditing}
                therapist={therapist}
                description={description}
                setDescription={setDescription}
              />
            )}

            {patient && <PatientSection patient={patient} />}

            {affliction && (
              <AfflictionSection
                affliction={affliction}
                afflictionDescription={afflictionDescription}
                setAfflictionDescription={setAfflictionDescription}
                isProfileEditing={isProfileEditing}
              />
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4 rounded-md">
            <ImageSection
              therapist={therapist}
              patient={patient}
              isProfileEditing={isProfileEditing}
              setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
            />
            <ButtonsSection
              isProfileEditing={isProfileEditing}
              buttonMessage={buttonMessage}
              backgroundColor={backgroundColor}
              toggleStatus={toggleStatus}
              setIsProfileEditing={setIsProfileEditing}
              handlePatientStatusChanges={handlePatientStatusChanges}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              patient={patient}
              therapist={therapist}
              affliction={affliction}
            />
          </div>
        </div>
      </form>
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          patient={patient}
          therapist={therapist}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditPhotoModalOpen && therapist && (
        <EditPhotoModal
          isEditPhotoModalOpen={isEditPhotoModalOpen}
          setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
          therapist={therapist}
          setSelectedFile={setSelectedFile}
        />
      )}
    </>
  );
}
