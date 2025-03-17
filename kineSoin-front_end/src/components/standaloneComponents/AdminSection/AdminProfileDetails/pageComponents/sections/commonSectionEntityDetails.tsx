import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';

export const CommonSectionEntityDetails = (
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null
) => [
  {
    entityType: 'Therapist',
    entity: entity as ITherapist,
  },
  {
    entityType: 'Patient',
    entity: entity as IPatient,
  },
  {
    entityType: 'Affliction',
    entity: entity as IAffliction,
  },
  {
    entityType: 'Medic',
    entity: entity as IMedic,
  },
  {
    entityType: 'Insurance',
    entity: entity as IInsurance,
  },
];
