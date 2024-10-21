import { useState } from 'react';
import { ITherapist } from '../../../../@types/ITherapist';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import editIcon from '/icons/edit.svg';
import axios from '../../../../axios.ts';

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal.tsx';
import { Link } from 'react-router-dom';
import EditPhotoModal from '../../AdminSection/Modals/EditPhotoModal.tsx';

interface AdminProfileDetailsProps {
  therapist: ITherapist;
}

export default function AdminProfileDetails({
  therapist,
}: AdminProfileDetailsProps) {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [buttonMessage, setButtonMessage] = useState('Changer le statut');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');

  const [description, setDescription] = useState(therapist.description);

  const [status, setStatus] = useState(therapist.status);

  const handleTherapistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('status' as string, status);
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

  const toggleStatus = () => {
    if (buttonMessage === 'Active') {
      setButtonMessage('Inactive');
      setBackgroundColor('bg-gray-200');
      setStatus('inactive');
    } else {
      setButtonMessage('Active');
      setBackgroundColor('bg-green-300');
      setStatus('active');
    }
  };
  return (
    <>
      {therapist && (
        <form action="*" onSubmit={handleTherapistSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 p-4 rounded-md">
              <h1 className="font-bold mb-4 text-xl">Inspection</h1>
              <section>
                <h4 className="font-bold mb-2">
                  Statut :{' '}
                  <span className="italic">
                    {therapist.status.toUpperCase()}
                  </span>
                </h4>
                <h4 className="font-semibold mb-2">
                  #ID :{' '}
                  <span className="italic font-medium">{therapist.id}</span>
                </h4>

                {isProfileEditing ? (
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex gap-2 items-center">
                      <label htmlFor="name" className="font-semibold">
                        Nom :
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="therapist_name"
                        className="border-2 border-gray-300 rounded-md px-2"
                        placeholder={therapist.name}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label htmlFor="name" className="font-semibold">
                        Prénom :
                      </label>
                      <input
                        type="text"
                        name="surname"
                        id="therapist_surname"
                        className="border-2 border-gray-300 rounded-md px-2"
                        placeholder={therapist.surname}
                      />
                    </div>
                  </div>
                ) : (
                  <h4 className="font-semibold mb-2">
                    Nom:{' '}
                    <span className="italic font-medium">
                      {therapist.fullName}
                    </span>
                  </h4>
                )}
              </section>
              <section className="mb-2">
                {isProfileEditing ? (
                  <div className="flex gap-2 items-center mb-2">
                    <label htmlFor="diploma" className="font-semibold">
                      Diplôme :
                    </label>
                    <input
                      type="text"
                      name="diploma"
                      id="therapist_diploma"
                      className="border-2 border-gray-300 rounded-md px-2"
                      placeholder={therapist.diploma}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="font-bold">Diplôme</h4>
                    <span className="italic font-medium">
                      {therapist.diploma}
                    </span>
                  </div>
                )}
              </section>
              <section className="mb-2">
                {isProfileEditing ? (
                  <div className="flex gap-2 items-center mb-2">
                    <label htmlFor="experience" className="font-semibold">
                      Expérience :
                    </label>
                    <input
                      type="text"
                      name="experience"
                      id="therapist_experience"
                      className="border-2 border-gray-300 rounded-md px-2"
                      placeholder={therapist.experience}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="font-bold">Experience</h4>
                    <span className="italic font-medium">
                      {therapist.experience}
                    </span>
                  </div>
                )}
              </section>
              <section className="mb-2">
                {isProfileEditing ? (
                  <div className="flex gap-2 items-center mb-2">
                    <label htmlFor="specialty" className="font-semibold">
                      Spécialité :
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      id="therapist_specialty"
                      className="border-2 border-gray-300 rounded-md px-2"
                      placeholder={therapist.specialty}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="font-bold">Spécialité</h4>
                    <span className="italic font-medium">
                      {therapist.specialty}
                    </span>
                  </div>
                )}
              </section>
              <section className="mb-2">
                {isProfileEditing ? (
                  <div className="flex flex-col gap-2 justify-start mb-2">
                    <label htmlFor="description" className="font-semibold">
                      Description :
                    </label>
                    <textarea
                      name="description"
                      id="therapist_description"
                      className="border-2 border-gray-300 rounded-md px-2"
                      rows={7}
                      placeholder={therapist.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-bold">Description</h4>
                    <p>{therapist.description}</p>
                  </div>
                )}
              </section>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4 rounded-md">
              {isProfileEditing ? (
                <div className="relative flex justify-center w-96">
                  <Link to="#" onClick={() => setIsEditPhotoModalOpen(true)}>
                    <img
                      src={editIcon}
                      alt="edit profile"
                      className="absolute bg-white rounded-full p-1 top-4 left-12 w-10 h-10 shadow-md"
                    />
                  </Link>
                  <img
                    src={therapist.picture_url}
                    alt={therapist.fullName}
                    className="w-full h-auto rounded-md mb-4 max-w-xs shadow-2xl w-"
                  />
                </div>
              ) : (
                <div className="w-96 ml-16 mt-16">
                  <img
                    src={therapist.picture_url}
                    alt={therapist.fullName}
                    className="w-full h-auto rounded-md mb-4 max-w-xs shadow-2xl"
                  />
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
                              className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              onClick={() => toggleStatus()}
                            >
                              Active
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              onClick={() => toggleStatus()}
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
                      normalBtn
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
                    <CustomButton
                      btnText="Modifier profile"
                      btnType="button"
                      modifyButton
                      onClick={() => setIsProfileEditing(true)}
                    />
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
      )}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          therapist={therapist}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditPhotoModalOpen && (
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
