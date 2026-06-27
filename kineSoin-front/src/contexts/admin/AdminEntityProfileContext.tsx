import { createContext, useState } from 'react';
import type { IAdminEntityProfileContextProps } from '../../@types/interfaces/contextInterfaces';

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

  const [entityPictureUrl, setEntityPictureUrl] = useState<string>('');

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form state variables
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const [updateEntityForm, setUpdateEntityForm] = useState<FormData | null>(
  //   null
  // );

  //   const [entityName, setEntityName] = useState<string>('');
  //   const [entitySurname, setEntitySurname] = useState<string>('');
  //   const [entityEmail, setEntityEmail] = useState<string>('');
  //   const [entityPrefix, setEntityPrefix] = useState<string>('');
  //   const [entityPhoneNumber, setEntityPhoneNumber] = useState<string>('');
  //   const [entityLicenceCode, setEntityLicenceCode] = useState<string>('');
  //   const [entityDiploma, setEntityDiploma] = useState<string>('');
  //   const [entityAMCCode, setEntityAMCCode] = useState<string>('');
  //   const [entitySpecialty, setEntitySpecialty] = useState<string>('');
  //   const [entityExperience, setEntityExperience] = useState<string>('');
  //   const [entityDescription, setEntityDescription] = useState<string>('');
  //   const [entityStreetNumber, setEntityStreetNumber] = useState<string>('');
  //   const [entityStreetName, setEntityStreetName] = useState<string>('');
  //   const [entityCity, setEntityCity] = useState<string>('');
  //   const [entityPostalCode, setEntityPostalCode] = useState<string>('');
  //   const [entityId, setEntityId] = useState<number | null>(null);

  //   const [entityStatus, setEntityStatus] = useState<string>('');
  //   const [entityAge, setEntityAge] = useState<string>('');
  //   const [entityGender, setEntityGender] = useState<string>('');
  //   const [entityInsuranceCode, setEntityInsuranceCode] = useState<string>('');
  //   const [entityOperatedStatus, setEntityOperatedStatus] = useState<string>('');
  //   const [entityBodyRegion, setEntityBodyRegion] = useState<IBodyRegion | null>(
  //     null
  //   );
  //   const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  //   const fetchBodyRegionsMutation = useGetBodyRegionsMutation();

  //   useEffect(() => {
  //     fetchBodyRegionsMutation.mutate(undefined, {
  //       onSuccess: (data) => {
  //         setBodyRegions(data);
  //       },
  //       onError: (error) => {
  //         console.error('Error fetching body regions:', error);
  //       },
  //     });
  //   }, []);

  //   const setEntityStates = (
  //     entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null
  //   ) => {
  //     if (entity) {
  //       'status' in entity && setEntityStatus(entity.status);
  //       'name' in entity && setEntityName(entity.name);
  //       'surname' in entity && setEntitySurname(entity.surname);
  //       'email' in entity && setEntityEmail(entity.email);
  //       'prefix' in entity && setEntityPrefix(entity.prefix);
  //       'phone_number' in entity && setEntityPhoneNumber(entity.phone_number);
  //       'licence_code' in entity && setEntityLicenceCode(entity.licence_code);
  //       'diploma' in entity && setEntityDiploma(entity.diploma);
  //       'amc_code' in entity && setEntityAMCCode(entity.amc_code);
  //       'specialty' in entity && setEntitySpecialty(entity.specialty);
  //       'experience' in entity && setEntityExperience(entity.experience);
  //       'description' in entity && setEntityDescription(entity.description);
  //       'street_number' in entity && setEntityStreetNumber(entity.street_number);
  //       'street_name' in entity && setEntityStreetName(entity.street_name);
  //       'city' in entity && setEntityCity(entity.city);
  //       'postal_code' in entity && setEntityPostalCode(entity.postal_code);
  //       'id' in entity && setEntityId(entity.id);
  //       'picture_url' in entity && setEntityPictureUrl(entity.picture_url);
  //       'picture_url' in entity && setPreviewUrl(entity.picture_url || null);
  //       'age' in entity &&
  //         setEntityAge(entity.age !== undefined ? String(entity.age) : '');
  //       'gender' in entity && setEntityGender(entity.gender);
  //       'insurance_code' in entity &&
  //         setEntityInsuranceCode(entity.insurance_code);
  //       'is_operated' in entity &&
  //         setEntityOperatedStatus(entity.is_operated ? 'Oui' : 'Non');
  //       'body_region' in entity &&
  //         setEntityBodyRegion(entity.body_region || null);
  //     }
  //   };

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

        entityPictureUrl,
        setEntityPictureUrl,
        // isDeleteModalOpen,
        // setIsDeleteModalOpen,
        // selectedFile,
        // setSelectedFile,
        // updateEntityForm,
        // setUpdateEntityForm,
        //   entityName,
        //   setEntityName,
        //   entitySurname,
        //   setEntitySurname,
        //   entityEmail,
        //   setEntityEmail,
        //   entityPrefix,
        //   setEntityPrefix,
        //   entityPhoneNumber,
        //   setEntityPhoneNumber,
        //   entityLicenceCode,
        //   setEntityLicenceCode,
        //   entityDiploma,
        //   setEntityDiploma,
        //   entityAMCCode,
        //   setEntityAMCCode,
        //   entitySpecialty,
        //   setEntitySpecialty,
        //   entityExperience,
        //   setEntityExperience,
        //   entityDescription,
        //   setEntityDescription,
        //   entityStreetNumber,
        //   setEntityStreetNumber,
        //   entityStreetName,
        //   setEntityStreetName,
        //   entityCity,
        //   setEntityCity,
        //   entityPostalCode,
        //   setEntityPostalCode,
        //   entityId,
        //   setEntityId,

        //   entityStatus,
        //   setEntityStatus,
        //   entityAge,
        //   setEntityAge,
        //   entityGender,
        //   setEntityGender,
        //   entityInsuranceCode,
        //   setEntityInsuranceCode,
        //   entityOperatedStatus,
        //   setEntityOperatedStatus,
        //   entityBodyRegion,
        //   setEntityBodyRegion,
        //   setEntityStates, // Function to set entity states based on the provided entity
        //   inputChangeHandlers,
        //   bodyRegions,
      }}
    >
      {children}
    </AdminEntityProfileContext.Provider>
  );
};

export default AdminEntityProfileContext;
