import type { Dispatch, SetStateAction } from 'react';
import type { FormOrderTypes } from '../types/customTypes';
import type { IAdminEntity, ICountryPrefix } from './customInterfaces';

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
