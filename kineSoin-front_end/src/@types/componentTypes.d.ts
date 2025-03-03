export type IEntityTypes =
  | 'therapist'
  | 'patient'
  | 'affliction'
  | 'medic'
  | 'insurance';

export type IEntitiesTypes =
  | ITherapist[]
  | IPatient[]
  | IAffliction[]
  | IMedic[]
  | IInsurance[];

export type IEntitiesType = ITherapist | IPatient | IAffliction | IMedic | IInsurance;