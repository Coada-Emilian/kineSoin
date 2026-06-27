import { createContext, useState } from 'react';
import type { IAdminEntityProfileContextProps } from '../../@types/interfaces/contextInterfaces';
import type { IAdminEditedEntity } from '../../@types/interfaces/customInterfaces';

const AdminEntityProfileContext = createContext<
  IAdminEntityProfileContextProps | undefined
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
    is_operated: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const [updateEntityForm, setUpdateEntityForm] = useState<FormData | null>(
  //   null
  // );

  //   const inputChangeHandlers = [
  //     {
  //       stateName: 'entityName',
  //       setState: setEntityName,
  //     },
  //     {
  //       stateName: 'entitySurname',
  //       setState: setEntitySurname,
  //     },
  //     {
  //       stateName: 'entityEmail',
  //       setState: setEntityEmail,
  //     },
  //     {
  //       stateName: 'entityPrefix',
  //       setState: setEntityPrefix,
  //     },
  //     {
  //       stateName: 'entityPhoneNumber',
  //       setState: setEntityPhoneNumber,
  //     },
  //     {
  //       stateName: 'entityLicenceCode',
  //       setState: setEntityLicenceCode,
  //     },
  //     {
  //       stateName: 'entityDiploma',
  //       setState: setEntityDiploma,
  //     },
  //     {
  //       stateName: 'entityAMCCode',
  //       setState: setEntityAMCCode,
  //     },
  //     {
  //       stateName: 'entitySpecialty',
  //       setState: setEntitySpecialty,
  //     },
  //     {
  //       stateName: 'entityExperience',
  //       setState: setEntityExperience,
  //     },
  //     {
  //       stateName: 'entityDescription',
  //       setState: setEntityDescription,
  //     },
  //     {
  //       stateName: 'entityStreetNumber',
  //       setState: setEntityStreetNumber,
  //     },
  //     {
  //       stateName: 'entityStreetName',
  //       setState: setEntityStreetName,
  //     },
  //     {
  //       stateName: 'entityCity',
  //       setState: setEntityCity,
  //     },
  //     {
  //       stateName: 'entityPostalCode',
  //       setState: setEntityPostalCode,
  //     },
  //   ];

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
        
        // updateEntityForm,
        // setUpdateEntityForm,
        //   setEntityStates, // Function to set entity states based on the provided entity
        //   inputChangeHandlers,
      }}
    >
      {children}
    </AdminEntityProfileContext.Provider>
  );
};

export default AdminEntityProfileContext;
