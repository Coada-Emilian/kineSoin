import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminEntityProfileProps } from '../../../../@types/props/adminProps';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';
import { mapEntityToEditedEntity } from '../../../../utils/functions/admin/adminEntityProfile/mapEntityToEditedEntity';
import { useAdminEntityProfileContext } from '../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import CustomButton from '../../../ui/buttons/CustomButton';
import AdminProfileImageEditModal from '../../../ui/modals/AdminProfileImageEditModal';
import ConfirmDeleteModal from '../../../ui/modals/ConfirmDeleteModal';
import AdminEntityProfileImage from './AdminEntityProfileImage';
import EntityProfileTitle from './AdminEntityProfileTitle';
import AdminEntityProfileContactSection from './entityProfileContactSection/AdminEntityProfileContactSection';
import AdminEntityProfileIdentitySection from './entityProfileIdentitySection/AdminEntityProfileIdentitySection';
import AdminEntityStatusButtons from './statusMenu/AdminEntityStatusButtons';
import { AdminEntityStatusMenu } from './statusMenu/AdminEntityStatusMenu';
import messageIcon from '/icons/message3.png';
import phoneIcon from '/icons/phone-call.png';
import mainLogo from '/logos/new-logo.webp';

export default function AdminEntityProfile({
  entity,
  entityType,
}: AdminEntityProfileProps) {
  const navigate = useNavigate();

  const {
    editedEntity,
    setEditedEntity,
    isProfileEditing,
    setIsProfileEditing,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setSelectedFile,
    setPreviewUrl,
    isEditPhotoModalOpen,
    setIsEditPhotoModalOpen,
  } = useAdminEntityProfileContext();

  useEffect(() => {
    if (entity) {
      setEditedEntity(mapEntityToEditedEntity(entity));
    }
  }, [entity, setEditedEntity]);

  useEffect(() => {
    console.log('Edited entity is ', editedEntity);
  }, [editedEntity]);

  useEffect(() => {
    console.log('Entity is ', entity);
  }, [entity]);

  //   const mutationEntry = entityUpdateMutations().find(
  //     (entry) => entry.entityType === entityType && entry.updateFunction
  //   );

  //   const activeMutation = mutationEntry?.updateFunction?.();

  // Define mutations for therapist and patient status changes
  //   const handleTherapistStatusChange = useTherapistStatusChangeMutation();
  //   const handlePatientStatusChange = usePatientStatusChangeMutation();

  // Destructure global context for admin profile details
  //   const {
  //     setIsProfileEditing,
  //     setIsDeleteModalOpen,
  //     isDeleteModalOpen,
  //     setEntityStates,
  //     entityPictureUrl,
  //     entityEmail,
  //     entityPhoneNumber,
  //     entityName,
  //     entitySurname,
  //     entityId,
  //     entityStatus,
  //     isProfileEditing,
  //     isEditPhotoModalOpen,
  //     setSelectedFile,
  //     setIsEditPhotoModalOpen,
  //     setPreviewUrl,
  //     selectedFile,
  //     setEntityStatus,
  //   } = useAdminProfileDetailsGlobalContext();

  const handleModifyClick = () => {
    setIsProfileEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsProfileEditing(false);
    setSelectedFile(null);
    setPreviewUrl(
      editedEntity && 'picture_url' in editedEntity
        ? (editedEntity as { picture_url?: string }).picture_url || null
        : null
    );
    setEditedEntity((prev) => ({
      ...prev,
      status: editedEntity.status,
    }));
  };

  const handleCancelClickToReturn = () => {
    navigate(`/admin/${entityType}s`);
  };

  // Handle form submission for profile updates
  //   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (entityType !== 'patient') {
  //       if (!activeMutation || !entityId) return;

  //       const formData = new FormData(e.currentTarget);
  //       if (selectedFile) {
  //         formData.append('file', selectedFile);
  //       }

  //       activeMutation.mutate({ id: entityId, formData });

  //       if (activeMutation.isPending) {
  //         return DNALoader();
  //       }
  //     }

  //     if (entityType === 'therapist' && entityId !== null) {
  //       handleTherapistStatusChange.mutate({
  //         id: entityId,
  //         status: entityStatus,
  //       });
  //     } else if (entityType === 'patient' && entityId !== null) {
  //       handlePatientStatusChange.mutate({
  //         id: entityId,
  //         status: entityStatus,
  //       });
  //     }

  //     setIsProfileEditing(false);
  //     setSelectedFile(null);
  //   };

  return (
    <>
      <form className="flex justify-center">
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-4/6 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center">
            <EntityProfileTitle entityType={entityType} />
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <AdminEntityProfileImage
                picture_url={
                  entityType === 'therapist' || entityType === 'patient'
                    ? editedEntity.picture_url
                    : mainLogo
                }
                entityType={entityType}
              />
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            {entity && (
              <>
                <AdminEntityProfileIdentitySection entityType={entityType} />

                <AdminEntityProfileContactSection entityType={entityType} />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
            <div className="flex gap-2">
              {editedEntity.email && (
                <a
                  href={`mailto:${editedEntity.email}`}
                  className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                >
                  <img
                    src={messageIcon}
                    alt="send mail"
                    className="w-8 md:w-10"
                  />
                </a>
              )}

              {editedEntity.phone_number && editedEntity.prefix && (
                <a
                  href={`tel:${editedEntity.prefix + editedEntity.phone_number}`}
                >
                  <img
                    src={phoneIcon}
                    alt="send mail"
                    className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                  />
                </a>
              )}
            </div>

            <div>
              <p className="text-white italic">{`/ ${editedEntity.name?.toLowerCase()}${editedEntity.surname?.toLowerCase()}`}</p>
            </div>
          </div>

          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center rounded-b-xl">
            <div className="flex gap-1 items-center ">
              {!isProfileEditing ? (
                <>
                  <>
                    <CustomButton
                      btn={{
                        type: 'modify',
                        text: 'Modifier',
                        style: 'normal',
                        hasBorder: true,
                        onClick: handleModifyClick,
                      }}
                    />
                    <CustomButton
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
                  {editedEntity.status && (
                    <AdminEntityStatusMenu>
                      <AdminEntityStatusButtons
                        entityType={entityType}
                        id={editedEntity.id}
                        entityStatus={editedEntity.status}
                        setEditedEntity={setEditedEntity}
                      />
                    </AdminEntityStatusMenu>
                  )}

                  <CustomButton
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
                <CustomButton
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
          entity={entity as IAdminEntity}
        />
      )}

      {isEditPhotoModalOpen && entityType === 'therapist' && (
        <AdminProfileImageEditModal
          isOpen={isEditPhotoModalOpen}
          onClose={() => setIsEditPhotoModalOpen(false)}
        />
      )}
    </>
  );
}
