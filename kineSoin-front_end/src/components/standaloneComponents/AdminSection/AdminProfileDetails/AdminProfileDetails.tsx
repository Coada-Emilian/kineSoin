// Purpose: Provide the AdminProfileDetails component which displays the profile details of a therapist, patient, affliction, medic, or insurance.

import { useState } from 'react';
import { ITherapist } from '../../../../@types/ITherapist';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal.tsx';
import EditPhotoModal from '../Modals/EditPhotoModal.tsx';
import { IPatient } from '../../../../@types/IPatient';
import {
  handleAfflictionUpdate,
  handleInsuranceOrganismUpdate,
  handleMedicUpdate,
  handlePatientStatusChange,
  handleTherapistUpdate,
} from '../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../@types/IAffliction';
import ImageSection from './pageComponents/sections/ImageSection.tsx';
import ButtonsSection from './pageComponents/sections/ButtonsSection.tsx';
import { IMedic } from '../../../../@types/IMedic';
import MedicSection from './pageComponents/sections/MedicSection.tsx';
import { IInsurance } from '../../../../@types/IInsurance';
import InsuranceSection from './pageComponents/sections/InsuranceSection.tsx';
import GeneralOutput from './pageComponents/generalComponents/common/GeneralOutput.tsx';
import CommonSection from './pageComponents/sections/CommonSection.tsx';
import ProfileSection from './pageComponents/generalComponents/common/ProfileSection..tsx';

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

  // Function to handle therapist profile updates
  const handleTherapistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Append the selected file to the form data
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('status' as string, therapistStatus);

    // Append the description to the form data
    if (therapist && therapist.id) {
      try {
        const response = await handleTherapistUpdate(therapist.id, formData);
        if (response) {
          setIsProfileEditing(false);
          window.location.reload();
        } else {
          console.error('Failed to update therapist profile', response);
        }
      } catch (error) {
        console.error('Error updating therapist profile:', error);
      }
    } else {
      console.error('Therapist ID is missing or invalid');
    }
  };

  // Function to handle affliction updates
  const updateAffliction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (affliction && affliction.id) {
      try {
        const response = await handleAfflictionUpdate(affliction.id, formData);
        if (response) {
          setIsProfileEditing(false);
          window.location.reload();
        } else {
          console.error('Failed to update affliction', response);
        }
      } catch (error) {
        console.error('Error updating affliction:', error);
      }
    } else {
      console.error('Affliction ID is missing or invalid');
    }
  };

  // Function to handle medic updates
  const updateMedic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (medic && medic.id) {
      try {
        const response = await handleMedicUpdate(formData, medic.id);
        if (response) {
          setIsProfileEditing(false);
          window.location.reload();
        } else {
          console.error('Failed to update medic', response);
        }
      } catch (error) {
        console.error('Error updating medic:', error);
      }
    } else {
      console.error('Medic ID is missing or invalid');
    }
  };

  // Function to handle insurance updates
  const updateInsurance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (insurance && insurance.id) {
      try {
        const response = await handleInsuranceOrganismUpdate(
          formData,
          insurance.id
        );
        if (response) {
          setIsProfileEditing(false);
          window.location.reload();
        } else {
          console.error('Failed to update insurance', response);
        }
      } catch (error) {
        console.error('Error updating insurance:', error);
      }
    } else {
      console.error('Insurance ID is missing or invalid)');
    }
  };

  return (
    <>
      <form
        action="*"
        onSubmit={
          therapist
            ? handleTherapistSubmit
            : affliction
              ? updateAffliction
              : medic
                ? updateMedic
                : insurance
                  ? updateInsurance
                  : undefined
        }
      >
        <div
          className={`flex flex-col ${affliction || medic || insurance ? '' : 'md:flex-row'} md:space-x-6 md:m-20`}
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
              <InsuranceSection
                insurance={insurance}
                isProfileEditing={isProfileEditing}
              />
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 rounded-md">
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
              medic={medic}
              insurance={insurance}
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
