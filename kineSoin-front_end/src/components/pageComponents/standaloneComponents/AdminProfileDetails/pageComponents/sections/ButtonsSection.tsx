import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';
import { IPatient } from '../../../../../../@types/IPatient';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { ITherapist } from '../../../../../../@types/ITherapist';

interface ButtonsSectionProps {
  isProfileEditing: boolean;
  buttonMessage: string;
  backgroundColor: string;
  toggleStatus: (status: string) => void;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  patient?: IPatient;
  affliction?: IAffliction;
  therapist?: ITherapist;
  handlePatientStatusChanges: (id: number, status: string) => Promise<void>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonsSection({
  isProfileEditing,
  buttonMessage,
  backgroundColor,
  toggleStatus,
  setIsProfileEditing,
  patient,
  affliction,
  therapist,
  handlePatientStatusChanges,
  setIsDeleteModalOpen,
}: ButtonsSectionProps) {
  return (
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
          <CustomButton btnText="Valider" btnType="submit" normalButton />
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
                        handlePatientStatusChanges(patient.id, 'active');
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
                        handlePatientStatusChanges(patient.id, 'inactive');
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
                        handlePatientStatusChanges(patient.id, 'pending');
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
                        handlePatientStatusChanges(patient.id, 'banned');
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
  );
}
