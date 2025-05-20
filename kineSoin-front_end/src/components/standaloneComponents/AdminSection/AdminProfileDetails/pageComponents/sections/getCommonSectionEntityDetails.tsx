import { ICommonEntityDetails } from '../../../../../../@types/interfaces/customInterfaces';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';

export const getCommonSectionEntityDetails = (
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null
): ICommonEntityDetails => {
  return entity
    ? {
        status: 'status' in entity ? entity.status : undefined,
        id: entity.id,
        name: entity.name,
        surname: 'surname' in entity ? entity.surname : undefined,
      }
    : {};
};
