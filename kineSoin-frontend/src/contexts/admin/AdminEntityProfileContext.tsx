import { createContext, useState } from 'react';
import type { IAdminEntityProfileContext } from '../../@types/interfaces/contextInterfaces';
import type { IAdminEditedEntity } from '../../@types/interfaces/customInterfaces';

const AdminEntityProfileContext = createContext<
  IAdminEntityProfileContext | undefined
>(undefined);

export const AdminEntityProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [editedEntity, setEditedEntity] = useState<IAdminEditedEntity>({
    name: '',
    surname: '',
    age: '',
    gender: '',
    email: '',
    status: '',
    prefix: '',
    phone_number: '',
    licence_code: '',
    diploma: '',
    amc_code: '',
    specialty: '',
    experience: '',
    description: '',
    street_number: '',
    street_name: '',
    city: '',
    postal_code: '',
    insurance_code: '',
    picture_url: '',
    id: undefined,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <AdminEntityProfileContext.Provider
      value={{
        isProfileEditing,
        setIsProfileEditing,

        isEditPhotoModalOpen,
        setIsEditPhotoModalOpen,

        previewUrl,
        setPreviewUrl,

        editedEntity,
        setEditedEntity,

        isDeleteModalOpen,
        setIsDeleteModalOpen,

        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </AdminEntityProfileContext.Provider>
  );
};

export default AdminEntityProfileContext;
