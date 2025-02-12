// Purpose: Provide the AdminProfileDetails component which displays the profile details of a therapist, patient, affliction, medic, or insurance.

import { useState } from 'react';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal.tsx';
import EditPhotoModal from '../Modals/EditPhotoModal.tsx';
import {
  handleAfflictionUpdate,
  handleInsuranceOrganismUpdate,
  handleMedicUpdate,
  handlePatientStatusChange,
  handleTherapistUpdate,
} from '../../../../utils/apiUtils.ts';
import ImageSection from './pageComponents/sections/ImageSection.tsx';
import ButtonsSection from './pageComponents/sections/ButtonsSection.tsx';
import GeneralOutput from './pageComponents/generalComponents/common/GeneralOutput.tsx';
import CommonSection from './pageComponents/sections/CommonSection.tsx';
import ProfileSection from './pageComponents/generalComponents/common/ProfileSection..tsx';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/types';

interface AdminProfileDetailsProps {
  therapist?: ITherapist;
  patient?: IPatient;
  affliction?: IAffliction;
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function AdminProfileDetails({
  therapist,
  patient,
  affliction,
  medic,
  insurance,
}: AdminProfileDetailsProps) {
  // State variables
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [buttonMessage, setButtonMessage] = useState('Changer le statut');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [therapistStatus, setTherapistStatus] = useState(
    therapist?.status || 'inactive'
  );

  // Function to handle patient status changes
  const handlePatientStatusChanges = async (id: number, status: string) => {
    const response = handlePatientStatusChange(id, status);
    if (await response) {
      console.log('Patient status updated successfully');
      window.location.reload();
    } else {
      console.error('Failed to update patient status', response);
    }
  };

  // Function to toggle the status of the therapist, patient, medic, or insurance
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

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    updateFunction: Function
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    {
      therapist && formData.append('status', therapistStatus);
    }

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await updateFunction(formData);
      if (response) {
        setIsProfileEditing(false);
        window.location.reload();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getUpdateFunction = () => {
    if (therapist)
      return (formData: FormData) =>
        handleTherapistUpdate(therapist.id, formData);
    if (affliction)
      return (formData: FormData) =>
        handleAfflictionUpdate(affliction.id, formData);
    if (medic)
      return (formData: FormData) => handleMedicUpdate(formData, medic.id);
    if (insurance)
      return (formData: FormData) =>
        handleInsuranceOrganismUpdate(formData, insurance.id);
    return null;
  };

  const updateFunction = getUpdateFunction();

  return (
    <>
      <form
        action="*"
        onSubmit={(e) => updateFunction && handleFormSubmit(e, updateFunction)}
        className="flex justify-center"
      >
        <div
          className={`flex flex-col md:space-x-6 md:m-20 border border-gray-400 rounded-xl shadow-2xl ${therapist ? 'md:w-5/6' : 'md:w-2/3'}  items-center `}
        >
          <div
            className={`flex flex-col p-8 w-10/12 ${therapist || patient ? 'md:flex-row items-center justify-around' : ''}`}
          >
            <div className="flex-1 p-4 rounded-md">
              <GeneralOutput
                isPageTitleOutput
                patient={patient}
                therapist={therapist}
                affliction={affliction}
                medic={medic}
                insurance={insurance}
              />

              <CommonSection
                patient={patient}
                therapist={therapist}
                affliction={affliction}
                medic={medic}
                insurance={insurance}
                isProfileEditing={isProfileEditing}
              />

              {therapist && (
                <ProfileSection
                  isTherapistProfileSection
                  isProfileEditing={isProfileEditing}
                  therapist={therapist}
                />
              )}

              {patient && (
                <ProfileSection patient={patient} isPatientProfileSection />
              )}

              {affliction && (
                <ProfileSection
                  isAfflictionProfileSection
                  affliction={affliction}
                  isProfileEditing={isProfileEditing}
                />
              )}

              {medic && (
                <ProfileSection
                  isMedicProfileSection
                  medic={medic}
                  isProfileEditing={isProfileEditing}
                />
              )}

              {insurance && (
                <ProfileSection
                  isInsuranceProfileSection
                  insurance={insurance}
                  isProfileEditing={isProfileEditing}
                />
              )}
            </div>

            {(therapist || patient) && (
              <ImageSection
                therapist={therapist}
                patient={patient}
                isProfileEditing={isProfileEditing}
                setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
              />
            )}
          </div>

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
            medic={medic}
            insurance={insurance}
          />
        </div>
      </form>

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          patient={patient}
          therapist={therapist}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          affliction={affliction}
          medic={medic}
          insurance={insurance}
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
