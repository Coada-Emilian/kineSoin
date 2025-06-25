/**
 * @component AdminProfileDetailsRefactor
 *
 * Displays detailed information and editable form for a specific admin-managed entity
 * (therapist, patient, affliction, medic, or insurance). Includes logic for viewing,
 * editing, updating status, and deleting the entity.
 *
 * @param {ITherapist | IPatient | IAffliction | IMedic | IInsurance | null} entity - The entity object to display and edit.
 * @param {string} entityType - The type of the entity, used for conditional rendering and logic (e.g., "therapist").
 *
 * @returns {JSX.Element} A complete entity profile view with editable fields, photo preview, action buttons, and status controls.
 *
 * @details
 * - Uses context from `useAdminProfileDetailsGlobalContext` to manage global state and form values.
 * - On mount, sets entity-related state via `setEntityStates`.
 * - Displays a dynamic title, image, and form sections (`CommonSectionRefactor`, `ProfileSectionRefactor`).
 * - Includes actions to modify, delete, or cancel profile changes.
 * - Submits the profile data using `entityUpdateMutations`, and updates status for patients and therapists using dedicated mutation hooks.
 * - Includes conditional modals (`ConfirmDeleteModal`, `EditPhotoModalRefactor`) and email/phone interaction shortcuts.
 * - Uses `ToastContainer` for error or success notifications.
 */

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/interfaces/modelInterfaces';
import { entityUpdateMutations } from '../../../../../utils/constants/adminSection/adminProfileDetails/entityUpdateMutations.tsx';
import { StatusMenu } from '../../../../../utils/constants/adminSection/adminProfileDetails/StatusMenu.tsx';
import { useAdminProfileDetailsGlobalContext } from '../../../../../utils/contexts/AdminProfileDetailsGlobalContext.tsx';
import { useGlobalContext } from '../../../../../utils/contexts/GlobalContext.tsx';
import DNALoader from '../../../../../utils/DNALoader.tsx';
import { usePatientStatusChangeMutation } from '../../../../../utils/functions/adminSection/adminTable/mutations/usePatientStatusChangeMutation.ts';
import { useTherapistStatusChangeMutation } from '../../../../../utils/functions/adminSection/adminTable/mutations/useTherapistStatusChangeMutation.ts';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor.tsx';
import ConfirmDeleteModal from '../../adminTable/newComponents/modals/ConfirmDeleteModal.tsx';
import EditPhotoModalRefactor from './EditPhotoModalRefactor.tsx';
import { ImageOutputRefactor, TitleOutputRefactor } from './outputs/index.ts';
import {
  CommonSectionRefactor,
  ProfileSectionRefactor,
} from './sections/index.ts';
import StatusButtonsRefactor from './StatusButtonRefactor.tsx';
import messageIcon from '/icons/message3.png';
import phoneIcon from '/icons/phone-call.png';
import mainLogo from '/logos/Main-Logo.png';

interface AdminProfileDetailsRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  entityType: string;
}

