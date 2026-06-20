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
