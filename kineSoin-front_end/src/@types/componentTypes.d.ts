export type IEntityTypes =
  | 'therapist'
  | 'patient'
  | 'affliction'
  | 'medic'
  | 'insurance';

export type IEntitiesInterfaces =
  | ITherapist[]
  | IPatient[]
  | IAffliction[]
  | IMedic[]
  | IInsurance[];

export type IEntityInterface =
  | ITherapist
  | IPatient
  | IAffliction
  | IMedic
  | IInsurance
  | IBodyRegion
  | null;

export type IModalTypes =
  | 'delete'
  | 'addAffliction'
  | 'region'
  | 'addTherapistP1'
  | 'addTherapistP2'
  | 'addTherapistP3'
  | 'addMedic'
  | 'addInsurance'
  | 'addRegion';