export default function AdminProfileDetailsRefactor({
  entity,
  entityType,
}: AdminProfileDetailsRefactorProps) {
  // Find the mutation entry based on the entityType
  const mutationEntry = entityUpdateMutations().find(
    (entry) => entry.entityType === entityType && entry.updateFunction
  );

  // Set the active mutation function based on the entityType
  const activeMutation = mutationEntry?.updateFunction?.();

  // Get navigate function from global context
  const { navigate } = useGlobalContext();

  // Define mutations for therapist and patient status changes
  const handleTherapistStatusChange = useTherapistStatusChangeMutation();
  const handlePatientStatusChange = usePatientStatusChangeMutation();

  // Destructure global context for admin profile details
  const {
    setIsProfileEditing,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    setEntityStates,
    entityPictureUrl,
    entityEmail,
    entityPhoneNumber,
    entityName,
    entitySurname,
    entityId,
    entityStatus,
    isProfileEditing,
    isEditPhotoModalOpen,
    setSelectedFile,
    setIsEditPhotoModalOpen,
    setPreviewUrl,
    selectedFile,
    setEntityStatus,
  } = useAdminProfileDetailsGlobalContext();

  // Set the initial entity states when the component mounts
  useEffect(() => {
    setEntityStates(entity);
  }, [entity]);

  // Modify click handler to set profile editing state
  const handleModifyClick = () => {
    setIsProfileEditing(true);
  };

  // Delete click handler to open the delete modal
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Edit photo click handler to open the edit photo modal
  const handleCancelClick = () => {
    setIsProfileEditing(false);
    setSelectedFile(null);
    setPreviewUrl(
      entity && 'picture_url' in entity
        ? (entity as { picture_url?: string }).picture_url || null
        : null
    );
    setEntityStatus(entity && 'status' in entity ? entity.status : '');
  };

  // Cancel click handler to return to the list of entities
  const handleCancelClickToReturn = () => {
    navigate(`/admin/${entityType}s`);
  };

  // Handle form submission for profile updates
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (entityType !== 'patient') {
      if (!activeMutation || !entityId) return;

      const formData = new FormData(e.currentTarget);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      activeMutation.mutate({ id: entityId, formData });

      if (activeMutation.isPending) {
        return DNALoader();
      }
    }

    if (entityType === 'therapist' && entityId !== null) {
      handleTherapistStatusChange.mutate({
        id: entityId,
        status: entityStatus,
      });
    } else if (entityType === 'patient' && entityId !== null) {
      handlePatientStatusChange.mutate({
        id: entityId,
        status: entityStatus,
      });
    }

    setIsProfileEditing(false);
    setSelectedFile(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex justify-center">
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-4/6 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center">
            <TitleOutputRefactor entityType={entityType} />
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <ImageOutputRefactor
                picture_url={entityPictureUrl ? entityPictureUrl : mainLogo}
                entityType={entityType}
              />
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            {entity && (
              <>
                <CommonSectionRefactor entityType={entityType} />

                <ProfileSectionRefactor
                  entity={entity}
                  entityType={entityType}
                />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
            <div className="flex gap-2">
              {entityEmail && (
                <a
                  href={`mailto:${entityEmail}`}
                  className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                >
                  <img
                    src={messageIcon}
                    alt="send mail"
                    className="w-8 md:w-10"
                  />
                </a>
              )}

              {entityPhoneNumber && (
                <a href={`tel:${entityPhoneNumber}`}>
                  <img
                    src={phoneIcon}
                    alt="send mail"
                    className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                  />
                </a>
              )}
            </div>

            <div>
              <p className="text-white italic">{`/ ${entityName.toLowerCase()}${entitySurname && `.${entitySurname.toLowerCase()}`}`}</p>
            </div>
          </div>

          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center rounded-b-xl">
            <div className="flex gap-1 items-center ">
              {!isProfileEditing ? (
                <>
                  <>
                    <CustomBtn
                      btn={{
                        type: 'modify',
                        text: 'Modifier',
                        style: 'normal',
                        hasBorder: true,
                        onClick: handleModifyClick,
                      }}
                    />
                    <CustomBtn
                      btn={{
                        type: 'delete',
                        text: 'Supprimer',
                        style: 'normal',
                        hasBorder: true,
                        onClick: handleDeleteClick,
                      }}
                    />
                  </>
                </>
              ) : (
                <>
                  {entityStatus && (
                    <StatusMenu>
                      <StatusButtonsRefactor
                        entityType={entityType}
                        id={entityId}
                        entityStatus={entityStatus}
                        setEntityStatus={setEntityStatus}
                      />
                    </StatusMenu>
                  )}
                  <CustomBtn
                    btn={{
                      type: 'active',
                      text: 'Enregistrer',
                      style: 'normal',
                      hasBorder: true,
                    }}
                    type="submit"
                  />
                </>
              )}

              <>
                <CustomBtn
                  btn={{
                    type: 'cancel',
                    text: 'Annuler',
                    style: 'normal',
                    hasBorder: true,
                    onClick: isProfileEditing
                      ? handleCancelClick
                      : handleCancelClickToReturn,
                  }}
                />
              </>
            </div>
          </div>
        </div>
      </form>

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          entityType={entityType}
          entity={entity}
        />
      )}

      {isEditPhotoModalOpen && entityType === 'therapist' && (
        <EditPhotoModalRefactor
          isOpen={isEditPhotoModalOpen}
          onClose={() => setIsEditPhotoModalOpen(false)}
          therapist={entity as ITherapist}
          setSelectedFile={setSelectedFile}
        />
      )}
      
    </>
  );
}
