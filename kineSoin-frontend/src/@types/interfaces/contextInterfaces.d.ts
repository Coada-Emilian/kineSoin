import type { Dispatch, SetStateAction } from 'react';
import type { IAdminEntity } from '../types/adminTypes';
import type { FormOrderTypes } from '../types/formTypes';
import type { ICountryPrefix } from './apiInterfaces';
import type { IAdminEditedEntity } from './customInterfaces';
import type { IAddTherapistFormData } from './formInterfaces';
import type {
  IDashboardAppointment,
  IPatientSummary,
  IPrescriptionSummary,
} from './therapistInterfaces';

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

export interface IAuthenticationContext {
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;

  user: AuthenticatedUser | null;

  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;

  accessToken: string | null;

  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => Promise<void>;
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

export interface AuthenticatedUser {
  id: number;
  role: 'ADMIN' | 'THERAPIST' | 'PATIENT';
}

export interface IAdminEntityProfileContext {
  // UI state
  isProfileEditing: boolean;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  isEditPhotoModalOpen: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;

  // Entity editing state
  editedEntity: IAdminEditedEntity;
  setEditedEntity: React.Dispatch<React.SetStateAction<IAdminEditedEntity>>;

  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface ITherapistSelectionContext {
  selectedPatient: IPatientSummary | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<IPatientSummary | null>
  >;

  selectedDashboardAppointment: IDashboardAppointment | null;
  setSelectedDashboardAppointment: React.Dispatch<
    React.SetStateAction<IDashboardAppointment | null>
  >;

  selectedPrescription: IPrescriptionSummary | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<IPrescriptionSummary | null>
  >;
}
