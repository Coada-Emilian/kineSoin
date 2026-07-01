import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/interfaces/modelInterfaces';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';

export const getDeleteModalEntityDetails = (entity: IAdminEntity) => [
  {
    entityType: 'therapist',
    full_name: (entity as ITherapist).fullName,
    id: entity.id,
  },
  {
    entityType: 'patient',
    full_name: (entity as IPatient).fullName,
    id: entity.id,
  },
  {
    entityType: 'affliction',
    name: (entity as IAffliction).name,
    id: entity.id,
  },
  {
    entityType: 'medic',
    full_name: (entity as IMedic).fullName,
    id: entity.id,
  },
  {
    entityType: 'insurance',
    name: (entity as IInsurance).name,
    id: entity.id,
  },
];
