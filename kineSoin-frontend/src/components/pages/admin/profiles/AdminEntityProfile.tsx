import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminEntityProfileProps } from '../../../../@types/props/adminProps';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';
import { entityUpdateMutations } from '../../../../utils/config/admin/entityUpdateMutations';
import { mapEntityToEditedEntity } from '../../../../utils/functions/admin/adminEntityProfile/mapEntityToEditedEntity';
import { usePatientStatusChangeAsAdminMutation } from '../../../../utils/hooks/admin/update/usePatientStatusChangeAsAdminMutation';
import { useTherapistStatusChangeAsAdminMutation } from '../../../../utils/hooks/admin/update/useTherapistStatusChangeAsAdminMutation';
import { useAdminEntityProfileContext } from '../../../../utils/hooks/context/useAdminEntityProfileContext';
import CustomButton from '../../../ui/buttons/CustomButton';
import AdminProfileImageEditModal from '../../../ui/modals/admin/AdminProfileImageEditModal';
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
    selectedFile,
  } = useAdminEntityProfileContext();

  useEffect(() => {
    if (entity) {
      setEditedEntity(mapEntityToEditedEntity(entity));
    }
    // setEditedEntity is a stable state setter from context.
    // We only want to remap when the entity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

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

  const mutationEntry = entityUpdateMutations().find(
    (entry) => entry.entityType === entityType && entry.updateFunction
  );

  const activeMutation = mutationEntry?.updateFunction?.();

  // Define mutations for therapist and patient status changes
  const handleTherapistStatusChange = useTherapistStatusChangeAsAdminMutation();
  const handlePatientStatusChange = usePatientStatusChangeAsAdminMutation();

  // Handle form submission for profile updates
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const entityId = editedEntity.id;

    if (!entityId) return;

    if (entityType !== 'patient') {
      if (!activeMutation) return;

      const formData = new FormData(e.currentTarget);

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      activeMutation.mutate(
        {
          id: entityId,
          formData,
        },
        {
          onSuccess: () => {
            setIsProfileEditing(false);
            setSelectedFile(null);
            console.log('editedEntity', editedEntity);
            console.log('entity', entity);
          },
        }
      );
    }

    if (entityType === 'therapist' && editedEntity.status) {
      handleTherapistStatusChange.mutate({
        id: entityId,
        status: editedEntity.status,
      });
    }

    if (entityType === 'patient' && editedEntity.status) {
      handlePatientStatusChange.mutate({
        id: entityId,
        status: editedEntity.status,
      });
    }
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={handleFormSubmit}>
        <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-primaryBlue shadow-lg transition-shadow duration-300 hover:shadow-xl mx-4 my-8">
          <div className="flex w-full items-center justify-center border-b border-gray-200 bg-primaryBlue px-6 py-5">
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

          <div className="w-full p-4 md:py-10 md:px-20">
            {entity && (
              <>
                <AdminEntityProfileIdentitySection entityType={entityType} />

                <AdminEntityProfileContactSection entityType={entityType} />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-4 w-full flex items-center gap-5 justify-center">
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
              <p className="text-white italic flex items-center">{`/ ${editedEntity.name?.toLowerCase()}.${editedEntity.surname?.toLowerCase()}`}</p>
            </div>
          </div>

          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center rounded-b-xl">
            <div className="flex gap-1 items-center ">
              {!isProfileEditing ? (
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

              <CustomButton
                btn={{
                  type: 'cancel',
                  text: isProfileEditing ? 'Annuler' : 'Retour',
                  style: 'normal',
                  hasBorder: true,
                  onClick: isProfileEditing
                    ? handleCancelClick
                    : handleCancelClickToReturn,
                }}
              />
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
