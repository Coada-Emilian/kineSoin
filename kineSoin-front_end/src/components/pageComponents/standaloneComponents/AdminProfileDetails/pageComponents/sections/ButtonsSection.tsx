import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';
import { IPatient } from '../../../../../../@types/IPatient';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { ITherapist } from '../../../../../../@types/ITherapist';
import TherapistStatusButtons from '../generalComponents/therapist/TherapistStatusButtons';
import AfflictionStatusButtons from '../generalComponents/affliction/AfflictionStatusButtons';
import PatientStatusButtons from '../generalComponents/patient/PatientStatusButtons';

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
              className="absolute left-0 z-10  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {therapist && (
                <TherapistStatusButtons toggleStatus={toggleStatus} />
              )}
              {affliction && (
                <AfflictionStatusButtons toggleStatus={toggleStatus} />
              )}
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

              <PatientStatusButtons
                toggleStatus={toggleStatus}
                handlePatientStatusChanges={handlePatientStatusChanges}
                patient={patient}
              />
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
