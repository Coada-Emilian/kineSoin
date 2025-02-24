import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';
import TherapistStatusButtons from '../generalComponents/therapist/TherapistStatusButtons';
import PatientStatusButtons from '../generalComponents/patient/PatientStatusButtons';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';

interface ButtonsSectionProps {
  isProfileEditing: boolean;
  buttonMessage: string;
  backgroundColor: string;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  patient?: IPatient;
  affliction?: IAffliction;
  therapist?: ITherapist;
  medic?: IMedic;
  insurance?: IInsurance;
  handlePatientStatusChanges: (id: number, status: string) => Promise<void>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonMessage: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTherapistStatus: React.Dispatch<React.SetStateAction<string>>;
}

const StatusMenu = ({
  buttonMessage,
  backgroundColor,
  children,
}: {
  buttonMessage: string;
  backgroundColor: string;
  children: React.ReactNode;
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton
      className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-lg ${backgroundColor} p-4 px-3 py-2 my-0 text-xxs md:text-base md:py-3 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
    >
      {buttonMessage}
      <ChevronDownIcon
        aria-hidden="true"
        className="-mr-1 h-5 w-5 text-gray-400"
      />
    </MenuButton>
    <MenuItems className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
      {children}
    </MenuItems>
  </Menu>
);

const ActionButtons = ({
  setIsProfileEditing,
  setIsDeleteModalOpen,
}: {
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>
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
);

export default function ButtonsSection({
  isProfileEditing,
  buttonMessage,
  backgroundColor,
  setIsProfileEditing,
  patient,
  affliction,
  therapist,
  medic,
  insurance,
  handlePatientStatusChanges,
  setIsDeleteModalOpen,
  setButtonMessage,
  setBackgroundColor,
  setTherapistStatus,
}: ButtonsSectionProps) {
  return (
    <div className="buttons flex gap-2 items-center justify-between mb-6 px-2 md:w-1/2">
      {isProfileEditing ? (
        <>
          {therapist && (
            <StatusMenu
              buttonMessage={buttonMessage}
              backgroundColor={backgroundColor}
            >
              <TherapistStatusButtons
                setButtonMessage={setButtonMessage}
                setBackgroundColor={setBackgroundColor}
                setTherapistStatus={setTherapistStatus}
              />
            </StatusMenu>
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
              btnText={`Modifier`}
              btnType="button"
              modifyButton
              onClick={() => setIsProfileEditing(true)}
            />
          )}
          {patient && (
            <StatusMenu
              buttonMessage={buttonMessage}
              backgroundColor={backgroundColor}
            >
              <PatientStatusButtons
                setButtonMessage={setButtonMessage}
                setBackgroundColor={setBackgroundColor}
                setTherapistStatus={setTherapistStatus}
                handlePatientStatusChanges={handlePatientStatusChanges}
                patient={patient}
              />
            </StatusMenu>
          )}
          <ActionButtons
            setIsProfileEditing={setIsProfileEditing}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
