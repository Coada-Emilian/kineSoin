import { IParticularEntityDetails } from '../../../../../../@types/interfaces/customInterfaces';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';

export const getProfileSectionEntityDetails = (
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | undefined
): IParticularEntityDetails => {
  return entity
    ? {
        email: 'email' in entity ? entity.email : undefined,

        licence_code:
          'licence_code' in entity ? entity.licence_code : undefined,

        amc_code: 'amc_code' in entity ? entity.amc_code : undefined,

        diploma: 'diploma' in entity ? entity.diploma : undefined,

        experience: 'experience' in entity ? entity.experience : undefined,

        specialty: 'specialty' in entity ? entity.specialty : undefined,

        prefix: 'prefix' in entity ? entity.prefix : undefined,

        phone_number:
          'phone_number' in entity
            ? typeof entity.phone_number === 'string'
              ? entity.phone_number
              : undefined
            : undefined,

        description: 'description' in entity ? entity.description : undefined,

        insurance_code:
          'insurance_code' in entity
            ? entity.insurance_code || undefined
            : undefined,

        birth_date: 'birth_date' in entity ? entity.birth_date : undefined,

        age: 'age' in entity ? entity.age : undefined,

        gender: 'gender' in entity ? entity.gender : undefined,

        city: 'city' in entity ? entity.city : undefined,

        postal_code: 'postal_code' in entity ? entity.postal_code : undefined,

        street_number:
          'street_number' in entity ? entity.street_number : undefined,

        street_name: 'street_name' in entity ? entity.street_name : undefined,

        body_region: 'body_region' in entity ? entity.body_region : undefined,

        is_operated: 'is_operated' in entity ? entity.is_operated : undefined,

        picture_url: 'picture_url' in entity ? entity.picture_url : undefined,
      }
    : {};
};
