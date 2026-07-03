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
    full_name:
      `${(entity as ITherapist).name ?? ''} ${(entity as ITherapist).surname ?? ''}`.trim() ||
      (entity as ITherapist).fullName,
    id: entity.id,
  },
  {
    entityType: 'patient',
    full_name: `${(entity as IPatient).name} ${(entity as IPatient).surname}`,
    id: entity.id,
  },
  {
    entityType: 'affliction',
    name: (entity as IAffliction).name,
    id: entity.id,
  },
  {
    entityType: 'medic',
    full_name:
      `${(entity as IMedic).name ?? ''} ${(entity as IMedic).surname ?? ''}`.trim() ||
      (entity as IMedic).fullName,
    id: entity.id,
  },
  {
    entityType: 'insurance',
    name: (entity as IInsurance).name,
    id: entity.id,
  },
];
