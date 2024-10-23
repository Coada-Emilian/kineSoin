import { useState } from 'react';
import { ITherapist } from '../../../../@types/ITherapist';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import editIcon from '/icons/edit.svg';
import axios from '../../../../axios.ts';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal.tsx';
import { Link } from 'react-router-dom';
import EditPhotoModal from '../../AdminSection/Modals/EditPhotoModal.tsx';
import { IPatient } from '../../../../@types/IPatient';
import { handlePatientStatusChange } from '../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../@types/IAffliction';

import GeneralSection from './pageComponents/sections/GeneralSection.tsx';
import TherapistSection from './pageComponents/sections/TherapistSection.tsx';
import PatientSection from './pageComponents/sections/PatientSection.tsx';
import AfflictionSection from './pageComponents/sections/AfflictionSection.tsx';

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
    if (status === 'active') {
      setButtonMessage('Active');
      setBackgroundColor('bg-green-300 hover:bg-green-500');
      setTherapistStatus('active');
    } else if (status === 'inactive') {
      setButtonMessage('Inactive');
      setBackgroundColor('bg-gray-200 hover:bg-gray-400');
      setTherapistStatus('inactive');
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
            {isProfileEditing ? (
              therapist && (
                <div className="relative w-fit mx-auto mb-6 items-center flex justify-center">
                  <Link to="#" onClick={() => setIsEditPhotoModalOpen(true)}>
                    <img
                      src={editIcon}
                      alt="edit profile"
                      className="absolute bg-white rounded-full p-1 top-2 left-2 w-10 h-10 shadow-md"
                    />
                  </Link>
                  <img
                    src={therapist && therapist.picture_url}
                    alt={therapist && therapist.fullName}
                    className="rounded-xl shadow-xl w-48 md:w-72"
                  />
                </div>
              )
            ) : (
              <div className="w-fit mx-auto mb-6 flex justify-center items-center">
                {therapist && (
                  <img
                    src={therapist.picture_url}
                    alt={therapist.fullName}
                    className="rounded-xl shadow-xl w-48 md:w-72"
                  />
                )}
                {patient && (
                  <img
                    src={patient.picture_url}
                    alt={patient.fullName}
                    className="rounded-xl shadow-xl w-48 md:w-72"
                  />
                )}
              </div>
            )}

            <div className="buttons flex gap-2 items-center justify-between mb-8">
              {isProfileEditing ? (
                <>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton
                        className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg ${backgroundColor} p-4 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                      >
                        {buttonMessage}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-gray-400"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
                            onClick={() => toggleStatus('active')}
                          >
                            Active
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
                            onClick={() => toggleStatus('inactive')}
                          >
                            Inactive
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                  <CustomButton
                    btnText="Valider"
                    btnType="submit"
                    normalButton
                  />
                  <CustomButton
                    btnText="Annuler"
                    btnType="button"
                    cancelButton
                    onClick={() => setIsProfileEditing(false)}
                  />
                </>
              ) : (
                <>
                  {therapist && (
                    <CustomButton
                      btnText="Modifier kinésithérapeute"
                      btnType="button"
                      modifyButton
                      onClick={() => setIsProfileEditing(true)}
                    />
                  )}

                  {affliction && (
                    <CustomButton
                      btnText="Modifier affliction"
                      btnType="button"
                      modifyButton
                      onClick={() => setIsProfileEditing(true)}
                    />
                  )}

                  {patient && (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton
                          className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg ${backgroundColor} p-4 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                        >
                          {buttonMessage}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 h-5 w-5 text-gray-400"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
                              onClick={() => {
                                toggleStatus('active');
                                handlePatientStatusChanges(
                                  patient.id,
                                  'active'
                                );
                              }}
                            >
                              Active
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
                              onClick={() => {
                                toggleStatus('inactive');
                                handlePatientStatusChanges(
                                  patient.id,
                                  'inactive'
                                );
                              }}
                            >
                              Inactive
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 bg-yellow-300 font-medium data-[focus]:bg-yellow-500 data-[focus]:text-gray-900"
                              onClick={() => {
                                toggleStatus('pending');
                                handlePatientStatusChanges(
                                  patient.id,
                                  'pending'
                                );
                              }}
                            >
                              Pending
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 bg-red-300 font-medium data-[focus]:bg-red-500 data-[focus]:text-gray-900"
                              onClick={() => {
                                toggleStatus('banned');
                                handlePatientStatusChanges(
                                  patient.id,
                                  'banned'
                                );
                              }}
                            >
                              Banned
                            </Link>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  )}

                  <CustomButton
                    btnText="Supprimer"
                    btnType="button"
                    deleteButton
                    onClick={() => setIsDeleteModalOpen(true)}
                  />
                </>
              )}
            </div>
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
