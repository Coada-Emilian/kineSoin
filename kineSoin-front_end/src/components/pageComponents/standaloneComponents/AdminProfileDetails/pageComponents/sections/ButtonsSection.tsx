/**
 * @file ButtonsSection.tsx
 * @description A React functional component that renders a section of buttons for managing various entities in the KineSoin application, including therapists, patients, afflictions, medics, and insurance organizations. The component provides different button functionalities based on whether the profile is in editing mode or not, allowing for status changes, validation, cancellation, and deletion of records.
 *
 * @param {Object} props - The props for the ButtonsSection component.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 * @param {string} props.buttonMessage - The message displayed on the main button.
 * @param {string} props.backgroundColor - The background color for the button styles.
 * @param {function} props.toggleStatus - A function to toggle the status of the entity.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsProfileEditing - A function to set the profile editing state.
 * @param {IPatient} [props.patient] - An optional patient object.
 * @param {IAffliction} [props.affliction] - An optional affliction object.
 * @param {ITherapist} [props.therapist] - An optional therapist object.
 * @param {IMedic} [props.medic] - An optional medic object.
 * @param {IInsurance} [props.insurance] - An optional insurance organization object.
 * @param {function} props.handlePatientStatusChanges - A function to handle changes to a patient's status.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsDeleteModalOpen - A function to open or close the delete confirmation modal.
 *
 * @returns {JSX.Element} The rendered ButtonsSection component, which includes buttons for managing the selected entity's profile, with functionalities for editing, validating, cancelling, deleting, and navigating back.
 */

import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';
import { IPatient } from '../../../../../../@types/IPatient';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { ITherapist } from '../../../../../../@types/ITherapist';
import TherapistStatusButtons from '../generalComponents/therapist/TherapistStatusButtons';
import PatientStatusButtons from '../generalComponents/patient/PatientStatusButtons';
import { IMedic } from '../../../../../../@types/IMedic';
import { IInsurance } from '../../../../../../@types/IInsurance';

interface ButtonsSectionProps {
  isProfileEditing: boolean;
  buttonMessage: string;
  backgroundColor: string;
  toggleStatus: (status: string) => void;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  patient?: IPatient;
  affliction?: IAffliction;
  therapist?: ITherapist;
  medic?: IMedic;
  insurance?: IInsurance;
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
  medic,
  insurance,
  handlePatientStatusChanges,
  setIsDeleteModalOpen,
}: ButtonsSectionProps) {
  return (
    <div className="buttons flex gap-2 items-center justify-between mb-8">
      {isProfileEditing ? (
        <>
          {therapist && (
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
                <TherapistStatusButtons toggleStatus={toggleStatus} />
              </MenuItems>
            </Menu>
          )}

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
          {!patient && (
            <CustomButton
              btnText={`Modifier ${affliction ? 'affliction' : therapist ? 'kinésithérapeute' : medic ? 'médecin' : insurance ? '' : ''}`}
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
          <CustomButton
            btnText="Retour"
            btnType="button"
            cancelButton
            onClick={() => window.history.back()}
          />
        </>
      )}
    </div>
  );
}
