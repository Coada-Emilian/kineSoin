import type { Dispatch, SetStateAction } from 'react';
import type { IAdminEntity } from '../types/adminTypes';
import type { FormOrderTypes } from '../types/formTypes';
import type { ICountryPrefix } from './apiInterfaces';
import type { IAddTherapistFormData } from './formInterfaces';

export interface IAppContext {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setError: (message: string | null) => void;
  countryPrefixes: ICountryPrefix[];
  setCountryPrefixes: Dispatch<SetStateAction<ICountryPrefix[]>>;
}

export interface IPatientRegistrationContext {
  formOrder: FormOrderTypes;
  setFormOrder: React.Dispatch<React.SetStateAction<FormOrderTypes>>;
}

export interface IAuthentificationContext {
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  adminProfileToken: string | null;
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  patientProfileToken: string | null;
  setPatientProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isTherapistAuthenticated: boolean;
  setIsTherapistAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  therapistProfileToken: string | null;
  setTherapistProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IAdminContext {
  selectedEntity: IAdminEntity | null;
  openModal: string | null;
  setOpenModal: (modal: string | null) => void;
  setSelectedEntity: (entity: IAdminEntity | null) => void;
  setRegionDeleteModal: (value: boolean) => void;
  regionDeleteModal: boolean;
  openDeleteModal: (entity: IAdminEntity, isRegionModal?: boolean) => void;
  closeModal: () => void;
  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
  renderedEntities: IAdminEntity[];
  setRenderedEntities: (entities: IAdminEntity[]) => void;
}

export interface IAdminAddTherapistContext {
  addForm: IAddTherapistFormData;
  setAddForm: (form: IAddTherapistFormData) => void;
}

export interface IAdminEntityProfileContextProps {
  isProfileEditing: boolean;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  isEditPhotoModalOpen: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;

  entityPictureUrl: string;
  setEntityPictureUrl: React.Dispatch<React.SetStateAction<string>>;

  entityName: string;
  setEntityName: React.Dispatch<React.SetStateAction<string>>;

  entitySurname: string;
  setEntitySurname: React.Dispatch<React.SetStateAction<string>>;

  entityId: number | null;
  setEntityId: React.Dispatch<React.SetStateAction<number | null>>;

  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;

  entityAge: string;
  setEntityAge: React.Dispatch<React.SetStateAction<string>>;

  entityGender: string;
  setEntityGender: React.Dispatch<React.SetStateAction<string>>;

  // isDeleteModalOpen: boolean;
  // setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // selectedFile: File | null;
  // setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  // updateEntityForm: FormData | null;
  // setUpdateEntityForm: React.Dispatch<React.SetStateAction<FormData | null>>;

  // entityEmail: string;
  // setEntityEmail: React.Dispatch<React.SetStateAction<string>>;
  // entityPrefix: string;
  // setEntityPrefix: React.Dispatch<React.SetStateAction<string>>;
  // entityPhoneNumber: string;
  // setEntityPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  // entityLicenceCode: string;
  // setEntityLicenceCode: React.Dispatch<React.SetStateAction<string>>;
  // entityDiploma: string;
  // setEntityDiploma: React.Dispatch<React.SetStateAction<string>>;
  // entityAMCCode: string;
  // setEntityAMCCode: React.Dispatch<React.SetStateAction<string>>;
  // entitySpecialty: string;
  // setEntitySpecialty: React.Dispatch<React.SetStateAction<string>>;
  // entityExperience: string;
  // setEntityExperience: React.Dispatch<React.SetStateAction<string>>;
  // entityDescription: string;
  // setEntityDescription: React.Dispatch<React.SetStateAction<string>>;
  // entityStreetNumber: string;
  // setEntityStreetNumber: React.Dispatch<React.SetStateAction<string>>;
  // entityStreetName: string;
  // setEntityStreetName: React.Dispatch<React.SetStateAction<string>>;
  // entityCity: string;
  // setEntityCity: React.Dispatch<React.SetStateAction<string>>;
  // entityPostalCode: string;
  // setEntityPostalCode: React.Dispatch<React.SetStateAction<string>>;

  // entityInsuranceCode: string;
  // setEntityInsuranceCode: React.Dispatch<React.SetStateAction<string>>;
  // entityOperatedStatus: string;
  // setEntityOperatedStatus: React.Dispatch<React.SetStateAction<string>>;
  // entityBodyRegion: IBodyRegion | null;
  // setEntityBodyRegion: React.Dispatch<React.SetStateAction<IBodyRegion | null>>;
  // setEntityStates: (
  //   entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null
  // ) => void;
  // inputChangeHandlers: IEntityFieldSetter[];
  // bodyRegions: IBodyRegion[];
}
