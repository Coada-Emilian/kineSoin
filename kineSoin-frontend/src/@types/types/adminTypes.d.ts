import type {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from './modelInterfaces';

export type IAdminEntity =
  | ITherapist
  | IPatient
  | IAffliction
  | IMedic
  | IInsurance
  | IBodyRegion
  | null;

export type IAdminEntities =
  | ITherapist[]
  | IPatient[]
  | IAffliction[]
  | IMedic[]
  | IInsurance[];

export type IAdminEntityTypes =
  | 'therapist'
  | 'patient'
  | 'affliction'
  | 'medic'
  | 'insurance';

export type IAdminEntityProfileInputTypes =
  | 'email'
  | 'phone_number'
  | 'street_number'
  | 'street_name'
  | 'postal_code'
  | 'city'
  | 'amc_code'
  | 'insurance_code'
  | 'licence_code'
  | 'diploma'
  | 'specialty'
  | 'experience'
  | 'description';
