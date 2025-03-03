import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardTypes';
import TitleOutputRefactor from './pageComponents/generalComponents/common/GeneralOutputRefactor.tsx';
import CommonSectionRefactor from './pageComponents/sections/CommonSectionRefactor.tsx';
import CustomButton from '../../generalComponents/CustomButton/CustomButton.tsx';
import ProfileSectionRefactor from './pageComponents/generalComponents/common/ProfileSectionRefactor.tsx';
import ImageOutputRefactor from './pageComponents/generalComponents/common/Outputs/ImageOutputRefactor.tsx';
import mainLogo from '/logos/Main-Logo.png';
import phoneIcon from '/icons/phone-call.png';
import messageIcon from '/icons/message3.png';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import StatusButtonsRefactor from './pageComponents/generalComponents/therapist/StatusButtonRefactor.tsx';

interface AdminProfileDetailsRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  entityType: string;
}

export default function AdminProfileDetailsRefactor({
  entity,
  entityType,
}: AdminProfileDetailsRefactorProps) {
  // State variables
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [entityStatus, setEntityStatus] = useState(
    entity && 'status' in entity ? entity.status : 'inactive'
  );
  const [updateEntityForm, setUpdateEntityForm] = useState<FormData | null>();

  //   const getUpdateFunction = () => {
  //     if (therapist)
  //       return (formData: FormData) =>
  //         handleTherapistUpdateAsAdmin(therapist.id, formData);
  //     if (affliction)
  //       return (formData: FormData) =>
  //         handleAfflictionUpdateAsAdmin(affliction.id, formData);
  //     if (medic)
  //       return (formData: FormData) =>
  //         handleMedicUpdateAsAdmin(formData, medic.id);
  //     if (insurance)
  //       return (formData: FormData) =>
  //         handleInsuranceOrganismUpdateAsAdmin(formData, insurance.id);
  //     return null;
  //   };

  //   const updateFunction = getUpdateFunction();

  const entityDetails = [
    { entityType: 'therapist', entity: entity as ITherapist },
    { entityType: 'patient', entity: entity as IPatient },
    { entityType: 'affliction', entity: entity as IAffliction },
    { entityType: 'medic', entity: entity as IMedic },
    { entityType: 'insurance', entity: entity as IInsurance },
  ];

  const activeEntity = entityDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

  const [picture_url, setPictureUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone_number, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [buttonMessage, setButtonMessage] = useState('Changer le statut');
  const [id, setId] = useState<number | null>(null);

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
        className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-lg ${backgroundColor} px-2 py-2 my-0 text-xs md:text-sm md:py-2 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
      >
        {buttonMessage}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 h-5 w-5 text-gray-400"
        />
      </MenuButton>

      <MenuItems className="absolute left-0 z-10 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
        {children}
      </MenuItems>
    </Menu>
  );

  useEffect(() => {
    activeEntity &&
      activeEntity.entity &&
      'picture_url' in activeEntity.entity &&
      setPictureUrl(activeEntity.entity.picture_url);

    activeEntity &&
      activeEntity.entity &&
      'email' in activeEntity.entity &&
      setEmail(activeEntity.entity.email);

    activeEntity &&
      activeEntity.entity &&
      'prefix' in activeEntity.entity &&
      'phone_number' in activeEntity.entity &&
      setPhoneNumber(
        activeEntity.entity.prefix + activeEntity.entity.phone_number
      );

    activeEntity &&
      activeEntity.entity &&
      'name' in activeEntity.entity &&
      setName(activeEntity.entity.name);

    activeEntity &&
      activeEntity.entity &&
      'surname' in activeEntity.entity &&
      setSurname(activeEntity.entity.surname);

    activeEntity &&
      activeEntity.entity &&
      'id' in activeEntity.entity &&
      setId(activeEntity.entity.id);
  }, [activeEntity]);

  return (
    <>
      <form
        // onSubmit={(e) =>
        //   updateFunction &&
        //   handleFormSubmit(
        //     e,
        //     { therapist, therapistStatus, selectedFile, setIsProfileEditing },
        //     updateFunction
        //   )
        // }
        className="flex justify-center"
      >
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-4/6 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center">
            <TitleOutputRefactor entityType={entityType} />
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <ImageOutputRefactor
                picture_url={picture_url ? picture_url : mainLogo}
              />
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            {activeEntity && (
              <>
                <CommonSectionRefactor
                  entity={activeEntity.entity}
                  isProfileEditing={isProfileEditing}
                  entityType={activeEntity.entityType}
                  setUpdateEntityForm={setUpdateEntityForm}
                />

                <ProfileSectionRefactor
                  isProfileEditing={isProfileEditing}
                  entityType={activeEntity.entityType}
                  entity={activeEntity.entity}
                />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
            <div className="flex gap-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                >
                  <img
                    src={messageIcon}
                    alt="send mail"
                    className="w-8 md:w-10"
                  />
                </a>
              )}

              {phone_number && (
                <a href={`tel:${phone_number}`}>
                  <img
                    src={phoneIcon}
                    alt="send mail"
                    className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                  />
                </a>
              )}
            </div>
            <div>
              <p className="text-white italic">{`/ ${name.toLowerCase()}${surname && `.${surname.toLowerCase()}`}`}</p>
            </div>
          </div>
          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center">
            {entityType === 'therapist' && (
              <StatusMenu
                buttonMessage={buttonMessage}
                backgroundColor={backgroundColor}
              >
                <StatusButtonsRefactor
                  setButtonMessage={setButtonMessage}
                  setBackgroundColor={setBackgroundColor}
                  setEntityStatus={setEntityStatus}
                  entityType={entityType}
                  id={id}
                />
              </StatusMenu>
            )}
            {entityType === 'patient' && (
              <StatusMenu
                buttonMessage={buttonMessage}
                backgroundColor={backgroundColor}
              >
                <StatusButtonsRefactor
                  setButtonMessage={setButtonMessage}
                  setBackgroundColor={setBackgroundColor}
                  setEntityStatus={setEntityStatus}
                  entityType={entityType}
                  id={id}
                />
              </StatusMenu>
            )}
            <div className="flex gap-1">
              {entityType !== 'patient' && (
                <CustomButton
                  btnText={`Modifier`}
                  btnType="button"
                  modifyButton
                  onClick={() => setIsProfileEditing(true)}
                />
              )}
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
            </div>
          </div>
        </div>
      </form>

      {/* {isDeleteModalOpen && (
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
      )} */}
    </>
  );
}
