import type { IAdminEntity } from '../../../../@types/interfaces/customInterfaces';
import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/interfaces/modelInterfaces';

export const getDeleteModalEntityDetails = (entity: IAdminEntity) => [
  {
    entityType: 'therapist',
    full_name: (entity as ITherapist).fullName,
  },
  {
    entityType: 'patient',
    full_name: (entity as IPatient).fullName,
  },
  {
    entityType: 'affliction',
    name: (entity as IAffliction).name,
  },
  {
    entityType: 'medic',
    full_name: (entity as IMedic).fullName,
  },
  {
    entityType: 'insurance',
    name: (entity as IInsurance).name,
  },
];
