import type { FormOrderTypes } from '../types/customTypes';
import type { CountryPrefixInterface } from './customInterfaces';

export interface IAppContext {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setError: (message: string | null) => void;
  countryPrefixes: CountryPrefixInterface[];
  setCountryPrefixes: Dispatch<SetStateAction<CountryPrefixInterface[]>>;
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

export type IEntities =
  | ITherapist[]
  | IPatient[]
  | IAffliction[]
  | IMedic[]
  | IInsurance[];

export type IEntity =
  | ITherapist
  | IPatient
  | IAffliction
  | IMedic
  | IInsurance
  | IBodyRegion
  | null;
